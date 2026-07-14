import { useState, useCallback, useMemo } from 'react';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';

/**
 * Client-side pagination hook.
 *
 * @param {object[]} data        Full dataset array.
 * @param {number}   [pageSize]  Items per page (default from constants).
 *
 * @returns {{
 *   currentPage,
 *   totalPages,
 *   pageSize,
 *   paginatedData,
 *   goToPage,
 *   nextPage,
 *   prevPage,
 *   setPageSize,
 *   canNext,
 *   canPrev,
 *   pageRange,
 * }}
 *
 * @example
 * const { paginatedData, currentPage, totalPages, goToPage } = usePagination(allItems);
 */
const usePagination = (data = [], initialPageSize = DEFAULT_PAGE_SIZE) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize,    setPageSizeState] = useState(initialPageSize);

  const totalPages = useMemo(() =>
    Math.max(1, Math.ceil(data.length / pageSize)),
    [data.length, pageSize]
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const goToPage = useCallback((page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }, [totalPages]);

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  const setPageSize = useCallback((size) => {
    setPageSizeState(size);
    setCurrentPage(1); // reset to first page
  }, []);

  /** Page numbers to display in the pagination bar (with ellipsis). */
  const pageRange = useMemo(() => {
    const delta = 2;
    const left  = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);
    const range = [];

    range.push(1);
    if (left > 2) range.push('...');
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push('...');
    if (totalPages > 1) range.push(totalPages);

    return range;
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    pageSize,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
    canNext:   currentPage < totalPages,
    canPrev:   currentPage > 1,
    pageRange,
    totalItems: data.length,
    startItem:  data.length === 0 ? 0 : (currentPage - 1) * pageSize + 1,
    endItem:    Math.min(currentPage * pageSize, data.length),
  };
};

export default usePagination;
