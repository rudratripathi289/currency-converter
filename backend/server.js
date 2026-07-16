import mongoose from 'mongoose';
import app from './app.js';
import { config } from './config/env.js';

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connected');
    app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
  } catch (error) {
    console.error('Server startup failed', error);
    process.exit(1);
  }
};

startServer();
