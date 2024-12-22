export interface PaginationState {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

export type PaginationType = 'load-more' | 'pagination';

export interface PaginationConfig {
  type: PaginationType;
  itemsPerPage: number;
  maxPages?: number;
}