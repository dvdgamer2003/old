import { useState, useCallback } from 'react';
import type { PaginationState, PaginationType } from '@/types/pagination';

interface UsePaginationProps {
  type?: PaginationType;
  itemsPerPage?: number;
  maxPages?: number;
  onLoadMore?: () => Promise<void>;
}

export function usePagination({
  type = 'load-more',
  itemsPerPage = 12,
  maxPages = 99,
  onLoadMore
}: UsePaginationProps) {
  const [state, setState] = useState<PaginationState>({
    currentPage: 1,
    totalPages: maxPages,
    hasMore: true
  });

  const handleLoadMore = useCallback(async () => {
    if (!onLoadMore || !state.hasMore) return;
    await onLoadMore();
  }, [onLoadMore, state.hasMore]);

  const handlePageChange = useCallback((page: number) => {
    setState(prev => ({
      ...prev,
      currentPage: page
    }));
  }, []);

  const updatePaginationState = useCallback((newState: Partial<PaginationState>) => {
    setState(prev => ({
      ...prev,
      ...newState
    }));
  }, []);

  return {
    ...state,
    handleLoadMore,
    handlePageChange,
    updatePaginationState
  };
}