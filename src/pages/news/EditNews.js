import React from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { ROUTES } from '../../routes/routeConfig';

const EditNews = () => (
  <div className="page-enter">
    <PageHeader
      title="Edit Article"
      breadcrumbs={[{ label: 'Dashboard', to: ROUTES.DASHBOARD }, { label: 'News', to: ROUTES.NEWS }, { label: 'Edit' }]}
    />
    <div className="card" style={{ marginTop: 24, padding: 32 }}>
      <p style={{ color: 'var(--text-muted)' }}>Article editor coming soon.</p>
    </div>
  </div>
);

export default EditNews;
