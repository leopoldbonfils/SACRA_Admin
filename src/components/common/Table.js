import React from 'react';

/**
 * Reusable data Table.
 *
 * @param {{
 *   columns: Array<{ key: string, header: string, render?: (row, index) => React.ReactNode, width?: string|number }>,
 *   data: object[],
 *   loading?: boolean,
 *   emptyMessage?: string,
 *   rowKey?: string,
 *   onRowClick?: (row: object) => void,
 *   stickyHeader?: boolean,
 * }} props
 */
const Table = ({
  columns,
  data = [],
  loading = false,
  emptyMessage = 'No records found.',
  rowKey = 'id',
  onRowClick,
  stickyHeader = false,
}) => {
  const thStyle = {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid var(--border-color)',
    background: 'var(--color-gray-50)',
    whiteSpace: 'nowrap',
    position: stickyHeader ? 'sticky' : undefined,
    top: stickyHeader ? 0 : undefined,
    zIndex: stickyHeader ? 1 : undefined,
  };

  const tdStyle = {
    padding: '14px 16px',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-color)',
    verticalAlign: 'middle',
  };

  /* ── Skeleton rows ── */
  if (loading) {
    return (
      <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{columns.map((c) => <th key={c.key} style={thStyle}>{c.header}</th>)}</tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {columns.map((c) => (
                  <td key={c.key} style={tdStyle}>
                    <div className="skeleton" style={{ height: 16, borderRadius: 4, width: '80%' }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-lg)', overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ ...thStyle, width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ ...tdStyle, textAlign: 'center', color: 'var(--text-muted)', padding: 48 }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row[rowKey] ?? idx}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={{
                  cursor: onRowClick ? 'pointer' : undefined,
                  transition: 'background var(--transition-fast)',
                }}
                onMouseEnter={(e) => { if (onRowClick) e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
              >
                {columns.map((col) => (
                  <td key={col.key} style={tdStyle}>
                    {col.render ? col.render(row, idx) : row[col.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
