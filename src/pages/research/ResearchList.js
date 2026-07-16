import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, buildPath } from '../../routes/routeConfig';

/* ─── Demo research data ────────────────────────────────────── */
const DEMO_RESEARCH = [
  {
    _id: '1',
    tag: 'Peer Reviewed',   tagColor: '#2563eb',
    specialty: 'Neuroanesthesia',
    title: 'Postoperative Cognitive Dysfunction in Elderly Patients',
    authors: [{ initials: 'DL', bg: '#7c3aed', name: 'Dr. Elena Lopez, et al.' }],
    imageGradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
    imageIcon: '🔬',
  },
  {
    _id: '2',
    tag: 'Peer Reviewed',   tagColor: '#2563eb',
    specialty: 'Cardiothoracic',
    title: 'Novel Monitoring Techniques for Cardiac Output',
    authors: [{ initials: 'JS', bg: '#2563eb', name: 'James Smith, MD' }],
    imageGradient: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 40%, #ef4444 80%, #f87171 100%)',
    imageIcon: '❤️',
  },
  {
    _id: '3',
    tag: 'Peer Reviewed',   tagColor: '#2563eb',
    specialty: 'Pain Management',
    title: 'Epidural vs Continuous Peripheral Nerve Block',
    authors: [{ initials: 'AK', bg: '#059669', name: 'Anika Kapoor, PhD' }],
    imageGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #38bdf8 100%)',
    imageIcon: '📊',
  },
  {
    _id: '4',
    tag: 'Peer Reviewed',   tagColor: '#2563eb',
    specialty: 'Obstetric',
    title: 'Safety of Remifentanil PCA in Laboring Women',
    authors: [{ initials: 'MW', bg: '#d97706', name: 'Michael Wong, MD' }],
    imageGradient: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #34d399 100%)',
    imageIcon: '🧬',
  },
];

/* ─── Stats ─────────────────────────────────────────────────── */
const STATS = [
  { label: 'Total Studies',   value: '142', color: '#2563eb' },
  { label: 'Peer Reviewed',   value: '89',  color: '#10b981' },
  { label: 'In Progress',     value: '34',  color: '#f59e0b' },
  { label: 'Citations',       value: '2.4k',color: '#7c3aed' },
];

/* ─── Research card ─────────────────────────────────────────── */
const ResearchCard = ({ item, onEdit, onView }) => (
  <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
    {/* Image area */}
    <div style={{
      height: 140, background: item.imageGradient,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 48, position: 'relative',
    }}>
      {item.imageIcon}
      {/* Tag */}
      <span style={{
        position: 'absolute', top: 10, left: 10,
        background: '#2563eb', color: '#fff',
        fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
        letterSpacing: '0.04em',
      }}>
        {item.tag}
      </span>
    </div>

    {/* Body */}
    <div style={{ padding: 16 }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
        {item.specialty}
      </p>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: 12 }}>
        {item.title}
      </h3>

      {/* Author */}
      {item.authors.map((a, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%', background: a.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0,
          }}>
            {a.initials}
          </div>
          <span style={{ fontSize: 12, color: '#64748b' }}>{a.name}</span>
        </div>
      ))}

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => onEdit(item._id)} style={{
            padding: '5px 8px', border: '1px solid #e2e8f0', borderRadius: 6,
            background: '#fff', cursor: 'pointer', color: '#2563eb',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button style={{
            padding: '5px 8px', border: '1px solid #e2e8f0', borderRadius: 6,
            background: '#fff', cursor: 'pointer', color: '#64748b',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
        <button onClick={() => onView(item._id)} style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '5px 12px', border: '1px solid #e2e8f0', borderRadius: 6,
          background: '#fff', cursor: 'pointer', color: '#374151',
          fontSize: 12, fontWeight: 600,
        }}>
          Preview
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
);

/* ─── ResearchList page ─────────────────────────────────────── */
const ResearchList = () => {
  const navigate    = useNavigate();
  const [search,    setSearch]    = useState('');
  const [dept,      setDept]      = useState('All Departments');
  const [viewMode,  setViewMode]  = useState('grid');

  const departments = ['All Departments', 'Neuroanesthesia', 'Cardiothoracic', 'Pain Management', 'Obstetric'];

  const filtered = DEMO_RESEARCH.filter((r) => {
    const q = search.toLowerCase();
    return (
      (!q || r.title.toLowerCase().includes(q) || r.specialty.toLowerCase().includes(q)) &&
      (dept === 'All Departments' || r.specialty === dept)
    );
  });

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a' }}>Research Hub</h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            Manage collaborative clinical trials, peer-reviewed publications, and ongoing
            anesthetic research abstracts from our international network.
          </p>
        </div>
        <button
          onClick={() => navigate(ROUTES.RESEARCH_CREATE)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', border: 'none', borderRadius: 10,
            background: 'linear-gradient(135deg, #059669, #047857)',
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload Research
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {STATS.map((s) => (
          <div key={s.label} className="card" style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</span>
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 340 }}>
          <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by title, author or keyword…"
            style={{
              width: '100%', padding: '9px 12px 9px 34px',
              border: '1.5px solid #e2e8f0', borderRadius: 10,
              background: '#fff', color: '#0f172a', fontSize: 13,
              fontFamily: 'inherit', outline: 'none',
            }}
          />
        </div>

        {/* Department */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          <span style={{ fontSize: 13, color: '#64748b' }}>Department:</span>
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            style={{
              padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 10,
              background: '#fff', color: '#374151', fontSize: 13,
              fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
            }}>
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Sort icon */}
        <button style={{ padding: '9px', border: '1.5px solid #e2e8f0', borderRadius: 10, background: '#fff', cursor: 'pointer', color: '#64748b' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/>
            <line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/>
          </svg>
        </button>

        {/* View toggles */}
        <button
          onClick={() => setViewMode('grid')}
          style={{
            padding: '9px', border: '1.5px solid #e2e8f0', borderRadius: 10,
            background: viewMode === 'grid' ? '#2563eb' : '#fff',
            color: viewMode === 'grid' ? '#fff' : '#64748b', cursor: 'pointer',
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
        </button>
        <button
          onClick={() => setViewMode('list')}
          style={{
            padding: '9px', border: '1.5px solid #e2e8f0', borderRadius: 10,
            background: viewMode === 'list' ? '#2563eb' : '#fff',
            color: viewMode === 'list' ? '#fff' : '#64748b', cursor: 'pointer',
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Research cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: viewMode === 'grid' ? 'repeat(3,1fr)' : '1fr',
        gap: 16,
      }}>
        {filtered.map((item) => (
          <ResearchCard
            key={item._id}
            item={item}
            onEdit={(id) => navigate(buildPath(ROUTES.RESEARCH_EDIT, { id }))}
            onView={(id) => navigate(buildPath(ROUTES.RESEARCH_VIEW, { id }))}
          />
        ))}
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <button style={{ padding: '7px 10px', border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#94a3b8' }}>‹</button>
        {[1,2,3,'…',10].map((p, i) => (
          <button key={i} style={{
            width: 34, height: 34, border: '1.5px solid #e2e8f0', borderRadius: 8,
            background: p === 1 ? '#2563eb' : '#fff',
            color: p === 1 ? '#fff' : '#374151',
            fontWeight: p === 1 ? 700 : 400,
            fontSize: 13, cursor: 'pointer',
          }}>
            {p}
          </button>
        ))}
        <button style={{ padding: '7px 10px', border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#374151' }}>›</button>
      </div>
    </div>
  );
};

export default ResearchList;
