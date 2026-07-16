import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const generateToken = (user) =>
  jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '7d' });
