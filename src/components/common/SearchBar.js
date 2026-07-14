import React from 'react';

/**
 * SearchBar component.
 *
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   placeholder?: string,
 *   onClear?: () => void,
 * }} props
 */
const SearchBar = ({ value, onChange, placeholder = 'Search…', onClear, style }) => (
  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', ...style }}>
    {/* Search icon */}
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ position: 'absolute', left: 12, pointerEvents: 'none', flexShrink: 0 }}
    >
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
    </svg>

    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        paddingLeft: 38,
        paddingRight: value && onClear ? 34 : 14,
        paddingTop: 8,
        paddingBottom: 8,
        border: '1.5px solid var(--border-color)',
        borderRadius: 'var(--border-radius-md)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--text-primary)',
        background: 'var(--bg-card)',
        fontFamily: 'var(--font-family)',
        outline: 'none',
        width: '100%',
        minWidth: 220,
        transition: 'border-color var(--transition-fast)',
      }}
      onFocus={(e)  => { e.target.style.borderColor = 'var(--color-primary)'; }}
      onBlur={(e)   => { e.target.style.borderColor = 'var(--border-color)'; }}
    />

    {/* Clear button */}
    {value && onClear && (
      <button
        onClick={onClear}
        aria-label="Clear search"
        style={{
          position: 'absolute', right: 10,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', display: 'flex', padding: 2,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    )}
  </div>
);

export default SearchBar;
