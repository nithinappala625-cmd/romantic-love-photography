import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Try API first; fall back to hardcoded for dev
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
        return;
      }
      setError(data.message || 'Invalid password');
    } catch {
      // Offline / no API — use hardcoded password
      if (password === 'RLP@Admin2024') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Incorrect password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg">
        <img src="/portfolio/wedding/DSC06678.jpg" alt="bg" />
        <div className="admin-login-overlay" />
      </div>

      <div className="admin-login-card">
        <div className="admin-login-logo">
          <span className="admin-logo-script">Romantic Love</span>
          <span className="admin-logo-tag">Admin Portal</span>
        </div>

        <div className="admin-login-icon">
          <Lock size={20} />
        </div>

        <h1 className="admin-login-title">Secure Access</h1>
        <p className="admin-login-sub">Enter your credentials to manage the studio.</p>

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-input-group">
            <label>Admin Password</label>
            <div className="admin-input-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="admin-error">{error}</p>}

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? <span className="admin-spinner" /> : 'Enter Dashboard'}
          </button>
        </form>

        <p className="admin-hint">Default password: <code>RLP@Admin2024</code></p>
      </div>
    </div>
  );
};

export default AdminLogin;
