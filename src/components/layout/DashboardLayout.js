import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';

/**
 * DashboardLayout – the persistent shell around all protected pages.
 *
 * ┌──────────────────────────────────────┐
 * │  Sidebar  │  Topbar                  │
 * │           │──────────────────────────│
 * │           │  <Outlet /> (page)       │
 * │           │──────────────────────────│
 * │           │  Footer                  │
 * └──────────────────────────────────────┘
 */
const DashboardLayout = () => {
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className={`main-content ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <Topbar onMenuToggle={() => setMobileOpen((o) => !o)} />

        <main className="page-content" id="main-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
