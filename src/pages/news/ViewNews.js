import React from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { ROUTES } from '../../routes/routeConfig';

const ViewNews = () => (
  <div className="page-enter">
    <PageHeader
      title="View Article"
      breadcrumbs={[{ label: 'Dashboard', to: ROUTES.DASHBOARD }, { label: 'News', to: ROUTES.NEWS }, { label: 'View' }]}
    />
    <div className="card" style={{ marginTop: 24, padding: 32 }}>
      <p style={{ color: 'var(--text-muted)' }}>Article viewer coming soon.</p>
    </div>
  </div>
);

export default ViewNews;
