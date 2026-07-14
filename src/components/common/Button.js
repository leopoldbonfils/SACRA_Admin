import React, { forwardRef } from 'react';

/**
 * Button component.
 *
 * @param {{
 *   variant?: 'primary'|'secondary'|'outline'|'ghost'|'danger',
 *   size?: 'sm'|'md'|'lg',
 *   loading?: boolean,
 *   leftIcon?: React.ReactNode,
 *   rightIcon?: React.ReactNode,
 *   fullWidth?: boolean,
 * }} props
 */
const Button = forwardRef(({
  children,
  variant   = 'primary',
  size      = 'md',
  loading   = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  style,
  ...rest
}, ref) => {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--font-family)',
    fontWeight: 'var(--font-weight-semibold)',
    borderRadius: 'var(--border-radius-md)',
    border: '1.5px solid transparent',
    cursor: loading || disabled ? 'not-allowed' : 'pointer',
    opacity: loading || disabled ? 0.65 : 1,
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap',
    width: fullWidth ? '100%' : undefined,
    outline: 'none',
  };

  const sizes = {
    sm: { padding: '6px 14px', fontSize: 'var(--font-size-xs)' },
    md: { padding: '9px 20px', fontSize: 'var(--font-size-sm)' },
    lg: { padding: '12px 28px', fontSize: 'var(--font-size-base)' },
  };

  const variants = {
    primary:   { background: 'var(--color-primary)',   color: '#fff', borderColor: 'var(--color-primary)' },
    secondary: { background: 'var(--color-secondary)', color: '#fff', borderColor: 'var(--color-secondary)' },
    outline:   { background: 'transparent', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' },
    ghost:     { background: 'transparent', color: 'var(--text-secondary)', borderColor: 'transparent' },
    danger:    { background: 'var(--color-danger)',    color: '#fff', borderColor: 'var(--color-danger)' },
  };

  const computed = { ...base, ...sizes[size], ...variants[variant], ...style };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      style={computed}
      className={className}
      {...rest}
    >
      {loading ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="anim-spin">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
