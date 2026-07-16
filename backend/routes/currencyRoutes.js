import express from 'express';
import { body } from 'express-validator';
import { convert, createHistoryEntry, deleteHistoryEntry, getHistory, getHistoryById, updateHistoryEntry } from '../controllers/currencyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/convert',
  protect,
  [body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'), body('fromCurrency').notEmpty().withMessage('From currency is required'), body('toCurrency').notEmpty().withMessage('To currency is required')],
  convert
);

router.get('/history', protect, getHistory);
router.get('/history/:id', protect, getHistoryById);
router.post('/history', protect, createHistoryEntry);
router.put('/history/:id', protect, updateHistoryEntry);
router.delete('/history/:id', protect, deleteHistoryEntry);

export default router;
