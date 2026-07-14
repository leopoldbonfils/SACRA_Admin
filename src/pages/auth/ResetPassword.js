import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConfig';
import authService from '../../services/authService';

const ResetPassword = () => {
  const navigate       = useNavigate();
  const [params]       = useSearchParams();
  const token          = params.get('token') || '';
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await authService.resetPassword({ token, password: form.password, confirmPassword: form.confirmPassword });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: '10px 14px', border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: 10, background: 'rgba(255,255,255,0.05)',
    color: '#f8fafc', fontSize: 14, fontFamily: 'inherit', outline: 'none', width: '100%',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a, #1e293b)', padding: 24 }}>
      <div style={{ background: 'rgba(30,41,59,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '48px 40px', width: '100%', maxWidth: 420 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 8, textAlign: 'center' }}>Reset Password</h1>
        <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', marginBottom: 28 }}>Enter your new password below.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {error && <p style={{ color: '#f87171', fontSize: 13 }}>{error}</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>New Password</label>
            <input id="reset-password" type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required placeholder="••••••••" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>Confirm Password</label>
            <input id="reset-confirm" type="password" value={form.confirmPassword} onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))} required placeholder="••••••••" style={inputStyle} />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '11px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
            {loading ? 'Resetting…' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
