export interface Pagination<T> {
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
  data: T[];
}
