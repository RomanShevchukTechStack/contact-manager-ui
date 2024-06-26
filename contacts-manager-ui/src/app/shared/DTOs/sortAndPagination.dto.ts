export interface SortAndPaginationDTO {
  searchValue?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  pageNumber?: number;
  pageSize?: number;
}
