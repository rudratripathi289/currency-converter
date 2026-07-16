import { Link } from 'react-router-dom';

const Home = () => (
  <div className="page">
    <h1>Currency Converter</h1>
    <p>Convert currencies, save conversions, and manage your history securely.</p>
    <Link className="btn" to="/register">Get Started</Link>
  </div>
);

export default Home;
