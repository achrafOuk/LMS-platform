import {  CreateBucketCommand, HeadBucketCommand, PutBucketCorsCommand, S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: "us-east-1", // can be anything for RustFS
  endpoint: "http://localhost:9000", // RustFS endpoint
  forcePathStyle: true, // IMPORTANT for S3-compatible storage
  credentials: {
    accessKeyId: process.env.RUSTFS_ACCESS_KEY!,
    secretAccessKey: process.env.RUSTFS_SECRET_KEY!,
  },
});

async function isBucketExists(bucketName: string)
{
  try
  {
    const command = new HeadBucketCommand({ Bucket: bucketName });
    await s3.send(command);
    return {error: null, exists: true};
  }
  catch(error: unknown)
  {
    if (error instanceof Error )
    {
      let isError = ('name' in error && error.name === 'NotFound');

      isError = isError || ('$metadata' in error && error.$metadata instanceof Object && 'httpStatusCode' in error.$metadata && error.$metadata?.httpStatusCode === 404);
      if (isError) return {error: 'Bucket not found', exists: false};
    }
    throw error;
  }
}

async function configureBucketCors(bucketName: string) {
  const corsConfiguration = {
    CORSRules: [
      {
        AllowedHeaders: ["*"],
        AllowedMethods: ["PUT", "POST", "GET", "HEAD", "DELETE"],
        AllowedOrigins: [
          "http://localhost:3000",  // Frontend dev server
          "http://127.0.0.1:3000",
        ],
        MaxAgeSeconds: 3000,
        ExposeHeaders: ["ETag", "x-amz-server-side-encryption", "x-amz-request-id", "x-amz-id-2"],
      },
    ],
  };

  try {
    await s3.send(new PutBucketCorsCommand({
      Bucket: bucketName,
      CORSConfiguration: corsConfiguration,
    }));
    console.log(`CORS configured for bucket: ${bucketName}`);
  } catch (error) {
    console.error("Error configuring CORS:", error);
  }
}

export async function createBucket()
{
  try
  {
    const bucketName = process.env.RUSTFS_BUCKET_NAME!;
    const {error, exists} = await isBucketExists(bucketName);
    if (error === 'Bucket not found' || !exists)
    {
      const command = new CreateBucketCommand({ Bucket: bucketName });
      await s3.send(command);
    }
    // Configure CORS for the bucket (new or existing)
    await configureBucketCors(bucketName);
  }
  catch(error)
  {
    if (error instanceof Error)
    {
      throw error;
    }
    throw new Error('Failed to create bucket');
  }

}





