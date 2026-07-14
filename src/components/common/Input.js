import React, { forwardRef } from 'react';

/**
 * Input component with optional label, helper text, and error state.
 *
 * @param {{
 *   label?: string,
 *   hint?: string,
 *   error?: string,
 *   leftAddon?: React.ReactNode,
 *   rightAddon?: React.ReactNode,
 *   fullWidth?: boolean,
 * }} props
 */
const Input = forwardRef(({
  label,
  hint,
  error,
  leftAddon,
  rightAddon,
  fullWidth = true,
  id,
  className = '',
  style,
  ...rest
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: fullWidth ? '100%' : undefined,
  };

  const addonWrapStyle = {
    display: 'flex',
    alignItems: 'center',
    border: `1.5px solid ${error ? 'var(--color-danger)' : 'var(--border-color)'}`,
    borderRadius: 'var(--border-radius-md)',
    background: rest.disabled ? 'var(--color-gray-100)' : 'var(--bg-card)',
    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
    overflow: 'hidden',
  };

  const inputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '9px 12px',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-primary)',
    background: 'transparent',
    fontFamily: 'var(--font-family)',
    width: '100%',
    ...style,
  };

  const addonStyle = {
    padding: '0 12px',
    color: 'var(--text-muted)',
    fontSize: 'var(--font-size-sm)',
    display: 'flex',
    alignItems: 'center',
    background: 'var(--color-gray-50)',
    borderRight: leftAddon ? `1px solid var(--border-color)` : undefined,
    borderLeft: rightAddon ? `1px solid var(--border-color)` : undefined,
    height: '100%',
  };

  return (
    <div style={wrapStyle} className={className}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <div style={addonWrapStyle}>
        {leftAddon && <span style={addonStyle}>{leftAddon}</span>}
        <input ref={ref} id={inputId} style={inputStyle} aria-invalid={!!error} aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined} {...rest} />
        {rightAddon && <span style={{ ...addonStyle, borderRight: undefined }}>{rightAddon}</span>}
      </div>
      {hint  && !error && <p id={`${inputId}-hint`}  style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{hint}</p>}
      {error &&           <p id={`${inputId}-error`} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-danger)' }} role="alert">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
