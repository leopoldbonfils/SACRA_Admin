import React from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { ROUTES } from '../../routes/routeConfig';

const CreateResearch = () => (
  <div className="page-enter">
    <PageHeader
      title="Upload Research"
      subtitle="Submit a new research paper or abstract."
      breadcrumbs={[{ label: 'Dashboard', to: ROUTES.DASHBOARD }, { label: 'Research', to: ROUTES.RESEARCH }, { label: 'Upload' }]}
    />
    <div className="card" style={{ marginTop: 24, padding: 32 }}>
      <p style={{ color: 'var(--text-muted)' }}>Research submission form coming soon.</p>
    </div>
  </div>
);

export default CreateResearch;
