import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConfig';

/**
 * Login page – split-panel layout.
 * Left: email + password form.
 * Right: branded hero with tagline.
 */
const Login = () => {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw,  setShowPw]  = useState(false);

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
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Left panel – form ─────────────────────────────── */}
      <div style={{
        flex: '0 0 480px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 56px',
        background: '#ffffff',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#2563eb' }}>SACRA</span>
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 14, color: '#ef4444', marginBottom: 32, fontWeight: 500 }}>
          Please enter your credentials to access the researcher dashboard.
        </p>

        {/* Error */}
        {error && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 10, color: '#dc2626', fontSize: 14, marginBottom: 20,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label htmlFor="login-email" style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <input
                id="login-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="dr.smith@sacre-research.org"
                style={{
                  width: '100%', padding: '11px 14px 11px 40px',
                  border: '1.5px solid #e2e8f0', borderRadius: 10,
                  background: '#f8fafc', color: '#0f172a',
                  fontSize: 14, fontFamily: 'inherit', outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label htmlFor="login-password" style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                id="login-password"
                type={showPw ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '11px 44px 11px 40px',
                  border: '1.5px solid #e2e8f0', borderRadius: 10,
                  background: '#f8fafc', color: '#0f172a',
                  fontSize: 14, fontFamily: 'inherit', outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4,
                }}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151', cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: '#2563eb', width: 15, height: 15 }} />
              Remember me
            </label>
            <Link to={ROUTES.FORGOT_PASSWORD} style={{ fontSize: 13, color: '#2563eb', fontWeight: 500 }}>
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            id="login-submit"
            type="submit"
            disabled={loading}
            style={{
              padding: '13px', borderRadius: 10, border: 'none',
              background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#fff', fontSize: 15, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'opacity 0.15s, transform 0.15s',
              marginTop: 4,
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)',
                  borderTopColor: '#fff', borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite', display: 'inline-block',
                }}/>
                Signing in…
              </>
            ) : (
              <>Sign in →</>
            )}
          </button>
        </form>

        {/* Register redirect */}
        <p style={{ marginTop: 20, fontSize: 13, color: '#64748b', textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to={ROUTES.REGISTER} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
            Register here
          </Link>
        </p>

        {/* Support link */}
        <p style={{ marginTop: 20, fontSize: 13, color: '#94a3b8', textAlign: 'center' }}>
          Need assistance?{' '}
          <a href="mailto:support@sacra.org" style={{ color: '#2563eb', fontWeight: 500 }}>
            Contact IT Support
          </a>
        </p>

        {/* Footer */}
        <p style={{ marginTop: 'auto', paddingTop: 40, fontSize: 11, color: '#cbd5e1', textAlign: 'center' }}>
          © 2024 Students Anesthetic Collaborative Research Association.
        </p>
      </div>

      {/* ── Right panel – hero ────────────────────────────── */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 40%, #1e40af 70%, #4f46e5 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 64px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 320, height: 320, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)', pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', bottom: -120, left: -120,
          width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }}/>

        {/* Collaborative Innovation badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 20, padding: '6px 16px',
          marginBottom: 32,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }}/>
          <span style={{ fontSize: 12, color: '#fff', fontWeight: 600, letterSpacing: '0.03em' }}>
            Collaborative Innovation
          </span>
        </div>

        <h2 style={{
          fontSize: 40, fontWeight: 800, color: '#fff',
          lineHeight: 1.2, textAlign: 'center', marginBottom: 20, maxWidth: 460,
        }}>
          Advancing the future of anesthesia research.
        </h2>

        <p style={{
          fontSize: 15, color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.7, textAlign: 'center', maxWidth: 400,
        }}>
          Join an international community of clinical students and researchers
          dedicated to precision and student-led collaborative studies.
        </p>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: 40, marginTop: 48,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 16, padding: '20px 36px',
        }}>
          {[
            { value: '2,543', label: 'Members' },
            { value: '312',   label: 'Abstracts' },
            { value: '12',    label: 'Events' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{s.value}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Spin animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Login;
