import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) return setError('Please fill in all fields');

    setLoading(true);
    try {
      const res = await loginApi(form);
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="form-card" style={{ width: '100%' }}>
        <div className="auth-logo">
          <div className="auth-logo-icon">🔍</div>
          <div className="form-title">Welcome back</div>
          <div className="form-subtitle">Sign in to your SRM AP Lost & Found account</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">College Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="yourname@srmap.edu.in"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => set('password', e.target.value)}
            />
          </div>

          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <span className="link-text" onClick={() => navigate('/register')}>Sign up</span>
        </div>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg)', borderRadius: '10px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <strong>Demo accounts:</strong><br />
          arjun.sharma@srmap.edu.in / password123<br />
          priya.reddy@srmap.edu.in / password123
        </div>
      </div>
    </div>
  );
}
