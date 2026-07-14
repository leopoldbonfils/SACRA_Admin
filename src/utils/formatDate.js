/**
 * Date / time formatting utilities.
 * Uses the native Intl API — no external dependency required.
 */

const DEFAULT_LOCALE = 'en-GB';

/**
 * Format a date value into a human-readable string.
 * @param {Date|string|number} date
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string}
 */
export const formatDate = (date, options = {}) => {
  const d = new Date(date);
  if (isNaN(d)) return '—';
  const defaults = { day: 'numeric', month: 'short', year: 'numeric' };
  return d.toLocaleDateString(DEFAULT_LOCALE, { ...defaults, ...options });
};

/**
 * Format a date AND time.
 * @param {Date|string|number} date
 * @returns {string}  e.g. "14 Jul 2026, 14:30"
 */
export const formatDateTime = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString(DEFAULT_LOCALE, {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

/**
 * Format just the time part.
 * @param {Date|string|number} date
 * @returns {string}  e.g. "14:30"
 */
export const formatTime = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return '—';
  return d.toLocaleTimeString(DEFAULT_LOCALE, { hour: '2-digit', minute: '2-digit' });
};

/**
 * Return a relative time string ("3 minutes ago", "in 2 days", etc.)
 * Falls back to `formatDate` for dates older than 30 days.
 * @param {Date|string|number} date
 * @returns {string}
 */
export const timeAgo = (date) => {
  const d       = new Date(date);
  if (isNaN(d)) return '—';
  const seconds = Math.floor((Date.now() - d) / 1000);
  const abs     = Math.abs(seconds);

  if (abs < 60)          return seconds >= 0 ? 'just now'                   : 'in a moment';
  if (abs < 3600)        return seconds >= 0 ? `${Math.floor(abs/60)}m ago` : `in ${Math.floor(abs/60)}m`;
  if (abs < 86400)       return seconds >= 0 ? `${Math.floor(abs/3600)}h ago` : `in ${Math.floor(abs/3600)}h`;
  if (abs < 86400 * 30)  return seconds >= 0 ? `${Math.floor(abs/86400)}d ago` : `in ${Math.floor(abs/86400)}d`;
  return formatDate(date);
};

/**
 * Check if a date is in the past.
 * @param {Date|string|number} date
 * @returns {boolean}
 */
export const isPast = (date) => new Date(date) < new Date();

/**
 * Check if a date is in the future.
 * @param {Date|string|number} date
 * @returns {boolean}
 */
export const isFuture = (date) => new Date(date) > new Date();

/**
 * Format a date range.
 * @param {Date|string} start
 * @param {Date|string} end
 * @returns {string}  e.g. "12 – 14 Jul 2026"
 */
export const formatDateRange = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s) || isNaN(e)) return '—';

  // Same month & year
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()} – ${e.getDate()} ${s.toLocaleString(DEFAULT_LOCALE, { month: 'short' })} ${s.getFullYear()}`;
  }
  return `${formatDate(start)} – ${formatDate(end)}`;
};

/**
 * Convert a Date to an ISO date string (YYYY-MM-DD) suitable for <input type="date">.
 * @param {Date|string|number} date
 * @returns {string}
 */
export const toInputDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return '';
  return d.toISOString().split('T')[0];
};
