import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConfig';
import galleryService from '../../services/galleryService';

const DEMO_ASSETS = [
  {
    id: '1',
    name: 'genetic_sequence_abstract.jpg',
    type: 'JPEG Image',
    size: '2.4 MB',
    dimensions: '4200 x 5600 px',
    uploadedBy: 'James Sutherland (Admin)',
    date: 'October 12, 2023',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    icon: '🧬',
  },
  {
    id: '2',
    name: 'laboratory_equipment_microscope.jpg',
    type: 'JPEG Image',
    size: '4.1 MB',
    dimensions: '3000 x 4000 px',
    uploadedBy: 'Elena Moretti (Admin)',
    date: 'October 10, 2023',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    icon: '🔬',
  },
  {
    id: '3',
    name: 'anesthetic_drip_infusion.jpg',
    type: 'JPEG Image',
    size: '1.8 MB',
    dimensions: '2400 x 3600 px',
    uploadedBy: 'Dr. Sarah Jenkins',
    date: 'October 08, 2023',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    icon: '💧',
  },
  {
    id: '4',
    name: 'researchers_colleague_meeting.jpg',
    type: 'JPEG Image',
    size: '3.5 MB',
    dimensions: '3800 x 2800 px',
    uploadedBy: 'James Sutherland (Admin)',
    date: 'October 05, 2023',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    icon: '👥',
  },
  {
    id: '5',
    name: 'clinical_center_building_exterior.jpg',
    type: 'JPEG Image',
    size: '5.2 MB',
    dimensions: '6000 x 4000 px',
    uploadedBy: 'Dr. Sarah Jenkins',
    date: 'October 02, 2023',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    icon: '🏢',
  },
  {
    id: '6',
    name: 'stethoscope_tablet_desk.jpg',
    type: 'JPEG Image',
    size: '2.1 MB',
    dimensions: '3200 x 2400 px',
    uploadedBy: 'Elena Moretti (Admin)',
    date: 'September 28, 2023',
    gradient: 'linear-gradient(135deg, #4b5563 0%, #1f2937 100%)',
    icon: '🩺',
  },
];


