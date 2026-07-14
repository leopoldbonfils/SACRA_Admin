/**
 * Sidebar navigation menu configuration.
 * Each item maps to a route and a Lucide icon name.
 */

export const sidebarMenu = [
  {
    section: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard',    icon: 'LayoutDashboard', path: '/dashboard' },
    ],
  },
  {
    section: 'Content',
    items: [
      { id: 'news',     label: 'News',          icon: 'Newspaper',       path: '/news' },
      { id: 'events',   label: 'Events',         icon: 'CalendarDays',    path: '/events' },
      { id: 'videos',   label: 'Videos',         icon: 'Video',           path: '/videos' },
      { id: 'gallery',  label: 'Gallery',        icon: 'Image',           path: '/gallery' },
      { id: 'research', label: 'Research',       icon: 'FlaskConical',    path: '/research' },
    ],
  },
  {
    section: 'People',
    items: [
      { id: 'members',  label: 'Members',        icon: 'Users',           path: '/members' },
      { id: 'contact',  label: 'Messages',       icon: 'MessageSquare',   path: '/contact', badge: 0 },
    ],
  },
  {
    section: 'Library',
    items: [
      { id: 'resources', label: 'Resources',     icon: 'FolderOpen',      path: '/resources' },
    ],
  },
  {
    section: 'System',
    items: [
      { id: 'settings', label: 'Settings',       icon: 'Settings',        path: '/settings' },
    ],
  },
];
