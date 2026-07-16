import { API_BASE_URL } from '../api/api';

const GoogleLoginButton = () => (
  <button
    type="button"
    className="google-btn"
    onClick={() => {
      window.location.href = `${API_BASE_URL}/auth/google`;
    }}
  >
    Continue with Google
  </button>
);

export default GoogleLoginButton;
