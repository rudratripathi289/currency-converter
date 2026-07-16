import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('Missing authentication token.');
      return;
    }

    loginWithToken(token)
      .then(() => navigate('/dashboard', { replace: true }))
      .catch(() => setError('Failed to complete Google sign-in.'));
  }, [searchParams, loginWithToken, navigate]);

  if (error) {
    return (
      <div className="page">
        <div className="card">
          <p>{error}</p>
          <button type="button" onClick={() => navigate('/login', { replace: true })}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">Signing you in with Google...</div>
    </div>
  );
};

export default AuthCallback;
