import React from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { ROUTES } from '../../routes/routeConfig';

const EditResearch = () => (
  <div className="page-enter">
    <PageHeader
      title="Edit Research"
      breadcrumbs={[{ label: 'Research', to: ROUTES.RESEARCH }, { label: 'Edit' }]}
    />
    <div className="card" style={{ marginTop: 24, padding: 32 }}>
      <p style={{ color: 'var(--text-muted)' }}>Editor coming soon.</p>
    </div>
  </div>
);

export default EditResearch;
