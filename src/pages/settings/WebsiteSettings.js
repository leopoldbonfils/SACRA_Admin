import React, { useState, useRef } from 'react';

const INITIAL_TEAM = [
  { name: 'Olivier Twubahimana',    role: 'Founder & President',         bio: 'Leading the association with vision and integrity, ensuring all goals are met.',                  photo: null, x: 'https://x.com/SACRA_Anesthesia', facebook: 'https://facebook.com/SACRAResearch', instagram: 'https://instagram.com/sacra_research', linkedin: 'https://linkedin.com/in/olivier-twubahimana' },
  { name: 'Deborah Shimwa',         role: 'Well and Social Affairs',      bio: 'Supporting the President and overseeing internal operations and committees.',                     photo: null, x: 'https://x.com/SACRA_Anesthesia', facebook: 'https://facebook.com/SACRAResearch', instagram: 'https://instagram.com/sacra_research', linkedin: 'https://linkedin.com/company/sacra-research' },
  { name: 'Jean-Claude Niyonisaba', role: 'Vice President & Co-Founder', bio: 'Driving strategic initiatives, collaborative research partnerships, and clinical audits.',        photo: null, x: 'https://x.com/SACRA_Anesthesia', facebook: 'https://facebook.com/SACRAResearch', instagram: 'https://instagram.com/sacra_research', linkedin: 'https://linkedin.com/company/sacra-research' },
  { name: 'Marie-Claire Uwineza',   role: 'Secretary General',           bio: 'Managing board communications, institutional relationships, and member documentation.',           photo: null, x: 'https://x.com/SACRA_Anesthesia', facebook: 'https://facebook.com/SACRAResearch', instagram: 'https://instagram.com/sacra_research', linkedin: 'https://linkedin.com/company/sacra-research' },
  { name: 'MBABAZI CLEMANTINE',     role: 'Director of Research',        bio: 'Overseeing multicenter audits, database management, and academic abstract submissions.',           photo: null, x: 'https://x.com/SACRA_Anesthesia', facebook: 'https://facebook.com/SACRAResearch', instagram: 'https://instagram.com/sacra_research', linkedin: 'https://linkedin.com/company/sacra-research' },
  { name: 'Grace Gakire',           role: 'Treasurer & Finance Chair',   bio: 'Managing research grants, conference travel funds, and annual budgets.',                          photo: null, x: 'https://x.com/SACRA_Anesthesia', facebook: 'https://facebook.com/SACRAResearch', instagram: 'https://instagram.com/sacra_research', linkedin: 'https://linkedin.com/company/sacra-research' },
  { name: 'Eric Ndahimana',         role: 'Director of Education',       bio: 'Coordinating weekly case discussions, airway simulation labs, and guest webinars.',               photo: null, x: 'https://x.com/SACRA_Anesthesia', facebook: 'https://facebook.com/SACRAResearch', instagram: 'https://instagram.com/sacra_research', linkedin: 'https://linkedin.com/company/sacra-research' },
  { name: 'Divine Mutesi',          role: 'Public Relations Officer',    bio: 'Directing community outreach, hospital health advocacy, and media relations.',                    photo: null, x: 'https://x.com/SACRA_Anesthesia', facebook: 'https://facebook.com/SACRAResearch', instagram: 'https://instagram.com/sacra_research', linkedin: 'https://linkedin.com/company/sacra-research' },
  { name: 'Patrick Habimana',       role: 'IT & Digital Infrastructure', bio: 'Maintaining the SACRA research portal, databases, and digital communication tools.',             photo: null, x: 'https://x.com/SACRA_Anesthesia', facebook: 'https://facebook.com/SACRAResearch', instagram: 'https://instagram.com/sacra_research', linkedin: 'https://linkedin.com/company/sacra-research' },
  { name: 'Aline Uwera',            role: 'Clinical Audit Coordinator',  bio: 'Supervising hospital safety check-list compliance audits and data entry.',                       photo: null, x: 'https://x.com/SACRA_Anesthesia', facebook: 'https://facebook.com/SACRAResearch', instagram: 'https://instagram.com/sacra_research', linkedin: 'https://linkedin.com/company/sacra-research' },
  { name: 'Dr. Sarah Jenkins',      role: 'Founding Faculty Advisor',    bio: 'Attending Anesthesiologist advising on research methodology and clinical safety.',               photo: null, x: 'https://x.com/SACRA_Anesthesia', facebook: 'https://facebook.com/SACRAResearch', instagram: 'https://instagram.com/sacra_research', linkedin: 'https://linkedin.com/company/sacra-research' },
];

