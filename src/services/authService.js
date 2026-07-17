import api from './api';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';

/**
 * Auth service – login, logout, token management, profile.
 */
const authService = {
  /**
   * Login with email and password.
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ user: object, token: string }>}
   */
  login: async (credentials) => {
    const data = await api.post('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    return data;
  },

  /**
   * Register a new user profile.
   * @param {object} userData
   * @returns {Promise<{ user: object, token: string }>}
   */
  register: async (userData) => {
    const data = await api.post('/auth/register', userData);
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    return data;
  },

  /**
   * Logout – clear local storage.
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Send a password-reset email.
   * @param {string} email
   */
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),

  /**
   * Reset the password using a token received via email.
   * @param {{ token: string, password: string, confirmPassword: string }} payload
   */
  resetPassword: (payload) => api.post('/auth/reset-password', payload),

  /**
   * Get the current authenticated user's profile.
   */
  getProfile: () => api.get('/auth/me'),

  /**
   * Update the current user's profile.
   * @param {object} data
   */
  updateProfile: (data) => api.put('/auth/me', data),

  /**
   * Change password while authenticated.
   * @param {{ currentPassword: string, newPassword: string }} payload
   */
  changePassword: (payload) => api.put('/auth/change-password', payload),

  /**
   * Retrieve the stored user from localStorage (no API call).
   * @returns {object|null}
   */
  getStoredUser: () => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); }
    catch { return null; }
  },

  /**
   * Check if there is an active token.
   * @returns {boolean}
   */
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};

export default authService;
