import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import logger from '../src/utils/logger.js';
import router from "../src/routes.js";

const app = express();

const APP_PORT = process.env.APP_PORT || '5000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';
const REDIS_PORT= process.env.REDIS_PORT;
const REDIS_URL= process.env.REDIS_URL;

app.set('port', APP_PORT);
app.set('host', APP_HOST);
app.set('redis_port', REDIS_PORT);
app.set('redis_url', REDIS_URL);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

// API Routes
app.use('/api', router);

app.listen(app.get('port'), app.get('host'), () => {
    logger.info(
        `Server started at http://${app.get('host')}:${app.get('port')}/api`
    );
});

export default app;
