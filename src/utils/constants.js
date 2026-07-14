/* ── App constants ──────────────────────────────────────────
   Single source of truth for magic values used across the app.
   ──────────────────────────────────────────────────────────── */

/** Base URL for the backend API (override via .env) */
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

/** Auth token key stored in localStorage */
export const TOKEN_KEY = 'sacra_admin_token';
export const USER_KEY  = 'sacra_admin_user';

/** Default items per page for paginated lists */
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/** Max file upload sizes (bytes) */
export const MAX_IMAGE_SIZE    = 5 * 1024 * 1024;  // 5 MB
export const MAX_VIDEO_SIZE    = 200 * 1024 * 1024; // 200 MB
export const MAX_DOCUMENT_SIZE = 20 * 1024 * 1024;  // 20 MB

/** Accepted MIME types */
export const ACCEPTED_IMAGE_TYPES    = ['image/jpeg','image/png','image/webp','image/gif'];
export const ACCEPTED_DOCUMENT_TYPES = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
export const ACCEPTED_VIDEO_TYPES    = ['video/mp4','video/webm','video/ogg'];

/** Member status labels */
export const MEMBER_STATUS = {
  ACTIVE:   'active',
  INACTIVE: 'inactive',
  PENDING:  'pending',
  BANNED:   'banned',
};

/** Role labels */
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN:       'admin',
  EDITOR:      'editor',
  VIEWER:      'viewer',
};

/** News / Research status */
export const CONTENT_STATUS = {
  DRAFT:     'draft',
  PUBLISHED: 'published',
  ARCHIVED:  'archived',
};

/** Event status */
export const EVENT_STATUS = {
  UPCOMING:   'upcoming',
  ONGOING:    'ongoing',
  COMPLETED:  'completed',
  CANCELLED:  'cancelled',
};

/** Resource categories */
export const RESOURCE_CATEGORIES = [
  'Guidelines',
  'Protocols',
  'Textbooks',
  'Journal Articles',
  'Presentations',
  'Templates',
  'Others',
];

/** Toast durations (ms) */
export const TOAST_DURATION = {
  SHORT:  3000,
  NORMAL: 5000,
  LONG:   8000,
};

/** Date/time format strings */
export const DATE_FORMAT        = 'DD MMM YYYY';
export const DATE_TIME_FORMAT   = 'DD MMM YYYY, HH:mm';
export const TIME_FORMAT        = 'HH:mm';
