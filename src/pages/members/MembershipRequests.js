import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEMO_APPLICANTS = [
  {
    id: '1',
    name: 'Arthur Vance',
    email: 'a.vance@oxford-medical.edu',
    dept: 'Anesthesiology & Critical Care',
    uni: 'Oxford University',
    date: 'Oct 12, 2023',
    status: 'Reviewing',
    statusColor: '#dbeafe',
    statusText: '#1e40af',
    avatarBg: '#3b82f6',
    initials: 'AV',
  },
  {
    id: '2',
    name: 'Elena Moretti',
    email: 'e.moretti@johnshopkins.edu',
    dept: 'Cardiothoracic Surgery',
    uni: 'Johns Hopkins Medicine',
    date: 'Oct 14, 2023',
    status: 'Pending',
    statusColor: '#fef3c7',
    statusText: '#92400e',
    avatarBg: '#f59e0b',
    initials: 'EM',
  },
  {
    id: '3',
    name: 'Liam O\'Connell',
    email: 'liam.oconnell@tcd.ie',
    dept: 'Pain Management Research',
    uni: 'Trinity College Dublin',
    date: 'Oct 15, 2023',
    status: 'Approved',
    statusColor: '#d1fae5',
    statusText: '#065f46',
    avatarBg: '#10b981',
    initials: 'LO',
  },
  {
    id: '4',
    name: 'Sarah Miller',
    email: 's.miller@cam.ac.uk',
    dept: 'Pediatric Anesthesia',
    uni: 'University of Cambridge',
    date: 'Oct 16, 2023',
    status: 'Pending',
    statusColor: '#fef3c7',
    statusText: '#92400e',
    avatarBg: '#7c3aed',
    initials: 'SM',
  },
];