const BLANK_MEMBER = { name: '', role: '', bio: '', photo: null, x: '', facebook: '', instagram: '', linkedin: '' };

const TeamMemberCard = ({ member, index, onChange, onRemove }) => {
  const fileRef = useRef(null);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const initials = member.name
    ? member.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(index, 'photo', ev.target.result);
    reader.readAsDataURL(file);
  };

  const textInput = (key, placeholder, extraStyle) => (
    <input
      type="text"
      value={member[key] || ''}
      placeholder={placeholder}
      onChange={e => onChange(index, key, e.target.value)}
      style={{ width: '100%', padding: '7px 10px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 12, color: '#334155', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', ...extraStyle }}
    />
  );

  const socialField = (key, label, prefix) => (
    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: 7, background: '#fff', overflow: 'hidden', marginBottom: 5 }}>
      <span style={{ padding: '6px 9px', background: '#f8fafc', borderRight: '1.5px solid #e2e8f0', color: '#94a3b8', fontSize: 11, whiteSpace: 'nowrap', fontWeight: 700 }}>{prefix}</span>
      <input
        type="text"
        value={member[key] || ''}
        placeholder={label}
        onChange={e => onChange(index, key, e.target.value)}
        style={{ flex: 1, padding: '6px 9px', border: 'none', outline: 'none', fontSize: 11, color: '#334155', fontFamily: 'inherit' }}
      />
    </div>
  );

  return (
    <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>

      {/* Remove button top-right */}
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6, alignItems: 'center', zIndex: 1 }}>
        {confirmRemove ? (
          <>
            <span style={{ fontSize: 10, color: '#64748b' }}>Remove?</span>
            <button
              onClick={() => onRemove(index)}
              style={{ background: '#ef4444', border: 'none', color: '#fff', borderRadius: 5, padding: '3px 8px', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}
            >Yes</button>
            <button
              onClick={() => setConfirmRemove(false)}
              style={{ background: '#e2e8f0', border: 'none', color: '#334155', borderRadius: 5, padding: '3px 8px', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}
            >No</button>
          </>
        ) : (
          <button
            onClick={() => setConfirmRemove(true)}
            style={{ background: 'none', border: '1px solid #fca5a5', color: '#ef4444', borderRadius: 6, padding: '3px 8px', fontSize: 11, cursor: 'pointer', fontWeight: 700 }}
            title="Remove member"
          >
            🗑 Remove
          </button>
        )}
      </div>

      {/* Avatar + editable info */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingRight: 96 }}>
        <div
          onClick={() => fileRef.current.click()}
          style={{
            width: 60, height: 60, borderRadius: '50%',
            background: member.photo ? 'transparent' : '#dbeafe',
            border: '2px dashed #93c5fd',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0, overflow: 'hidden', position: 'relative'
          }}
          title="Click to upload photo"
        >
          {member.photo
            ? <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', borderRadius: '50%' }} />
            : <span style={{ fontWeight: 800, fontSize: 15, color: '#1e40af' }}>{initials}</span>
          }
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0, transition: 'opacity 0.2s', borderRadius: '50%'
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0}
          >
            <span style={{ color: '#fff', fontSize: 12 }}>📷</span>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {textInput('name', 'Full Name *', { fontWeight: 700, fontSize: 13 })}
          {textInput('role', 'Role / Title *')}
          {textInput('bio',  'Short bio (optional)', { color: '#64748b' })}
          {member.photo && (
            <button
              onClick={() => onChange(index, 'photo', null)}
              style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 10, cursor: 'pointer', padding: 0, textAlign: 'left' }}
            >
              Remove photo
            </button>
          )}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #f1f5f9' }} />

      {/* Social links */}
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>Social Links</p>
        {socialField('x',         'https://x.com/…',         '𝕏')}
        {socialField('facebook',  'https://facebook.com/…',  'f')}
        {socialField('instagram', 'https://instagram.com/…', '📷')}
        {socialField('linkedin',  'https://linkedin.com/…',  'in')}
      </div>
    </div>
  );
};

