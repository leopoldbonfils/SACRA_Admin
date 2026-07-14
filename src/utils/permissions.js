import { ROLES } from './constants';

/**
 * Role hierarchy – higher index = more permissions.
 */
const ROLE_HIERARCHY = [
  ROLES.VIEWER,
  ROLES.EDITOR,
  ROLES.ADMIN,
  ROLES.SUPER_ADMIN,
];

/**
 * Check if a role has at least the required level.
 * @param {string} userRole
 * @param {string} requiredRole
 * @returns {boolean}
 */
export const hasRole = (userRole, requiredRole) => {
  const userIdx     = ROLE_HIERARCHY.indexOf(userRole);
  const requiredIdx = ROLE_HIERARCHY.indexOf(requiredRole);
  return userIdx >= requiredIdx;
};

/**
 * Granular permissions map.
 * Each key maps to the minimum role required.
 */
const PERMISSION_MAP = {
  // Content
  'news:read':       ROLES.VIEWER,
  'news:create':     ROLES.EDITOR,
  'news:edit':       ROLES.EDITOR,
  'news:delete':     ROLES.ADMIN,

  'events:read':     ROLES.VIEWER,
  'events:create':   ROLES.EDITOR,
  'events:edit':     ROLES.EDITOR,
  'events:delete':   ROLES.ADMIN,

  'videos:read':     ROLES.VIEWER,
  'videos:create':   ROLES.EDITOR,
  'videos:edit':     ROLES.EDITOR,
  'videos:delete':   ROLES.ADMIN,

  'gallery:read':    ROLES.VIEWER,
  'gallery:create':  ROLES.EDITOR,
  'gallery:edit':    ROLES.EDITOR,
  'gallery:delete':  ROLES.ADMIN,

  'research:read':   ROLES.VIEWER,
  'research:create': ROLES.EDITOR,
  'research:edit':   ROLES.EDITOR,
  'research:delete': ROLES.ADMIN,

  'resources:read':   ROLES.VIEWER,
  'resources:create': ROLES.EDITOR,
  'resources:edit':   ROLES.EDITOR,
  'resources:delete': ROLES.ADMIN,

  // People
  'members:read':    ROLES.VIEWER,
  'members:create':  ROLES.ADMIN,
  'members:edit':    ROLES.ADMIN,
  'members:delete':  ROLES.SUPER_ADMIN,

  'contact:read':    ROLES.EDITOR,
  'contact:delete':  ROLES.ADMIN,

  // System
  'settings:read':   ROLES.ADMIN,
  'settings:edit':   ROLES.ADMIN,
  'settings:system': ROLES.SUPER_ADMIN,
};

/**
 * Check if a user has a specific permission.
 * @param {object} user  Must have a `role` field.
 * @param {string} permission  e.g. 'news:create'
 * @returns {boolean}
 */
export const can = (user, permission) => {
  if (!user?.role) return false;
  const required = PERMISSION_MAP[permission];
  if (!required) return false;
  return hasRole(user.role, required);
};

/**
 * Guard a component: return true if the user is allowed.
 * Convenience alias for `can`.
 */
export const isAllowed = can;

/**
 * Check if the user is a super admin.
 * @param {object} user
 * @returns {boolean}
 */
export const isSuperAdmin = (user) => user?.role === ROLES.SUPER_ADMIN;

/**
 * Check if the user is at least an admin.
 * @param {object} user
 * @returns {boolean}
 */
export const isAdmin = (user) => hasRole(user?.role, ROLES.ADMIN);

/**
 * Check if the user is at least an editor.
 * @param {object} user
 * @returns {boolean}
 */
export const isEditor = (user) => hasRole(user?.role, ROLES.EDITOR);
