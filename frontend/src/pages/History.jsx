import { useEffect, useState } from 'react';
import api from '../api/api';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await api.get('/api/history');
      setHistory(res.data.data.conversions);
    };

    fetchHistory();
  }, []);

  return (
    <div className="page">
      <h2>Conversion History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
            <th>Rate</th>
            <th>Converted</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item._id}>
              <td>{item.amount}</td>
              <td>{item.fromCurrency}</td>
              <td>{item.toCurrency}</td>
              <td>{item.exchangeRate}</td>
              <td>{item.convertedAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
