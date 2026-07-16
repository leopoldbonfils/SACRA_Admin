import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConfig';

const EventsList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Events');

  const tabs = ['All Events', 'Draft', 'Live', 'Past'];

  return (
    <div className="page-enter" style={{ fontFamily: "'Inter', sans-serif", background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600 }}>SACRA Admin</span>
          <div style={{ position: 'relative', width: 220 }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              style={{
                width: '100%', padding: '7px 10px 7px 30px',
                border: '1.5px solid #e2e8f0', borderRadius: 8,
                background: '#fff', color: '#0f172a', fontSize: 12,
                fontFamily: 'inherit', outline: 'none',
              }}
            />
          </div>
        </div>
        <button
          onClick={() => navigate(ROUTES.EVENTS_CREATE)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 18px', border: 'none', borderRadius: 10,
            background: '#2563eb', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
          + Create Event
        </button>
      </div>

      {/* Title & Description */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>Event Management</h1>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
          Manage international clinical workshops, research seminars, and association meetups.
        </p>
      </div>

      {/* Tabs & View Modes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: 8 }}>
        <div style={{ display: 'flex', gap: 20, fontSize: 13 }}>
          {tabs.map((t) => (
            <span
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                color: activeTab === t ? '#2563eb' : '#64748b',
                fontWeight: activeTab === t ? 600 : 500,
                borderBottom: activeTab === t ? '2px solid #2563eb' : 'none',
                paddingBottom: 10,
                cursor: 'pointer',
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {/* Grid View toggle */}
          <button style={{ padding: '6px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#2563eb' }}>
            📊
          </button>
          {/* Calendar View toggle */}
          <button style={{ padding: '6px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#64748b' }}>
            📅
          </button>
        </div>
      </div>

      {/* Layout Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        
        {/* Left Side: Events Lists */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Featured Large Event Card */}
          <div className="card" style={{
            padding: 0, overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(rgba(15,23,42,0.8), rgba(15,23,42,0.9)), url("https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600") center/cover no-repeat',
            color: '#fff', height: 280, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          }}>
            <span style={{
              position: 'absolute', top: 16, right: 16,
              background: '#10b981', color: '#fff',
              fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 20,
              letterSpacing: '0.05em',
            }}>
              ● LIVE NOW
            </span>
            
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 11, color: '#93c5fd', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Clinical Workshop | Johns Hopkins Medical Center
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                Advanced Anesthetic Protocols: The 2024 International Summit
              </h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#cbd5e1' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', color: '#94a3b8' }}>Attendees</span>
                    <strong style={{ color: '#fff' }}>1,240 / 1,500</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', color: '#94a3b8' }}>Date</span>
                    <strong style={{ color: '#fff' }}>Oct 12-14</strong>
                  </div>
                </div>
                
                <button style={{
                  padding: '10px 20px', background: '#fff', color: '#0f172a',
                  border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                }}>
                  Manage Registrations
                </button>
              </div>
            </div>
          </div>

          {/* Sub Grid (2 Events) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            
            {/* Event 1 (Draft) */}
            <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Nov 18, 2024</span>
                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>DRAFT</span>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
                Modern Analgesia: Beyond Traditional Opioids
              </h3>
              <div style={{ fontSize: 12, color: '#64748b', display: 'flex', gap: 12 }}>
                <span>👥 450 Registered</span>
                <span>📍 London, UK</span>
              </div>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                <button onClick={() => navigate(ROUTES.EVENTS_EDIT)} style={{ padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer', flex: 1, marginRight: 8 }}>
                  Edit Draft
                </button>
                <button style={{ padding: '8px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>⚙️</button>
              </div>
            </div>

            {/* Event 2 (Live) */}
            <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Dec 01, 2024</span>
                <span style={{ background: '#d1fae5', color: '#065f46', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>LIVE</span>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
                Pediatric Anesthesia Intensive: Hands-on Lab
              </h3>
              <div style={{ fontSize: 12, color: '#64748b', display: 'flex', gap: 12 }}>
                <span>👥 82 Registered</span>
                <span>📍 Tokyo, JP</span>
              </div>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                <button onClick={() => navigate(ROUTES.EVENTS_VIEW)} style={{ padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer', flex: 1, marginRight: 8 }}>
                  View Details
                </button>
                <button style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: 'pointer' }}>⋮</button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side: Calendar & Deadlines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Calendar Block */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Schedule</h3>
              <div style={{ display: 'flex', gap: 8, fontSize: 11, color: '#64748b' }}>
                <span>‹</span>
                <span>›</span>
              </div>
            </div>
            {/* Simple calendar header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', fontSize: 10, color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>
              {['S','M','T','W','T','F','S'].map((d, i) => <span key={i}>{d}</span>)}
            </div>
            {/* Simple calendar numbers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', fontSize: 11 }}>
              {[29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((num, i) => (
                <span key={i} style={{
                  padding: '4px 0', borderRadius: 6, cursor: 'pointer',
                  background: num === 8 ? '#2563eb' : 'transparent',
                  color: num === 8 ? '#fff' : num > 28 ? '#cbd5e1' : '#334155',
                  fontWeight: num === 8 ? 700 : 400,
                }}>
                  {num}
                </span>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>Upcoming Deadlines</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#ef4444', fontSize: 12, marginTop: 2 }}>●</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>Abstract Submissions End</p>
                  <p style={{ fontSize: 10, color: '#94a3b8' }}>SACRA Research Symposium</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#3b82f6', fontSize: 12, marginTop: 2 }}>●</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>Early Bird Registration</p>
                  <p style={{ fontSize: 10, color: '#94a3b8' }}>Winter Clinical Seminar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Annual Performance Card */}
          <div className="card" style={{ padding: 20, background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)', color: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 10, textTransform: 'uppercase', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.04em' }}>Annual Performance</span>
            <span style={{ fontSize: 32, fontWeight: 800 }}>42,500</span>
            <p style={{ fontSize: 11, color: '#bfdbfe', lineHeight: 1.4 }}>
              Total registrations across all SACRA events this fiscal year. Increased by 13% compared to Q3 2023.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 12, fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Workshops</span>
                <strong>18</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Seminars</span>
                <strong>24</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Conferences</span>
                <strong>03</strong>
              </div>
            </div>

            <button style={{ width: '100%', padding: '9px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', marginTop: 4 }}>
              Download Annual Report
            </button>
          </div>

        </div>

      </div>

      {/* Editor bottom bar / Footer info */}
      <div style={{ borderTop: '1px solid #e2e8f0', background: '#fff', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, marginTop: 'auto' }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 10 }}>JD</div>
        <div>
          <p style={{ fontWeight: 600, color: '#334155' }}>Dr. Jane Doe</p>
          <p style={{ color: '#94a3b8', fontSize: 10 }}>Administrator</p>
        </div>
      </div>

    </div>
  );
};

export default EventsList;
