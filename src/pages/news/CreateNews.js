import React from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { ROUTES } from '../../routes/routeConfig';

const CreateNews = () => (
  <div className="page-enter">
    <PageHeader
      title="Create Article"
      subtitle="Write and publish a new news article."
      breadcrumbs={[{ label: 'Dashboard', to: ROUTES.DASHBOARD }, { label: 'News', to: ROUTES.NEWS }, { label: 'Create' }]}
    />
    <div className="card" style={{ marginTop: 24, padding: 32 }}>
      <p style={{ color: 'var(--text-muted)' }}>Article editor coming soon.</p>
    </div>
  </div>
);

export default CreateNews;
