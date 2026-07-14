import React from 'react';

/**
 * Loader / Spinner component.
 *
 * @param {{ fullScreen?: boolean, size?: 'sm'|'md'|'lg', message?: string }} props
 */
const Loader = ({ fullScreen = false, size = 'md', message = '' }) => {
  const sizes = { sm: 20, md: 32, lg: 48 };
  const px    = sizes[size] || 32;

  const spinner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <svg
        width={px} height={px} viewBox="0 0 24 24"
        fill="none" stroke="var(--color-primary)" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        className="anim-spin"
        aria-label="Loading"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
      {message && <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-body)', zIndex: 'var(--z-overlay)',
      }}>
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;
