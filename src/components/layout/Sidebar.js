import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { sidebarMenu } from '../../data/sidebarMenu';
import useAuth from '../../hooks/useAuth';

/**
 * Sidebar navigation component.
 * Accepts `collapsed` and `onToggle` props from DashboardLayout.
 */
const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const location = useLocation();
  const { user }  = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="sidebar-overlay visible" onClick={onMobileClose} />
      )}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          {!collapsed && (
            <span className="sidebar-logo-text">SACRA Admin</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" aria-label="Main navigation">
          {sidebarMenu.map((section) => (
            <div key={section.section} className="sidebar-nav-section">
              {!collapsed && (
                <p className="sidebar-nav-section-label">{section.section}</p>
              )}
              {section.items.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-nav-item ${isActive ? 'active' : ''}`
                  }
                  title={collapsed ? item.label : undefined}
                  onClick={onMobileClose}
                >
                  {/* Icon placeholder – swap with lucide-react icons once installed */}
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect width="18" height="18" x="3" y="3" rx="2"/>
                  </svg>
                  {!collapsed && <span>{item.label}</span>}
                  {!collapsed && item.badge > 0 && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer – user info + collapse toggle */}
        <div className="sidebar-footer">
          {!collapsed && user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 13, fontWeight: 600, flexShrink: 0,
              }}>
                {user.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name || 'Admin'}
                </p>
                <p style={{ fontSize: 11, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.role || 'Administrator'}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
              gap: 10, background: 'none', border: 'none', cursor: 'pointer',
              color: '#64748b', fontSize: 13, padding: '8px 4px',
              borderRadius: 8, transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#e2e8f0'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {collapsed
                ? <path d="M9 18l6-6-6-6"/>
                : <path d="M15 18l-6-6 6-6"/>}
            </svg>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
