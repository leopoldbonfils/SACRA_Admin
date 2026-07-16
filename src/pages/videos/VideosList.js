import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConfig';

const DEMO_VIDEOS = [
  {
    id: '1',
    title: 'Latest Trends in Pediatric Anesthesia Research 2024',
    category: 'RESEARCH',
    views: '1.2K',
    date: 'Oct 12',
    duration: '15:24',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
  },
  {
    id: '2',
    title: 'How to Submit Collaborative Research Abstracts',
    category: 'TUTORIAL',
    views: '450',
    date: 'Sep 28',
    duration: '08:45',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
  },
  {
    id: '3',
    title: 'SACRA 2023 Annual Symposium Keynote',
    category: 'EVENTS',
    views: '3.4K',
    date: 'Aug 05',
    duration: '42:10',
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)',
  },
];

const VideosList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Videos');

  const tabs = ['All Videos', 'Research', 'Tutorials', 'Events'];

  const stats = [
    { label: 'Total Storage', value: '124.8 GB', sub: '↓ 12%', color: '#2563eb' },
    { label: 'Total Views', value: '18.2K', sub: '↑ 4.5%', color: '#10b981' },
    { label: 'Published', value: '84', sub: 'Videos', color: '#64748b' },
    { label: 'Watch Time', value: '320h', sub: 'Avg. 4m', color: '#7c3aed' },
  ];

  return (
    <div className="page-enter" style={{ fontFamily: "'Inter', sans-serif", background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ position: 'relative', width: 340 }}>
          <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos, categories, or IDs..."
            style={{
              width: '100%', padding: '9px 12px 9px 36px',
              border: '1.5px solid #e2e8f0', borderRadius: 10,
              background: '#fff', color: '#0f172a', fontSize: 13,
              fontFamily: 'inherit', outline: 'none',
            }}
          />
        </div>
        <button
          onClick={() => navigate(ROUTES.VIDEOS_UPLOAD)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', border: 'none', borderRadius: 10,
            background: '#2563eb', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
          + Upload Video
        </button>
      </div>

      {/* Description + Sub-Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Video Management</h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            Manage SACRA's educational media library and research presentations.
          </p>
        </div>

        {/* Custom rounded tab bar */}
        <div style={{ background: '#e2e8f0', padding: 3, borderRadius: 8, display: 'flex', gap: 2 }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                padding: '6px 16px', border: 'none', borderRadius: 6,
                background: activeTab === t ? '#fff' : 'transparent',
                color: activeTab === t ? '#2563eb' : '#64748b',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {stats.map((s, idx) => (
          <div key={s.label} className="card" style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {s.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>{s.value}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: idx === 0 ? '#ef4444' : idx === 1 ? '#10b981' : '#64748b' }}>
                {s.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 12 }}>
        {DEMO_VIDEOS.map((v) => (
          <div key={v.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Thumbnail area */}
            <div style={{
              height: 160, background: v.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', cursor: 'pointer',
            }}>
              {/* Play symbol */}
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', border: '1px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: 18, marginLeft: 3 }}>▶</span>
              </div>
              {/* Duration badge */}
              <span style={{
                position: 'absolute', bottom: 8, right: 8,
                background: 'rgba(0,0,0,0.7)', color: '#fff',
                fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
              }}>
                {v.duration}
              </span>
            </div>

            {/* Video metadata body */}
            <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: 9, fontWeight: 700, color: '#3b82f6', background: '#eff6ff',
                  padding: '2px 8px', borderRadius: 4, letterSpacing: '0.05em',
                }}>
                  {v.category}
                </span>
                <span style={{ color: '#94a3b8', cursor: 'pointer', fontSize: 14 }}>⋮</span>
              </div>

              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
                {v.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: '#64748b', marginTop: 'auto' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>👁️ {v.views}</span>
                <span>📅 {v.date}</span>
              </div>

              {/* Action buttons */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => navigate(ROUTES.VIDEOS_EDIT)} style={{ padding: '6px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#2563eb' }}>✏️</button>
                  <button style={{ padding: '6px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#64748b' }}>🔗</button>
                </div>
                <button style={{ padding: '6px', border: '1px solid #fee2e2', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#ef4444' }}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 12 }}>
        <button style={{ width: 32, height: 32, border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#94a3b8' }}>‹</button>
        {[1, 2, 3].map((p) => (
          <button key={p} style={{
            width: 32, height: 32, border: '1.5px solid #e2e8f0', borderRadius: 8,
            background: p === 1 ? '#2563eb' : '#fff',
            color: p === 1 ? '#fff' : '#374151',
            fontWeight: p === 1 ? 700 : 400,
            fontSize: 12, cursor: 'pointer',
          }}>
            {p}
          </button>
        ))}
        <button style={{ width: 32, height: 32, border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#374151' }}>›</button>
      </div>

    </div>
  );
};

export default VideosList;
