import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import { ROUTES } from '../../routes/routeConfig';

/* ── Inline mini sparkline SVG ─────────────────────────────── */
const Sparkline = ({ color = '#2563eb', up = true }) => (
  <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
    <polyline
      points={up
        ? '0,22 10,18 20,20 30,12 40,14 50,8 60,4'
        : '0,4  10,8  20,6  30,14 40,12 50,18 60,22'}
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

/* ── Mini area chart for Visitors ─────────────────────────── */
const VisitorsChart = () => {
  const points = [
    [0, 70], [40, 50], [80, 80], [120, 30], [160, 60], [200, 20], [240, 40],
  ];
  const path = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
  const area = `${path} L240,100 L0,100 Z`;
  return (
    <svg width="100%" height="100" viewBox="0 0 240 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="vis-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#vis-grad)"/>
      <path d={path} stroke="#2563eb" strokeWidth="2" fill="none" strokeLinejoin="round"/>
    </svg>
  );
};

/* ── Mini bar chart for Member Growth ─────────────────────── */
const GrowthChart = () => {
  const activeData  = [28, 40, 52, 38, 60, 72, 65, 80, 70, 90];
  const trendData   = [20, 30, 25, 48, 35, 55, 42, 60, 55, 70];
  const max = 100;
  const bw  = 14;
  const gap = 8;
  return (
    <svg width="100%" height="80" viewBox={`0 0 ${(bw * 2 + gap) * activeData.length} 80`} preserveAspectRatio="none">
      {activeData.map((v, i) => {
        const x = i * (bw * 2 + gap + 6);
        return (
          <g key={i}>
            <rect x={x} y={80 - (v / max) * 80} width={bw} height={(v / max) * 80}
              rx="3" fill="#2563eb" opacity="0.85"/>
            <rect x={x + bw + 2} y={80 - (trendData[i] / max) * 80} width={bw} height={(trendData[i] / max) * 80}
              rx="3" fill="#e2e8f0"/>
          </g>
        );
      })}
    </svg>
  );
};

/* ── Stat card ─────────────────────────────────────────────── */
const StatCard = ({ icon, label, value, trend, trendLabel, color, bgColor, extra }) => (
  <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </span>
        <span style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{value}</span>
        {extra && <span style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{extra}</span>}
      </div>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
    </div>
    {trend && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Sparkline color={color}/>
        <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>{trend}</span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>{trendLabel}</span>
      </div>
    )}
  </div>
);