const GalleryList = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Images');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const tabs = ['Images', 'Videos', 'Documents', 'Logos'];

  const fetchAssets = async () => {
    setLoading(true);
    try {
      // Map activeTab to category query parameter
      const data = await galleryService.getAll({ search, category: activeTab });
      setAssets(data);
      if (data.length > 0) {
        setSelectedAsset(data[0]);
      } else {
        setSelectedAsset(null);
      }
    } catch (err) {
      console.error('Failed to fetch media assets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [search, activeTab]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', activeTab);

    setUploading(true);
    try {
      await galleryService.upload(formData);
      await fetchAssets();
    } catch (err) {
      alert(err.message || 'Failed to upload media file');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedAsset) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedAsset.name}?`)) return;

    try {
      await galleryService.remove(selectedAsset.id);
      await fetchAssets();
    } catch (err) {
      alert(err.message || 'Failed to delete asset');
    }
  };

  // Helper for item icon representation
  const getIcon = (type, name) => {
    if (type && type.startsWith('image/')) return '🖼️';
    if (type && type.startsWith('video/')) return '🎥';
    if (name && name.endsWith('.pdf')) return '📄';
    return '📁';
  };

  return (
    <div className="page-enter" style={{ fontFamily: "'Inter', sans-serif", background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
      />

      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Media Library</h1>
          <div style={{ position: 'relative', width: 260 }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets..."
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
          onClick={handleUploadClick}
          disabled={uploading}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 18px', border: 'none', borderRadius: 10,
            background: '#2563eb', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
          {uploading ? 'Uploading...' : '📥 Upload Media'}
        </button>
      </div>

      {/* Tabs & View Configs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
        <div style={{ display: 'flex', gap: 6, background: '#f1f5f9', padding: 3, borderRadius: 8 }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                padding: '6px 14px', border: 'none', borderRadius: 6,
                background: activeTab === t ? '#2563eb' : 'transparent',
                color: activeTab === t ? '#fff' : '#64748b',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select style={{ padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 12, outline: 'none', background: '#fff', cursor: 'pointer', color: '#475569' }}>
            <option>All Dates</option>
          </select>
          <select style={{ padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 12, outline: 'none', background: '#fff', cursor: 'pointer', color: '#475569' }}>
            <option>Sort By: Newest</option>
          </select>
          <div style={{ display: 'flex', gap: 2 }}>
            <button style={{ padding: '6px 8px', border: '1.5px solid #e2e8f0', borderRadius: 6, background: '#fff', color: '#2563eb', cursor: 'pointer' }}>📊</button>
            <button style={{ padding: '6px 8px', border: '1.5px solid #e2e8f0', borderRadius: 6, background: '#fff', color: '#64748b', cursor: 'pointer' }}>📋</button>
          </div>
        </div>
      </div>

      {/* Grid Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, flex: 1, position: 'relative' }}>
        
        {/* Left Side: Media Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, alignContent: 'start', position: 'relative' }}>
          {loading ? (
            <div style={{ gridColumn: 'span 3', padding: 32, textAlign: 'center', color: '#64748b' }}>Loading assets...</div>
          ) : assets.length === 0 ? (
            <div style={{ gridColumn: 'span 3', padding: 32, textAlign: 'center', color: '#64748b' }}>No assets found in this category.</div>
          ) : (
            assets.map((asset) => {
              const isSelected = selectedAsset?.id === asset.id;
              const isImg = asset.type && asset.type.startsWith('image/');
              return (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  style={{
                    height: 130, borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                    border: isSelected ? '3px solid #2563eb' : '1px solid #e2e8f0',
                    boxShadow: isSelected ? '0 0 0 2px rgba(37,99,235,0.15)' : 'none',
                    background: isImg ? `url(${asset.url}) center/cover no-repeat` : 'linear-gradient(135deg, #cbd5e1, #94a3b8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 40, transition: 'all 0.15s',
                  }}
                >
                  {!isImg && getIcon(asset.type, asset.name)}
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Sidebar Asset Details */}
        {selectedAsset && (
          <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: '#334155' }}>Asset Details</h3>
              <button onClick={() => setSelectedAsset(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 14 }}>✕</button>
            </div>

            {/* Asset Preview box */}
            <div style={{
              height: 150, borderRadius: 10, 
              background: selectedAsset.type?.startsWith('image/') ? `url(${selectedAsset.url}) center/cover no-repeat` : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 48,
            }}>
              {!selectedAsset.type?.startsWith('image/') && getIcon(selectedAsset.type, selectedAsset.name)}
            </div>

            {/* Detail Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderBottom: '1px solid #f1f5f9', paddingBottom: 14 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>File Name</span>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#334155', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedAsset.name}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>File Type</span>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#334155', marginTop: 2 }}>{selectedAsset.type}</p>
                </div>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>File Size</span>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#334155', marginTop: 2 }}>{selectedAsset.size}</p>
                </div>
              </div>

              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Dimensions</span>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#334155', marginTop: 2 }}>{selectedAsset.dimensions}</p>
              </div>

              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Uploaded By</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#3b82f6', color: '#fff', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AD</div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>{selectedAsset.uploadedBy}</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Date Uploaded</span>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#334155', marginTop: 2 }}>
                  {new Date(selectedAsset.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button style={{ width: '100%', padding: '10px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                onClick={handleDelete}>
                🗑️ Delete Asset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor bottom bar / Footer info */}
      <div style={{ borderTop: '1px solid #e2e8f0', background: '#fff', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, marginTop: 'auto' }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 10 }}>A</div>
        <div>
          <p style={{ fontWeight: 600, color: '#334155' }}>Admin User</p>
          <p style={{ color: '#94a3b8', fontSize: 10 }}>Super Administrator</p>
        </div>
      </div>

    </div>
  );
};

export default GalleryList;
