import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConfig';

const NotFound = () => (
  <div style={{
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 24,
    background: 'var(--bg-body)', textAlign: 'center', padding: 24,
  }}>
    <h1 style={{ fontSize: 96, fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>404</h1>
    <h2 style={{ fontSize: 24, color: 'var(--text-primary)' }}>Page Not Found</h2>
    <p style={{ color: 'var(--text-muted)', maxWidth: 400 }}>
      The page you're looking for doesn't exist or has been moved.
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

export default NotFound;