/* ── Upcoming event item ─────────────────────────────────────── */
const EventItem = ({ title, sub, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
    <div style={{
      width: 36, height: 36, borderRadius: 8,
      background: color || '#dbeafe',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</p>
      <p style={{ fontSize: 12, color: '#64748b', marginTop: 1 }}>{sub}</p>
    </div>
  </div>
);

/* ── Activity item ────────────────────────────────────────── */
const ActivityItem = ({ dot, text, time }) => (
  <div style={{ display: 'flex', gap: 12, paddingBottom: 16, position: 'relative' }}>
    <div style={{
      width: 10, height: 10, borderRadius: '50%', background: dot,
      flexShrink: 0, marginTop: 4,
    }}/>
    <div>
      <p style={{ fontSize: 13, color: '#0f172a', lineHeight: 1.5 }}
        dangerouslySetInnerHTML={{ __html: text }}/>
      <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>{time}</p>
    </div>
  </div>
);

/* ── Dashboard page ─────────────────────────────────────────── */
const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { id: 'members',   label: 'Total Members',      value: '2,543', trend: '+13%', trendLabel: 'vs last month', color: '#2563eb', bgColor: '#dbeafe',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>},
    { id: 'news',      label: 'Recent News',         value: '148',   trend: 'Active', trendLabel: '', color: '#7c3aed', bgColor: '#ede9fe',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/></svg>},
    { id: 'events',    label: 'Upcoming Events',     value: '12',    extra: 'Next: Dec 12', trend: null, color: '#059669', bgColor: '#d1fae5',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>},
    { id: 'research',  label: 'Research Abstracts',  value: '312',   trend: '+8 new', trendLabel: '', color: '#d97706', bgColor: '#fef3c7',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4m0-4h10m-10 0v4m10-4h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2m-4 6v-4"/></svg>},
  ];

  const upcomingEvents = [
    { title: 'Anaesthesia Research Summit', sub: 'Grant Hall, London', color: '#dbeafe' },
    { title: 'Global Clinical Trial Webinar', sub: 'Online Event', color: '#ede9fe' },
  ];

  const recentActivity = [
    { dot: '#2563eb', text: '<strong>Sarah Jenkins</strong> joined SACRA as a Fellow Member.', time: '2 hours ago' },
    { dot: '#10b981', text: 'New research abstract: <em>"Opioid-Free Anaesthesia Protocol"</em> was submitted.', time: '5 hours ago' },
    { dot: '#f59e0b', text: '<strong>Admin</strong> updated the <strong>Annual Conference</strong> details.', time: 'Yesterday' },
  ];

  const latestResearch = [
    { title: 'Post-operative cognitive dysfunction…', author: 'Dr. Ahmed K.', status: 'Published' },
    { title: 'Ventilation strategies in pediatric…', author: 'Prof. Lisa Ray', status: 'Review' },
  ];

  const recentNews = [
    { headline: 'New Collaborative Agreement…', date: 'Nov 28, 2024', views: 1304 },
    { headline: 'Newsletter: Winter Edition', date: 'Nov 25, 2024', views: 838 },
  ];

  const statusStyle = (s) => ({
    padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
    background: s === 'Published' ? '#d1fae5' : '#fef3c7',
    color:      s === 'Published' ? '#065f46' : '#92400e',
  });

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a' }}>Dashboard Overview</h1>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
            Welcome back, Administrator. Here's what's happening today.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => navigate(ROUTES.NEWS_CREATE)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 18px', border: '1.5px solid #e2e8f0', borderRadius: 10,
              background: '#fff', color: '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            + Add News
          </button>
          <button
            onClick={() => navigate(ROUTES.EVENTS_CREATE)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 18px', border: 'none', borderRadius: 10,
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Create Event
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {stats.map((s) => (
          <StatCard key={s.id} {...s}/>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>

        {/* Visitors chart */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Website Visitors</h3>
              <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Unique traffic analytics for the last 30 days</p>
            </div>
            <span style={{ fontSize: 12, color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: 6 }}>
              Last 30 Days ↓
            </span>
          </div>
          <VisitorsChart/>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {['Nov 01','Nov 10','Nov 20','Nov 30'].map((l) => (
              <span key={l} style={{ fontSize: 11, color: '#94a3b8' }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Upcoming events + Recent activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Upcoming Events</h3>
              <Link to={ROUTES.EVENTS} style={{ fontSize: 12, color: '#2563eb', fontWeight: 600 }}>View All</Link>
            </div>
            {upcomingEvents.map((e, i) => <EventItem key={i} {...e}/>)}
          </div>
        </div>
      </div>

      {/* Growth + Activity row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>

        {/* Member growth chart */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Member Growth</h3>
            <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#64748b' }}>
              <span>● Active</span><span style={{ color: '#94a3b8' }}>● Trending</span>
            </div>
          </div>
          <GrowthChart/>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {['Jul','Aug','Sep','Oct','Nov'].map((m) => (
              <span key={m} style={{ fontSize: 11, color: '#94a3b8' }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Recent Activity</h3>
          {recentActivity.map((a, i) => <ActivityItem key={i} {...a}/>)}
        </div>
      </div>

      {/* Latest Research + Recent News tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Latest Research */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Latest Research</h3>
            <Link to={ROUTES.RESEARCH} style={{ fontSize: 12, color: '#2563eb', fontWeight: 600 }}>Manage All</Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Title','Author','Status'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 0', color: '#94a3b8', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {latestResearch.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 0', color: '#0f172a', fontWeight: 500, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</td>
                  <td style={{ padding: '10px 8px', color: '#64748b' }}>{r.author}</td>
                  <td style={{ padding: '10px 0' }}><span style={statusStyle(r.status)}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent News */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Recent News</h3>
            <Link to={ROUTES.NEWS} style={{ fontSize: 12, color: '#2563eb', fontWeight: 600 }}>Manage All</Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Headline','Date','Views'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 0', color: '#94a3b8', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentNews.map((n, i) => (
                <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 0', color: '#0f172a', fontWeight: 500, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.headline}</td>
                  <td style={{ padding: '10px 8px', color: '#64748b', whiteSpace: 'nowrap' }}>{n.date}</td>
                  <td style={{ padding: '10px 0', color: '#64748b' }}>{n.views.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
