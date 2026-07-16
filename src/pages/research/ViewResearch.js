import React from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { ROUTES } from '../../routes/routeConfig';

const ViewResearch = () => (
  <div className="page-enter">
    <PageHeader
      title="Research Detail"
      breadcrumbs={[{ label: 'Research', to: ROUTES.RESEARCH }, { label: 'View' }]}
    />
    <div className="card" style={{ marginTop: 24, padding: 32 }}>
      <p style={{ color: 'var(--text-muted)' }}>Research viewer coming soon.</p>
    </div>
  </div>
);

export default ViewResearch;
