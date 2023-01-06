export type PaginationResponse<T> = {
  limit: number;
  skip: number;
  total: number;
  items: T[];
};
