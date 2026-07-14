import React, { useEffect, useRef } from 'react';
import Button from './Button';

/**
 * Modal component.
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   title?: string,
 *   size?: 'sm'|'md'|'lg'|'xl',
 *   footer?: React.ReactNode,
 *   closable?: boolean,
 * }} props
 */
const Modal = ({ isOpen, onClose, title, children, footer, size = 'md', closable = true }) => {
  const dialogRef = useRef(null);

  /* ── Close on Escape ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape' && closable) onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose, closable]);

  /* ── Prevent body scroll ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidths = { sm: 400, md: 560, lg: 720, xl: 960 };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 'var(--z-modal)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
      aria-modal="true" role="dialog" aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={closable ? onClose : undefined}
        style={{ position: 'absolute', inset: 0, background: 'var(--bg-overlay)', backdropFilter: 'blur(4px)' }}
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        style={{
          position: 'relative', zIndex: 1,
          background: 'var(--bg-card)',
          borderRadius: 'var(--border-radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          width: '100%',
          maxWidth: maxWidths[size],
          maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          animation: 'scaleIn 0.2s ease',
        }}
      >
        {/* Header */}
        {(title || closable) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border-color)' }}>
            {title && <h3 id="modal-title" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>{title}</h3>}
            {closable && (
              <button onClick={onClose} aria-label="Close modal" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, borderRadius: 6, lineHeight: 1 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