const MembershipRequests = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Applications');
  const [selected, setSelected] = useState([]);

  const filters = ['All Applications', 'Pending', 'In Review'];

  const stats = [
    { label: 'Pending Review', value: '24', icon: '📝' },
    { label: 'Under Review', value: '12', icon: '🔍' },
    { label: 'Approved (30d)', value: '158', icon: '✓' },
    { label: 'Rejected (30d)', value: '5', icon: '🗙' },
  ];

  const toggleAll = () => setSelected(selected.length === DEMO_APPLICANTS.length ? [] : DEMO_APPLICANTS.map((a) => a.id));
  const toggleOne = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="page-enter" style={{ fontFamily: "'Inter', sans-serif", background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Title & Description Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', gap: 6, fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
            <span>Membership</span>
            <span>›</span>
            <span style={{ color: '#2563eb' }}>Applications</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginTop: 4 }}>Membership Applications</h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            Review and manage new researcher affiliation requests.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '9px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, background: '#fff', fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
            📥 Export CSV
          </button>
          <button style={{ padding: '9px 18px', border: 'none', borderRadius: 10, background: '#2563eb', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            + Add Manual Application
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {stats.map((s, i) => (
          <div key={s.label} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{s.label}</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', marginTop: 4 }}>{s.value}</h2>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Table Tools */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6, background: '#f1f5f9', padding: 3, borderRadius: 8 }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '6px 14px', border: 'none', borderRadius: 6,
                background: activeFilter === f ? '#2563eb' : 'transparent',
                color: activeFilter === f ? '#fff' : '#64748b',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <select style={{ padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 12, outline: 'none', background: '#fff', cursor: 'pointer' }}>
            <option>All Universities</option>
          </select>
          <button style={{ padding: '8px 14px', border: '1.5px solid #fee2e2', borderRadius: 10, background: '#fff', color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            🗑️ Bulk Delete
          </button>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '12px 16px', width: 40 }}>
                <input type="checkbox" checked={selected.length === DEMO_APPLICANTS.length} onChange={toggleAll} style={{ accentColor: '#2563eb' }}/>
              </th>
              {['Applicant', 'University & Dept.', 'Application Date', 'Status', 'Actions'].map((h) => (
                <th key={h} style={{
                  padding: '12px 16px', textAlign: 'left',
                  fontSize: 11, fontWeight: 700, color: '#94a3b8',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_APPLICANTS.map((a) => (
              <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px' }}>
                  <input type="checkbox" checked={selected.includes(a.id)} onChange={() => toggleOne(a.id)} style={{ accentColor: '#2563eb' }}/>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: a.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>
                      {a.initials}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{a.name}</p>
                      <p style={{ fontSize: 11, color: '#94a3b8' }}>{a.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{a.uni}</p>
                  <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{a.dept}</p>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 12, color: '#64748b' }}>
                  {a.date}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 20,
                    background: a.statusColor, color: a.statusText,
                    fontSize: 11, fontWeight: 700,
                  }}>
                    ● {a.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{ padding: '5px 10px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', color: '#2563eb', fontSize: 12, cursor: 'pointer' }}>Review</button>
                    <button style={{ padding: '5px 10px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', color: '#64748b', fontSize: 12, cursor: 'pointer' }}>⋮</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ fontSize: 12, color: '#64748b' }}>Showing 1-10 of 24 applications</p>
        <div style={{ display: 'flex', gap: 4 }}>
          <button style={{ width: 32, height: 32, border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#cbd5e1' }}>‹</button>
          {[1,2,3].map((p) => (
            <button key={p} style={{
              width: 32, height: 32, border: '1.5px solid #e2e8f0', borderRadius: 8,
              background: p === 1 ? '#2563eb' : '#fff',
              color: p === 1 ? '#fff' : '#374151',
              fontWeight: p === 1 ? 700 : 400,
              fontSize: 12, cursor: 'pointer',
            }}>{p}</button>
          ))}
          <button style={{ width: 32, height: 32, border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#374151' }}>›</button>
        </div>
      </div>

      {/* Bottom Layout Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, marginTop: 12 }}>
        
        {/* Application Trends Bar Chart */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#334155', marginBottom: 16 }}>Application Trends</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: 160, paddingBottom: 10 }}>
            {[
              { label: 'AUG', val: 78, bg: '#dbeafe' },
              { label: 'SEP', val: 52, bg: '#dbeafe' },
              { label: 'OCT', val: 96, bg: '#2563eb' },
              { label: 'NOV', val: 32, bg: '#cbd5e1' },
            ].map((bar) => (
              <div key={bar.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 44 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#475569' }}>{bar.val}</span>
                <div style={{ width: '100%', height: `${(bar.val / 100) * 120}px`, background: bar.bg, borderRadius: '4px 4px 0 0' }} />
                <span style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8' }}>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side Stack (Quick Notes + AI Screening) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Quick Notes */}
          <div className="card" style={{ padding: 16, borderLeft: '4px solid #f59e0b' }}>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#d97706', marginBottom: 6 }}>💡 Quick Notes</h4>
            <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.5, fontStyle: 'italic' }}>
              "Please prioritize applications from the upcoming Pan-European conference attendees listed in the 'News' document."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f59e0b', color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>RC</div>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#64748b' }}>Dr. Robert Chen (Chief Admin)</span>
            </div>
          </div>

          {/* Automated Screening */}
          <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>🤖</span>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: '#334155' }}>Automated Screening</h4>
            </div>
            <p style={{ fontSize: 11, color: '#64748b', lineHeight: 1.4 }}>
              Our AI screening tool has pre-processed 18 applications for missing documents.
            </p>
            <button style={{ width: '100%', padding: '8px', border: '1.5px solid #2563eb', borderRadius: 8, color: '#2563eb', background: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
              Run Screening Now
            </button>
          </div>

        </div>

      </div>

      {/* Footer bar status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', padding: '12px 0', fontSize: 11, color: '#94a3b8', marginTop: 'auto' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
          System Status: All Systems Nominal
        </span>
      </div>

    </div>
  );
};

export default MembershipRequests;
