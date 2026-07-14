/**
 * Central route configuration.
 * Import this wherever you need route metadata (e.g., sidebar, breadcrumbs).
 */

export const ROUTES = {
  // Auth
  LOGIN:           '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD:  '/reset-password',

  // Dashboard
  DASHBOARD: '/dashboard',

  // News
  NEWS:        '/news',
  NEWS_CREATE: '/news/create',
  NEWS_EDIT:   '/news/:id/edit',
  NEWS_VIEW:   '/news/:id',

  // Events
  EVENTS:        '/events',
  EVENTS_CREATE: '/events/create',
  EVENTS_EDIT:   '/events/:id/edit',
  EVENTS_VIEW:   '/events/:id',

  // Videos
  VIDEOS:        '/videos',
  VIDEOS_UPLOAD: '/videos/upload',
  VIDEOS_EDIT:   '/videos/:id/edit',
  VIDEOS_VIEW:   '/videos/:id',

  // Gallery
  GALLERY:         '/gallery',
  GALLERY_UPLOAD:  '/gallery/upload',
  GALLERY_ALBUMS:  '/gallery/albums',
  GALLERY_PREVIEW: '/gallery/:id',

  // Research
  RESEARCH:        '/research',
  RESEARCH_CREATE: '/research/create',
  RESEARCH_EDIT:   '/research/:id/edit',
  RESEARCH_VIEW:   '/research/:id',

  // Members
  MEMBERS:             '/members',
  MEMBERS_REQUESTS:    '/members/requests',
  MEMBERS_PROFILE:     '/members/:id',
  MEMBERS_ADD:         '/members/add',

  // Resources
  RESOURCES:          '/resources',
  RESOURCES_UPLOAD:   '/resources/upload',
  RESOURCES_CATEGORIES: '/resources/categories',

  // Contact
  CONTACT:         '/contact',
  CONTACT_MESSAGE: '/contact/:id',

  // Settings
  SETTINGS:          '/settings',
  SETTINGS_SOCIAL:   '/settings/social',
  SETTINGS_WEBSITE:  '/settings/website',
  SETTINGS_PROFILE:  '/settings/profile',
  SETTINGS_SECURITY: '/settings/security',

  // Errors
  NOT_FOUND:    '/404',
  UNAUTHORIZED: '/401',
};

/**
 * Build a concrete path by replacing `:param` placeholders.
 * @param {string} route  e.g. ROUTES.NEWS_EDIT
 * @param {object} params e.g. { id: '123' }
 * @returns {string}
 *
 * @example
 * buildPath(ROUTES.NEWS_EDIT, { id: '42' }) // '/news/42/edit'
 */
export const buildPath = (route, params = {}) =>
  Object.entries(params).reduce(
    (path, [key, val]) => path.replace(`:${key}`, val),
    route,
  );
