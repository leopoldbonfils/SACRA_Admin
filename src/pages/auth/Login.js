import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConfig';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

/**
 * Login page – email + password form.
 */
const Login = () => {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: 24,
    }}>
      {/* Background decoration */}
      <div style={{ position: 'fixed', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -200, left: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{
        background: 'rgba(30,41,59,0.8)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24, padding: '48px 40px',
        width: '100%', maxWidth: 440,
        boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
        animation: 'scaleIn 0.3s ease',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>SACRA Admin</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {error && (
            <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, color: '#f87171', fontSize: 14 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8' }}>Email address</label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="admin@sacra.org"
              style={{
                padding: '10px 14px', border: '1.5px solid rgba(255,255,255,0.1)',
                borderRadius: 10, background: 'rgba(255,255,255,0.05)',
                color: '#f8fafc', fontSize: 14, fontFamily: 'inherit', outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8' }}>Password</label>
              <a href={ROUTES.FORGOT_PASSWORD} style={{ fontSize: 13, color: '#3b82f6' }}>Forgot password?</a>
            </div>
            <input
              id="login-password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={{
                padding: '10px 14px', border: '1.5px solid rgba(255,255,255,0.1)',
                borderRadius: 10, background: 'rgba(255,255,255,0.05)',
                color: '#f8fafc', fontSize: 14, fontFamily: 'inherit', outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            id="login-submit"
            style={{
              padding: '12px', borderRadius: 10, border: 'none',
              background: loading ? 'rgba(37,99,235,0.6)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#fff', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'opacity 0.15s',
              marginTop: 4,
            }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
