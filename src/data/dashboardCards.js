/**
 * Dashboard stat-card definitions.
 * The `value` field is populated at runtime from API data.
 */

export const dashboardCards = [
  {
    id: 'total-members',
    label: 'Total Members',
    icon: 'Users',
    color: '#2563eb',
    bgColor: '#dbeafe',
    apiKey: 'totalMembers',
    trendKey: 'membersTrend',
    link: '/members',
  },
  {
    id: 'news-articles',
    label: 'News Articles',
    icon: 'Newspaper',
    color: '#7c3aed',
    bgColor: '#ede9fe',
    apiKey: 'totalNews',
    trendKey: 'newsTrend',
    link: '/news',
  },
  {
    id: 'upcoming-events',
    label: 'Upcoming Events',
    icon: 'CalendarDays',
    color: '#059669',
    bgColor: '#d1fae5',
    apiKey: 'upcomingEvents',
    trendKey: 'eventsTrend',
    link: '/events',
  },
  {
    id: 'research-papers',
    label: 'Research Papers',
    icon: 'FlaskConical',
    color: '#d97706',
    bgColor: '#fef3c7',
    apiKey: 'totalResearch',
    trendKey: 'researchTrend',
    link: '/research',
  },
  {
    id: 'gallery-images',
    label: 'Gallery Images',
    icon: 'Image',
    color: '#0891b2',
    bgColor: '#cffafe',
    apiKey: 'totalGallery',
    trendKey: 'galleryTrend',
    link: '/gallery',
  },
  {
    id: 'unread-messages',
    label: 'Unread Messages',
    icon: 'MessageSquare',
    color: '#be185d',
    bgColor: '#fce7f3',
    apiKey: 'unreadMessages',
    trendKey: null,
    link: '/contact',
  },
];
