import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Logger from './config/logger';
import morganMiddleware from './middlewares/morganMiddleware';
import router from './routes/main.routes';
import sequelize from './config/database';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(morganMiddleware);
app.use('/api', router);
app.use(errorHandler);

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
