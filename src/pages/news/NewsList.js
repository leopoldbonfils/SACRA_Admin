import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import { ROUTES, buildPath } from '../../routes/routeConfig';
import newsService from '../../services/newsService';

/* ─── Status badge ──────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const cfg = {
    Published:  { bg: '#d1fae5', color: '#065f46' },
    Draft:      { bg: '#fef3c7', color: '#92400e' },
    Scheduled:  { bg: '#dbeafe', color: '#1d4ed8' },
    Archived:   { bg: '#f1f5f9', color: '#475569' },
  }[status] || { bg: '#f1f5f9', color: '#475569' };
  return (
    <span style={{
      padding: '3px 12px', borderRadius: 20,
      background: cfg.bg, color: cfg.color,
      fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
    }}>
      {status}
    </span>
  );
};

/* ─── Category pill ─────────────────────────────────────────── */
const CategoryPill = ({ label }) => {
  const cfg = {
    'Research':          { bg: '#dbeafe', color: '#1d4ed8' },
    'Events':            { bg: '#d1fae5', color: '#065f46' },
    'Clinical Updates':  { bg: '#fef3c7', color: '#92400e' },
    'Announcements':     { bg: '#ede9fe', color: '#6d28d9' },
  }[label] || { bg: '#f1f5f9', color: '#475569' };
  
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 20,
      background: cfg.bg, color: cfg.color,
      fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
};

/* ─── Avatar initials ───────────────────────────────────────── */
const Avatar = ({ name, bg }) => {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : 'AD';
  return (
    <div style={{
      width: 30, height: 30, borderRadius: '50%', background: bg || '#2563eb',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
};

/* ─── NewsList page ─────────────────────────────────────────── */
const NewsList = () => {
  const navigate = useNavigate();
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All Categories');
  const [status,   setStatus]   = useState('All');
  const [selected, setSelected] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading,  setLoading]  = useState(true);

  const categories = ['All Categories', 'Research', 'Events', 'Clinical Updates', 'Announcements'];
  const statuses   = ['All', 'Published', 'Draft', 'Scheduled', 'Archived'];

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await newsService.getAll({ search, category, status });
      setArticles(data);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [search, category, status]);

  const toggleAll  = () => setSelected(selected.length === articles.length ? [] : articles.map((a) => a.id));
  const toggleOne  = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>News Management</h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            Manage the Students Anesthetic Collaborative Research Association news feed.
          </p>
        </div>
        <button
          onClick={() => navigate(ROUTES.NEWS_CREATE)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', border: 'none', borderRadius: 10,
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          + Add News
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 320 }}>
          <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or author…"
            style={{
              width: '100%', padding: '9px 12px 9px 34px',
              border: '1.5px solid #e2e8f0', borderRadius: 10,
              background: '#fff', color: '#0f172a', fontSize: 13,
              fontFamily: 'inherit', outline: 'none',
            }}
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 10,
            background: '#fff', color: '#374151', fontSize: 13, fontFamily: 'inherit',
            outline: 'none', cursor: 'pointer',
          }}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>

        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>Status:</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 10,
              background: '#fff', color: '#374151', fontSize: 13, fontFamily: 'inherit',
              outline: 'none', cursor: 'pointer',
            }}>
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Date range placeholder */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '9px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10,
          background: '#fff', cursor: 'pointer', fontSize: 13, color: '#64748b',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Date Range
        </div>

        {/* Bulk actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {selected.length > 0 && (
            <span style={{ fontSize: 13, color: '#64748b', alignSelf: 'center' }}>
              {selected.length} selected
            </span>
          )}
          <select
            disabled={selected.length === 0}
            style={{
              padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 10,
              background: selected.length ? '#fff' : '#f8fafc',
              color: '#374151', fontSize: 13, fontFamily: 'inherit', outline: 'none',
            }}>
            <option>Bulk Actions</option>
            <option>Publish</option>
            <option>Archive</option>
            <option>Delete</option>
          </select>
          {/* Icons */}
          <button style={{ padding: '9px', border: '1.5px solid #e2e8f0', borderRadius: 10, background: '#fff', cursor: 'pointer', color: '#64748b' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
          </button>
          <button style={{ padding: '9px', border: '1.5px solid #e2e8f0', borderRadius: 10, background: '#fff', cursor: 'pointer', color: '#64748b' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 32, textAlign: 'center', color: '#64748b' }}>Loading articles...</div>
        ) : articles.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', color: '#64748b' }}>No articles found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '12px 16px', width: 40 }}>
                  <input type="checkbox" checked={selected.length === articles.length && articles.length > 0}
                    onChange={toggleAll} style={{ accentColor: '#2563eb' }}/>
                </th>
                {['Article','Category','Author','Date','Status','Actions'].map((h) => (
                  <th key={h} style={{
                    padding: '12px 16px', textAlign: 'left',
                    fontSize: 11, fontWeight: 700, color: '#94a3b8',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = ''}
                  onClick={() => navigate(buildPath(ROUTES.NEWS_VIEW, { id: article.id }))}
                >
                  {/* Checkbox */}
                  <td style={{ padding: '14px 16px' }} onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selected.includes(article.id)}
                      onChange={() => toggleOne(article.id)} style={{ accentColor: '#2563eb' }}/>
                  </td>

                  {/* Article */}
                  <td style={{ padding: '14px 16px', minWidth: 220 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 8, flexShrink: 0,
                        background: 'linear-gradient(135deg, #e0e7ff, #dbeafe)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                          <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/>
                        </svg>
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {article.title}
                        </p>
                        <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{article.sub}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '14px 16px' }}>
                    <CategoryPill label={article.category}/>
                  </td>

                  {/* Author */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar name={article.author} bg={article.avatarBg}/>
                      <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{article.author}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#64748b', whiteSpace: 'nowrap' }}>
                    {new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>

                  {/* Status */}
                  <td style={{ padding: '14px 16px' }}>
                    <StatusBadge status={article.status}/>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 16px' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        onClick={() => navigate(buildPath(ROUTES.NEWS_EDIT, { id: article.id }))}
                        title="Edit"
                        style={{ padding: '6px 10px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#2563eb', fontSize: 12, fontWeight: 600 }}>
                        Edit
                      </button>
                      <button
                        title="View"
                        onClick={() => navigate(buildPath(ROUTES.NEWS_VIEW, { id: article.id }))}
                        style={{ padding: '6px 10px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#64748b', fontSize: 12 }}>
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Showing 1 to {articles.length} of {articles.length} articles
        </p>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[1].map((p, i) => (
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
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748b' }}>
          Results per page:
          <select style={{ padding: '6px 10px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}>
            <option>10</option><option>20</option><option>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
