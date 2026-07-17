import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routeConfig';

/**
 * Register page – premium split-panel layout.
 * Left: signup form (name, email, password, role, university, department, study year).
 * Right: branded hero with tagline.
 */
const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor',
    university: '',
    department: '',
    studyYear: 'clinical'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      await register(form);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Inter', sans-serif", background: '#f8fafc' }}>

      {/* ── Left panel – form ─────────────────────────────── */}
      <div style={{
        flex: '0 0 540px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '40px 48px',
        background: '#ffffff',
        boxShadow: '4px 0 24px rgba(0,0,0,0.02)',
        overflowY: 'auto'
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#2563eb' }}>SACRA</span>
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
          Create an account
        </h1>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>
          Join the administrative board and start editing content.
        </p>

        {/* Error */}
        {error && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 10, color: '#dc2626', fontSize: 13, marginBottom: 20,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Full Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label htmlFor="reg-name" style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
              Full Name
            </label>
            <input
              id="reg-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Dr. John Doe"
              style={{
                width: '100%', padding: '10px 14px',
                border: '1.5px solid #e2e8f0', borderRadius: 8,
                background: '#f8fafc', color: '#0f172a',
                fontSize: 13, fontFamily: 'inherit', outline: 'none',
              }}
            />
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label htmlFor="reg-email" style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
              Email Address
            </label>
            <input
              id="reg-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="john.doe@sacra.org"
              style={{
                width: '100%', padding: '10px 14px',
                border: '1.5px solid #e2e8f0', borderRadius: 8,
                background: '#f8fafc', color: '#0f172a',
                fontSize: 13, fontFamily: 'inherit', outline: 'none',
              }}
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label htmlFor="reg-password" style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="reg-password"
                type={showPw ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="•••••••• (min 6 chars)"
                style={{
                  width: '100%', padding: '10px 44px 10px 14px',
                  border: '1.5px solid #e2e8f0', borderRadius: 8,
                  background: '#f8fafc', color: '#0f172a',
                  fontSize: 13, fontFamily: 'inherit', outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4,
                }}
              >
                {showPw ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Role & Study Year (Grid) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="reg-role" style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
                System Role
              </label>
              <select
                id="reg-role"
                name="role"
                value={form.role}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '10px 12px',
                  border: '1.5px solid #e2e8f0', borderRadius: 8,
                  background: '#f8fafc', color: '#374151', fontSize: 13, outline: 'none',
                }}
              >
                <option value="editor">Editor</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="reg-year" style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
                Study/Career Year
              </label>
              <select
                id="reg-year"
                name="studyYear"
                value={form.studyYear}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '10px 12px',
                  border: '1.5px solid #e2e8f0', borderRadius: 8,
                  background: '#f8fafc', color: '#374151', fontSize: 13, outline: 'none',
                }}
              >
                <option value="clinical">Clinical Student</option>
                <option value="pre-clinical">Pre-Clinical Student</option>
                <option value="registrar">Anesthesia Registrar</option>
                <option value="fellow">Fellow</option>
                <option value="consultant">Consultant</option>
              </select>
            </div>
          </div>

          {/* University & Department */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="reg-uni" style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
                University / Hospital
              </label>
              <input
                id="reg-uni"
                type="text"
                name="university"
                value={form.university}
                onChange={handleChange}
                placeholder="Johns Hopkins University"
                style={{
                  width: '100%', padding: '10px 14px',
                  border: '1.5px solid #e2e8f0', borderRadius: 8,
                  background: '#f8fafc', color: '#0f172a',
                  fontSize: 13, fontFamily: 'inherit', outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="reg-dept" style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
                Department
              </label>
              <input
                id="reg-dept"
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Anesthesiology"
                style={{
                  width: '100%', padding: '10px 14px',
                  border: '1.5px solid #e2e8f0', borderRadius: 8,
                  background: '#f8fafc', color: '#0f172a',
                  fontSize: 13, fontFamily: 'inherit', outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px', borderRadius: 8, border: 'none',
              background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#fff', fontSize: 14, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 8,
            }}
          >
            {loading ? 'Creating account…' : 'Create Account →'}
          </button>
        </form>

        {/* Support & Redirect */}
        <p style={{ marginTop: 24, fontSize: 13, color: '#64748b', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
          </Link>
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
          fontSize: 36, fontWeight: 800, color: '#fff',
          lineHeight: 1.2, textAlign: 'center', marginBottom: 20, maxWidth: 460,
        }}>
          Build the network of anesthesia research.
        </h2>

        <p style={{
          fontSize: 14, color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.7, textAlign: 'center', maxWidth: 400,
        }}>
          Create your contributor profile to manage audits, share simulation research videos, and review member request applications.
        </p>
      </div>

    </div>
  );
};

export default Register;
