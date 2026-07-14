import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

/**
 * PageHeader – title, subtitle, breadcrumb and optional action buttons.
 *
 * @param {{
 *   title: string,
 *   subtitle?: string,
 *   breadcrumbs?: Array<{ label: string, to?: string }>,
 *   actions?: React.ReactNode,
 * }} props
 */
const PageHeader = ({ title, subtitle, breadcrumbs, actions }) => (
  <div className="page-header">
    <div className="page-header-left">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="breadcrumb" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="breadcrumb-separator" aria-hidden="true">/</span>}
              {crumb.to ? (
                <Link to={crumb.to} className="breadcrumb-item" style={{ color: 'var(--color-primary)' }}>
                  {crumb.label}
                </Link>
              ) : (
                <span className={`breadcrumb-item ${i === breadcrumbs.length - 1 ? 'active' : ''}`}>
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Title */}
      <h1 className="page-title">{title}</h1>

      {/* Subtitle */}
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>

    {/* Actions */}
    {actions && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {actions}
      </div>
    )}
  </div>
);

export default PageHeader;
