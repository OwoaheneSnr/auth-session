// * Find all with pages and quantity items.
export const getPaginationOptions = (
  page: number,
  limit: number,
  options?: object,
) => ({
  ...options,
  skip: (page - 1) * limit,
  take: limit,
});
