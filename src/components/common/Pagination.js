import React from 'react';
import Button from './Button';

/**
 * Pagination controls.
 *
 * Designed to pair with the `usePagination` hook.
 *
 * @param {{
 *   currentPage: number,
 *   totalPages: number,
 *   totalItems: number,
 *   startItem: number,
 *   endItem: number,
 *   pageRange: (number|string)[],
 *   onPageChange: (page: number) => void,
 *   canNext: boolean,
 *   canPrev: boolean,
 * }} props
 */
const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  startItem,
  endItem,
  pageRange,
  onPageChange,
  canNext,
  canPrev,
}) => {
  if (totalPages <= 1) return null;

  const btnBase = {
    minWidth: 36, height: 36,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: '1.5px solid var(--border-color)',
    borderRadius: 'var(--border-radius-md)',
    background: 'var(--bg-card)',
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'var(--font-family)',
    fontWeight: 'var(--font-weight-medium)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    color: 'var(--text-secondary)',
  };

  const activeBtnStyle = {
    ...btnBase,
    background: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#fff',
  };

  const disabledBtnStyle = { ...btnBase, opacity: 0.4, cursor: 'not-allowed' };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
      {/* Item count */}
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
        Showing <strong style={{ color: 'var(--text-primary)' }}>{startItem}–{endItem}</strong> of{' '}
        <strong style={{ color: 'var(--text-primary)' }}>{totalItems}</strong> results
      </p>

      {/* Page buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {/* Prev */}
        <button
          onClick={() => canPrev && onPageChange(currentPage - 1)}
          disabled={!canPrev}
          aria-label="Previous page"
          style={canPrev ? btnBase : disabledBtnStyle}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        {pageRange.map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} style={{ ...btnBase, border: 'none', cursor: 'default', color: 'var(--text-muted)' }}>…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              style={page === currentPage ? activeBtnStyle : btnBase}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => canNext && onPageChange(currentPage + 1)}
          disabled={!canNext}
          aria-label="Next page"
          style={canNext ? btnBase : disabledBtnStyle}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
