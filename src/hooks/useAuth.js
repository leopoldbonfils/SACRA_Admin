import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Convenience hook for consuming AuthContext.
 *
 * @returns {{ user, loading, login, logout, updateUser, isAuthenticated }}
 *
 * @example
 * const { user, logout } = useAuth();
 */
const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an <AuthProvider>');
  return ctx;
};

export default useAuth;
