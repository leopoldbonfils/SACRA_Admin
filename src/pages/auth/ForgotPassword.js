import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConfig';
import authService from '../../services/authService';

const ForgotPassword = () => {
  const [email,   setEmail]   = useState('');
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  const sharedInputStyle = {
    padding: '10px 14px', border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: 10, background: 'rgba(255,255,255,0.05)',
    color: '#f8fafc', fontSize: 14, fontFamily: 'inherit', outline: 'none', width: '100%',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a, #1e293b)', padding: 24 }}>
      <div style={{ background: 'rgba(30,41,59,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '48px 40px', width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>Forgot Password</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Enter your email and we'll send a reset link.</p>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <p style={{ color: '#94a3b8', fontSize: 14 }}>A password reset link has been sent to <strong style={{ color: '#f8fafc' }}>{email}</strong>.</p>
            <Link to={ROUTES.LOGIN} style={{ color: '#3b82f6', fontSize: 14 }}>← Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {error && <p style={{ color: '#f87171', fontSize: 13 }}>{error}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8' }}>Email address</label>
              <input id="forgot-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@sacra.org" style={sharedInputStyle} />
            </div>
            <button type="submit" disabled={loading} style={{ padding: '11px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>
            <Link to={ROUTES.LOGIN} style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>← Back to Login</Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
