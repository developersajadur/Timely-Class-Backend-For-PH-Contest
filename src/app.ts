import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import status from 'http-status';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import { appLimiter } from './app/middlewares/rateLimiter';
import bodyParser from 'body-parser';
import { initializeJobs } from './app/jobs';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.set('trust proxy', 1);

app.use(appLimiter);

// API health check
app.get('/', (req: Request, res: Response) => {
  res.status(status.OK).json({
    success: true,
    message: 'Server Is Running',
  });
});

app.use('/api/v1', router);

// Jobs start here
initializeJobs();

app.use(notFound);
app.use(globalErrorHandler);

export default app;
