import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

const GalleryPreview = () => (
  <div className="page-enter">
    <PageHeader title="Image Preview" subtitle="Coming soon." />
    <div className="card" style={{ marginTop: 24, padding: 32 }}>
      <p style={{ color: 'var(--text-muted)' }}>This page is under construction.</p>
    </div>
  </div>
);

export default GalleryPreview;
