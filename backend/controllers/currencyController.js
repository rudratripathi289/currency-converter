import { convertCurrency } from '../services/currencyService.js';
import Conversion from '../models/Conversion.js';

export const convert = async (req, res, next) => {
  try {
    const { amount, fromCurrency, toCurrency } = req.body;
    const result = convertCurrency(Number(amount), fromCurrency.toUpperCase(), toCurrency.toUpperCase());
    const userId = req.user?.id || req.user?._id;

    const conversion = await Conversion.create({
      userId,
      amount: result.amount,
      fromCurrency: result.fromCurrency,
      toCurrency: result.toCurrency,
      exchangeRate: result.exchangeRate,
      convertedAmount: result.convertedAmount,
    });

    res.status(201).json({
      success: true,
      message: 'Conversion completed',
      data: { conversion, result },
    });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const conversions = await Conversion.find({ userId }).sort({ conversionDate: -1 });
    res.json({ success: true, message: 'History fetched', data: { conversions } });
  } catch (error) {
    next(error);
  }
};

export const getHistoryById = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const conversion = await Conversion.findOne({ _id: req.params.id, userId });
    if (!conversion) {
      return res.status(404).json({ success: false, message: 'Conversion not found' });
    }

    res.json({ success: true, message: 'Conversion fetched', data: { conversion } });
  } catch (error) {
    next(error);
  }
};

export const createHistoryEntry = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const entry = await Conversion.create({ userId, ...req.body });
    res.status(201).json({ success: true, message: 'History entry created', data: { entry } });
  } catch (error) {
    next(error);
  }
};

export const updateHistoryEntry = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const entry = await Conversion.findOneAndUpdate(
      { _id: req.params.id, userId },
      { note: req.body.note },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ success: false, message: 'Conversion not found' });
    }

    res.json({ success: true, message: 'History entry updated', data: { entry } });
  } catch (error) {
    next(error);
  }
};

export const deleteHistoryEntry = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const entry = await Conversion.findOneAndDelete({ _id: req.params.id, userId });
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Conversion not found' });
    }

    res.json({ success: true, message: 'History entry deleted' });
  } catch (error) {
    next(error);
  }
};
