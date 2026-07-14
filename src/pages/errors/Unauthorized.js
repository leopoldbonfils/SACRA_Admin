import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConfig';

const Unauthorized = () => (
  <div style={{
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 24,
    background: 'var(--bg-body)', textAlign: 'center', padding: 24,
  }}>
    <h1 style={{ fontSize: 96, fontWeight: 800, color: 'var(--color-danger)', lineHeight: 1 }}>401</h1>
    <h2 style={{ fontSize: 24, color: 'var(--text-primary)' }}>Unauthorized</h2>
    <p style={{ color: 'var(--text-muted)', maxWidth: 400 }}>
      You don't have permission to access this page.
      Please contact your administrator.
    </p>
    <Link to={ROUTES.DASHBOARD} style={{
      padding: '10px 24px', borderRadius: 10,
      background: 'var(--color-primary)', color: '#fff',
      fontWeight: 600, fontSize: 14, textDecoration: 'none',
    }}>
      Back to Dashboard
    </Link>
  </div>
);

export default Unauthorized;
