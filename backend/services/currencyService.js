const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'AUD'];

const rates = {
  USD: 1,
  EUR: 0.92,
  INR: 83.5,
  GBP: 0.79,
  JPY: 156.5,
  AUD: 1.52,
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  const amountInUsd = amount / fromRate;
  const convertedAmount = amountInUsd * toRate;
  const exchangeRate = convertedAmount / amount;

  return {
    amount,
    fromCurrency,
    toCurrency,
    exchangeRate: Number(exchangeRate.toFixed(4)),
    convertedAmount: Number(convertedAmount.toFixed(2)),
    currencies,
  };
};
