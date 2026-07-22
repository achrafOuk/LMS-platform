import z from "zod";

export const COURSES_PAGE_SIZE = 10;

export const paginationQueryValidator = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
});

export type PaginationQueryType = z.infer<typeof paginationQueryValidator>;
