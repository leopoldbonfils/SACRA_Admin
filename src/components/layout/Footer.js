import React from 'react';

/**
 * Admin footer – minimal branding bar at the bottom of the main content area.
 */
const Footer = () => (
  <footer className="admin-footer">
    <span>© {new Date().getFullYear()} SACRA — Students Anesthetist Collaborative Research Association</span>
    <span>Admin Panel v1.0</span>
  </footer>
);

export default Footer;
