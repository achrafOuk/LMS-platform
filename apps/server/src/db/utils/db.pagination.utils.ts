
export function PaginateRequest<T>(data: T, page: number, currentPage:number, totalPages:number)
{
    const result = {
        data: data,
        page: page,
        currentPage: currentPage,
        totalPages: totalPages,
    }
    return result;
}