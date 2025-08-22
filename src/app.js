import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middlewares/error.js';

export function buildApp() {
    const app = express();
    app.use(cors({origin: env.corsOrigin, credentials: true}));
    app.use(express.json({limit: '2mb'}));
    app.use(cookieParser());
    app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

    app.get('/healt', (_req, res)=> res.json({ ok: true}));
    app.use('/api', routes);
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}