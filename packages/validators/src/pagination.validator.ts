import z from "zod";

export const COURSES_PAGE_SIZE = 10;

function parsePage(value: unknown): number {
  if (value === undefined || value === null || value === "") {
    return 1;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
}

export const paginationQueryValidator = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  //page: z.preprocess(parsePage, z.number().int().min(1)).default(1),
});

export type PaginationQueryType = z.infer<typeof paginationQueryValidator>;
