import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import status from 'http-status';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import { appLimiter } from './app/middlewares/rateLimiter';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
// Trust the first proxy (ngrok or any reverse proxy)
app.set('trust proxy', 1);

app.use(appLimiter);

app.get('/', (req: Request, res: Response) => {
  res.status(status.OK).json({
    success: true,
    message: 'Server Is Running',
  });
});

app.use('/api/v1', router);
app.use(notFound);
app.use(globalErrorHandler);

export default app;
