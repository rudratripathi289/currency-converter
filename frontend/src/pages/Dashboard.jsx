import { useState } from 'react';
import api from '../api/api';

const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'AUD'];

const Dashboard = () => {
  const [form, setForm] = useState({ amount: '', fromCurrency: 'USD', toCurrency: 'INR' });
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/convert', form);
      setResult(res.data.data.result);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Conversion failed');
    }
  };

  const swapCurrencies = () => {
    setForm((prev) => ({ ...prev, fromCurrency: prev.toCurrency, toCurrency: prev.fromCurrency }));
  };

  return (
    <div className="page">
      <h2>Currency Converter</h2>
      <form onSubmit={handleSubmit} className="card">
        <input placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <select value={form.fromCurrency} onChange={(e) => setForm({ ...form, fromCurrency: e.target.value })}>
          {currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
        </select>
        <button type="button" onClick={swapCurrencies}>Swap</button>
        <select value={form.toCurrency} onChange={(e) => setForm({ ...form, toCurrency: e.target.value })}>
          {currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
        </select>
        <button type="submit">Convert</button>
      </form>
      {message && <p>{message}</p>}
      {result && (
        <div className="card">
          <h3>Result</h3>
          <p>{result.amount} {result.fromCurrency} = {result.convertedAmount} {result.toCurrency}</p>
          <p>Exchange Rate: {result.exchangeRate}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
