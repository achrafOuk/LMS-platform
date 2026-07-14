import { imageMimeTypes } from "@tanstack-start-hono/validators/upload";

export function getAcceptFormats()
{
  const acceptedFormats = imageMimeTypes .map((mimeType) => mimeType.replace('image/', '').toUpperCase()).join(', ');
  return acceptedFormats;
}