const WebsiteSettings = () => {
  const [assocName, setAssocName] = useState('Students Anesthetist Collaborative Research Association (SACRA)');
  const [metaTitle, setMetaTitle] = useState('SACRA | Global Anesthetist Re...');
  const [metaDesc, setMetaDesc] = useState('The leading association for student anesthetists engaged in global collaborative research and clinical studies.');
  const [analyticsId, setAnalyticsId] = useState('G-XXXXXXXXXX');
  const [mission, setMission] = useState('To promote safe anesthesia practices, foster a culture of research, and engage in impactful community outreach to improve public health outcomes.');
  const [vision, setVision] = useState('To be a leading student association that empowers future anesthetists to become innovators, leaders, and advocates for global health equity.');
  const [email, setEmail] = useState('admin@sacra-research.org');
  const [phone, setPhone] = useState('+44 20 7946 0123');
  const [address, setAddress] = useState('12-14 Medical Innovation Centre, King\'s Cross, London, WC1X 9AA');
  const [linkedin, setLinkedin] = useState('linkedin.com/company/sacra-research');
  const [twitter, setTwitter] = useState('twitter.com/SACRA_Anesthesia');
  const [researchGate, setResearchGate] = useState('researchgate.net/lab/sacra-lab');
  const [team, setTeam] = useState(INITIAL_TEAM);

  const updateTeamMember = (index, key, value) => {
    setTeam(prev => prev.map((m, i) => i === index ? { ...m, [key]: value } : m));
  };

  const removeTeamMember = (index) => {
    setTeam(prev => prev.filter((_, i) => i !== index));
  };

  const addTeamMember = () => {
    setTeam(prev => [...prev, { ...BLANK_MEMBER }]);
  };


  return (
    <div className="page-enter" style={{ fontFamily: "'Inter', sans-serif", background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Top Navbar Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Website Settings</h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            Configuration Dashboard – Manage SACRA's digital presence and clinical research identity.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
            Discard Changes
          </button>
          <button style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Publish All Updates
          </button>
        </div>
      </div>

      {/* Main Form Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Row 1: General Info & SEO Settings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 20 }}>
          
          {/* General Information */}
          <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🛡️</span>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: '#334155' }}>General Information</h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>✏️ Edit</button>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>Association Full Name</label>
              <input 
                type="text" 
                value={assocName} 
                onChange={(e) => setAssocName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#334155', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>Primary Association Logo</label>
                <div style={{ border: '1.5px dashed #cbd5e1', borderRadius: 8, padding: '20px 10px', textAlign: 'center', background: '#f8fafc', cursor: 'pointer' }}>
                  <span style={{ fontSize: 18, display: 'block' }}>🖼️</span>
                  <span style={{ fontSize: 10, color: '#94a3b8', display: 'block', marginTop: 4 }}>Click to upload or drag & drop</span>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>Favicon (Small Scale)</label>
                <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '12px', textAlign: 'center', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%', gap: 4 }}>
                  <div style={{ width: 24, height: 24, background: '#1e3a8a', color: '#fff', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11 }}>S</div>
                  <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>Change Favicon</button>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🔍</span>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: '#334155' }}>SEO Settings</h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>Meta Title</label>
              <input 
                type="text" 
                value={metaTitle} 
                onChange={(e) => setMetaTitle(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#334155', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>Meta Description</label>
              <textarea 
                value={metaDesc} 
                onChange={(e) => setMetaDesc(e.target.value)}
                rows="2"
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12, color: '#334155', outline: 'none', fontFamily: 'inherit', resize: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>Google Analytics ID</label>
              <input 
                type="text" 
                value={analyticsId} 
                onChange={(e) => setAnalyticsId(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#334155', outline: 'none' }}
              />
            </div>
          </div>

        </div>

        {/* Row 2: Brand Identity (Mission & Vision) */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✨</span>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: '#334155' }}>Brand Identity</h3>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>Revert</button>
              <button style={{ padding: '4px 12px', background: '#e0e7ff', color: '#4f46e5', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Save Section</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>🚀 Mission Statement</label>
              <textarea 
                value={mission} 
                onChange={(e) => setMission(e.target.value)}
                rows="4"
                style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12, color: '#334155', outline: 'none', fontFamily: 'inherit', resize: 'none', lineHeight: 1.6 }}
              />
              <span style={{ fontSize: 10, color: '#94a3b8', display: 'block', marginTop: 4 }}>This appears on the "About Us" and "Welcome" sections of the public site.</span>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>👁️ Vision Statement</label>
              <textarea 
                value={vision} 
                onChange={(e) => setVision(e.target.value)}
                rows="4"
                style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12, color: '#334155', outline: 'none', fontFamily: 'inherit', resize: 'none', lineHeight: 1.6 }}
              />
              <span style={{ fontSize: 10, color: '#94a3b8', display: 'block', marginTop: 4 }}>Defined to guide the association's long-term strategic planning.</span>
            </div>
          </div>
        </div>

        {/* Row 3: Contact Details & Social Links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          
          {/* Contact Details */}
          <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📄</span>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: '#334155' }}>Contact Details</h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>Office Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#334155', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>Phone Number</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#334155', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>HQ Address</label>
              <textarea 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                rows="2"
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#334155', outline: 'none', fontFamily: 'inherit', resize: 'none' }}
              />
            </div>

            {/* Simulated mini map */}
            <div style={{ height: 100, background: '#e2e8f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 12, fontWeight: 600, border: '1px solid #cbd5e1' }}>
              📍 HQ Location Map
            </div>
          </div>

          {/* Social Links */}
          <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🔗</span>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: '#334155' }}>Social Links</h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>LINKEDIN</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', overflow: 'hidden' }}>
                  <span style={{ padding: '9px 12px', background: '#f8fafc', borderRight: '1.5px solid #e2e8f0', color: '#94a3b8', fontSize: 12 }}>in</span>
                  <input 
                    type="text" 
                    value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)}
                    style={{ flex: 1, padding: '9px 12px', border: 'none', outline: 'none', fontSize: 13, color: '#334155' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>TWITTER / X</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', overflow: 'hidden' }}>
                  <span style={{ padding: '9px 12px', background: '#f8fafc', borderRight: '1.5px solid #e2e8f0', color: '#94a3b8', fontSize: 12 }}>𝕏</span>
                  <input 
                    type="text" 
                    value={twitter} 
                    onChange={(e) => setTwitter(e.target.value)}
                    style={{ flex: 1, padding: '9px 12px', border: 'none', outline: 'none', fontSize: 13, color: '#334155' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>RESEARCHGATE</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', overflow: 'hidden' }}>
                  <span style={{ padding: '9px 12px', background: '#f8fafc', borderRight: '1.5px solid #e2e8f0', color: '#94a3b8', fontSize: 12 }}>RG</span>
                  <input 
                    type="text" 
                    value={researchGate} 
                    onChange={(e) => setResearchGate(e.target.value)}
                    style={{ flex: 1, padding: '9px 12px', border: 'none', outline: 'none', fontSize: 13, color: '#334155' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ background: '#eff6ff', padding: 12, borderRadius: 8, fontSize: 11, color: '#1e40af', border: '1px solid #bfdbfe' }}>
              💡 Link previews are automatically generated in the footer.
            </div>
          </div>

        </div>

      </div>

      {/* Row 4: Team Members */}
      <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>👥</span>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: '#334155' }}>
              Team Members — Photos &amp; Social Links
              <span style={{ marginLeft: 8, background: '#e2e8f0', color: '#64748b', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99 }}>{team.length}</span>
            </h3>
          </div>
          <button
            onClick={addTeamMember}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
          >
            ＋ Add Member
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {team.map((member, idx) => (
            <TeamMemberCard key={idx} member={member} index={idx} onChange={updateTeamMember} onRemove={removeTeamMember} />
          ))}
          {team.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 40, color: '#94a3b8', fontSize: 13 }}>
              No team members yet. Click <strong>＋ Add Member</strong> to get started.
            </div>
          )}
        </div>
        <div style={{ background: '#f0fdf4', padding: 12, borderRadius: 8, fontSize: 11, color: '#15803d', border: '1px solid #bbf7d0' }}>
          ✅ Use <strong>🗑 Remove</strong> to delete a member • <strong>＋ Add Member</strong> to add a new one • Click the avatar circle to upload a photo.
        </div>
      </div>


      {/* Editor bottom bar / Footer info */}
      <div style={{ borderTop: '1px solid #e2e8f0', background: '#fff', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, marginTop: 'auto' }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 10 }}>A</div>
        <div>
          <p style={{ fontWeight: 600, color: '#334155' }}>Administrator</p>
          <p style={{ color: '#94a3b8', fontSize: 10 }}>Site Admin</p>
        </div>
      </div>

    </div>
  );
};

export default WebsiteSettings;
