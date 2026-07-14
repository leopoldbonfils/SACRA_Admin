import React from 'react';
import Button from './Button';

/**
 * EmptyState – shown when a list/table has no data.
 *
 * @param {{
 *   icon?: React.ReactNode,
 *   title?: string,
 *   description?: string,
 *   action?: { label: string, onClick: () => void },
 * }} props
 */
const EmptyState = ({
  icon,
  title       = 'Nothing here yet',
  description = 'Get started by adding your first item.',
  action,
}) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', textAlign: 'center',
    padding: '64px 24px', gap: 16,
  }}>
    {icon ? (
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'var(--color-gray-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-muted)',
      }}>
        {icon}
      </div>
    ) : (
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'var(--color-gray-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gray-400)" strokeWidth="1.5">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
          <rect x="9" y="3" width="6" height="4" rx="1"/>
        </svg>
      </div>
    )}

    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-relaxed)' }}>
        {description}
      </p>
    </div>

    {action && (
      <Button variant="primary" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </div>
);

export default EmptyState;
