import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ThemeContext } from '../../context/ThemeContext';
import { ROUTES } from '../../routes/routeConfig';

/**
 * Topbar – site-wide header with hamburger, search, theme toggle, and user menu.
 */
const Topbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 6, borderRadius: 8 }}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>

        {/* Page title / breadcrumb goes here via PageHeader – Topbar stays minimal */}
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', display: 'none' /* shown on mobile */ }}>
          SACRA Admin
        </span>
      </div>

      <div className="topbar-right">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 6, borderRadius: 8 }}
        >
          {isDark ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>

        {/* Notifications */}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 6, borderRadius: 8, position: 'relative' }} aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: 'var(--color-danger)', borderRadius: '50%', border: '2px solid var(--bg-topbar)' }} />
        </button>

        {/* User avatar */}
        <div style={{ position: 'relative' }}>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            }}
            aria-label="User menu"
          >
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 13, fontWeight: 700,
            }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-primary)', display: 'none' }}>
              {user?.name || 'Admin'}
            </span>
          </button>
        </div>

        {/* Quick logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 6, borderRadius: 8 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
