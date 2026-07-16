import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConfig';

const CreateNews = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('Breakthroughs in Obstetric Anesthesia Safety: A 2024 Retrospective');
  const [category, setCategory] = useState('Member News');
  const [author, setAuthor] = useState('Dr. Sarah Jenkins');
  const [status, setStatus] = useState('DRAFTING');
  const [visibility, setVisibility] = useState('Public');
  const [seoTitle, setSeoTitle] = useState('Anesthesia Breakthroughs 2024 | S');
  const [metaDesc, setMetaDesc] = useState('Explore the latest collaborative findings in obstetric anesthesia safety protocols for the upcoming year featuring research from the');
  const [slug, setSlug] = useState('breakthroughs-obstetric-anesthesia-2024');

  return (
    <div className="page-enter" style={{ fontFamily: "'Inter', sans-serif", background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar area in the page */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', padding: '12px 24px', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#334155' }}>News Editor</span>
          <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
            <span style={{ color: '#2563eb', fontWeight: 600, borderBottom: '2px solid #2563eb', paddingBottom: 14, cursor: 'pointer' }}>Create Article</span>
            <span style={{ color: '#64748b', cursor: 'pointer' }}>Scheduled</span>
            <span style={{ color: '#64748b', cursor: 'pointer' }}>Archive</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ background: 'none', border: 'none', position: 'relative', cursor: 'pointer', color: '#64748b' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span style={{ position: 'absolute', top: 0, right: 0, width: 6, height: 6, background: '#ef4444', borderRadius: '50%' }} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main editor area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, padding: 24, flex: 1 }}>
        
        {/* Left Side: Form and Rich Text Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Article Info Card */}
          <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Article Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontWeight: 500, color: '#2563eb', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#334155', outline: 'none', background: '#fff' }}
                >
                  <option>Member News</option>
                  <option>Research Update</option>
                  <option>Event Announcement</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Author Attribution</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 14 }}>👤</span>
                  <input 
                    type="text" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px 10px 32px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#334155', outline: 'none', background: '#f8fafc' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Editor Card */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1 }}>
            
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 16px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', flexWrap: 'wrap' }}>
              {['B', 'I', 'U'].map((t, idx) => (
                <button key={t} style={{ background: 'none', border: 'none', fontStyle: idx===1?'italic':'normal', textDecoration: idx===2?'underline':'none', fontWeight: idx===0?800:500, color: '#64748b', cursor: 'pointer', fontSize: 13 }}>{t}</button>
              ))}
              <div style={{ height: 16, width: 1, background: '#cbd5e1' }} />
              {['Align Left', 'Align Center', 'List', 'Link', 'Image', 'Doc'].map((icon, idx) => (
                <button key={idx} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 13 }}>
                  {idx === 0 && '左'}
                  {idx === 1 && '中'}
                  {idx === 2 && '📋'}
                  {idx === 3 && '🔗'}
                  {idx === 4 && '🖼️'}
                  {idx === 5 && '📄'}
                </button>
              ))}
              <div style={{ height: 16, width: 1, background: '#cbd5e1' }} />
              <select style={{ background: 'none', border: 'none', color: '#475569', fontSize: 13, cursor: 'pointer', outline: 'none' }}>
                <option>Paragraph</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
              </select>
            </div>

            {/* Editable Content */}
            <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 16, fontSize: 14, color: '#334155', lineHeight: 1.7, minHeight: 300 }}>
              <p>
                The landscape of obstetric anesthesia is undergoing a paradigm shift, driven by a series of high-impact collaborative research projects. Our latest findings suggest that integrating real-time hemodynamic monitoring into standard labor analgesia protocols can reduce adverse maternal events by up to 14%.
              </p>
              <p>
                "It's not just about the technique," says lead researcher Dr. Elena Rossi, "it's about the systemic application of evidence-based safety checklists across diverse clinical environments."
              </p>
              <h4 style={{ color: '#1e3a8a', fontWeight: 700, fontSize: 14, margin: '8px 0' }}>Systematic Improvements</h4>
              <p>
                During the 2023 SACRA Global Summit, the committee identified several key areas for standardization. The following points outline the most critical updates for the coming year:
              </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Enhanced recovery after cesarean delivery (ERAC) protocols.</li>
                <li>Standardization of neuraxial anesthesia dosage for high-BMI patients.</li>
                <li>Integration of tele-supervision for rural healthcare practitioners.</li>
              </ul>
              
              <div style={{ marginTop: 20, background: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: 12, borderRadius: 4, fontStyle: 'italic', color: '#1e40af' }}>
                Note for Editors: Ensure the accompanying dataset is linked in the "Scientific Background" section before final publishing.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar Panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Publish Control Card */}
          <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <span style={{ fontSize: 13 }}>⚙️</span>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Publish Control</h3>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>Current Status</span>
              <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>DRAFTING</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>Visibility</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Public ✓</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>Save Draft</button>
              <button style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>👁️ Preview</button>
            </div>

            <button style={{ width: '100%', padding: '10px', background: 'linear-gradient(135deg, #1d4ed8, #1e40af)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              Publish to Live Site
            </button>
          </div>

          {/* Featured Image Card */}
          <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Featured Image</h3>
            <div style={{ border: '2px dashed #cbd5e1', borderRadius: 8, height: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
              {/* Graphic showing surgery room */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30,41,59,0.7) 0%, rgba(30,41,59,0.3) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 2 }}>
                <span style={{ fontSize: 20 }}>📤</span>
                <span style={{ fontSize: 10, marginTop: 4 }}>Click to replace image</span>
              </div>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }} />
            </div>
          </div>

          {/* SEO Optimization Card */}
          <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>SEO Optimization</h3>
              <span style={{ color: '#10b981', fontSize: 14 }}>✓</span>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>SEO Title</label>
              <input 
                type="text" 
                value={seoTitle} 
                onChange={(e) => setSeoTitle(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 12, outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Meta Description</label>
              <textarea 
                value={metaDesc} 
                onChange={(e) => setMetaDesc(e.target.value)}
                rows="3"
                style={{ width: '100%', padding: '8px', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 12, outline: 'none', fontFamily: 'inherit', resize: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Slug / Permalink</label>
              <input 
                type="text" 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 12, outline: 'none' }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Editor bottom bar / Footer info */}
      <div style={{ borderTop: '1px solid #e2e8f0', background: '#fff', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 10 }}>AD</div>
          <div>
            <p style={{ fontWeight: 600, color: '#334155' }}>Dr. Aris Thorne</p>
            <p style={{ color: '#94a3b8', fontSize: 10 }}>Chief Editor</p>
          </div>
        </div>
        <span style={{ color: '#94a3b8' }}>Draft auto-saved 1m ago</span>
      </div>

    </div>
  );
};

export default CreateNews;
