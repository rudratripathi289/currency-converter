import mongoose from 'mongoose';

const conversionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  fromCurrency: { type: String, required: true, uppercase: true },
  toCurrency: { type: String, required: true, uppercase: true },
  exchangeRate: { type: Number, required: true },
  convertedAmount: { type: Number, required: true },
  conversionDate: { type: Date, default: Date.now },
  note: { type: String, default: '' },
});

const Conversion = mongoose.model('Conversion', conversionSchema);

export default Conversion;
