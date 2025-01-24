require('dotenv').config();
import express from 'express';
import Logger from './config/logger';
import morganMiddleware from './middlewares/morganMiddleware';
import router from './routes/main.routes';

const app = express();

app.use(express.json());
app.use(morganMiddleware);
app.use('/api', router);

app.listen(process.env.APP_PORT, async () => {
  Logger.info(
    `API Working => ${process.env.APP_URL}:${process.env.APP_PORT}/api`,
  );
});
