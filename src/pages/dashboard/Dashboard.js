import React from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { dashboardCards } from '../../data/dashboardCards';

/**
 * Dashboard page – overview stats and recent activity.
 */
const Dashboard = () => {
  // TODO: Replace with real API data via useFetch
  const stats = {
    totalMembers:  248,
    totalNews:     42,
    upcomingEvents: 7,
    totalResearch: 31,
    totalGallery:  186,
    unreadMessages: 5,
  };

  return (
    <div className="page-enter">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with SACRA."
        breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]}
      />

      {/* Stats grid */}
      <div className="stats-grid stagger">
        {dashboardCards.map((card) => (
          <div key={card.id} className="stat-card hover-lift">
            <div className="stat-card-icon" style={{ background: card.bgColor }}>
              {/* Icon placeholder */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth="2">
                <rect width="18" height="18" x="3" y="3" rx="2"/>
              </svg>
            </div>
            <div>
              <p className="stat-card-value">{stats[card.apiKey] ?? '—'}</p>
              <p className="stat-card-label">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for charts / recent activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Recent News</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
            Connect this panel to <code>newsService.getAll()</code> to display recent articles.
          </p>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Upcoming Events</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
            Connect this panel to <code>eventService.getAll()</code> to display upcoming events.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
