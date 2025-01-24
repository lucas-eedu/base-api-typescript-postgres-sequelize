import * as dotenv from 'dotenv';
dotenv.config();

import helmet from 'helmet';
import express from 'express';
import rateLimit from 'express-rate-limit';
import Logger from './config/logger';
import morganMiddleware from './middlewares/morganMiddleware';
import router from './routes/main.routes';
import sequelize from './config/database';
import errorHandler from './middlewares/errorHandler';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

app.use(helmet());
app.use(express.json());
app.use(morganMiddleware);
app.use('/api', router);
app.use(errorHandler);
app.use(limiter);

app.listen(process.env.APP_PORT, async () => {
  try {
    await sequelize.sync({ force: false });
    Logger.info(
      `API Working => ${process.env.APP_URL}:${process.env.APP_PORT}/api`,
    );
  } catch (error) {
    Logger.error('Unable to connect to the database:', error);
  }
});
