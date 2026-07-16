import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';

const oauthErrors = {
  oauth_failed: 'Google sign-in failed. Please try again.',
  oauth_not_configured: 'Google sign-in is not configured on the server.',
};

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error && oauthErrors[error]) {
      setMessage(oauthErrors[error]);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="card">
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
      <div className="divider">or</div>
      <div className="card">
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Login;
