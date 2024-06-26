import { SortDirection } from "../enums/sortDirestion.enum";

export interface SortAndPaginationDTO {
  searchValue?: string;
  orderBy?: string;
  orderDirection?: SortDirection;
  pageNumber?: number;
  pageSize?: number;
}
