import { config } from 'dotenv';
config();
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger, { logStream } from './utils/logger.js';
import router from './routes.js';
import monitorTransactions from './monitorTransactions.js';
const app = express();

const APP_PORT = process.env.APP_PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';
const REDIS_PORT= process.env.REDIS_PORT;
const REDIS_URL= process.env.REDIS_URL;

app.use(cors());
app.use(morgan('dev'));  //enable incoming request logging in dev mode

app.set('port', APP_PORT);
app.set('host', APP_HOST);
app.set('redis_port', REDIS_PORT);
app.set('redis_url', REDIS_URL);

// API Routes
app.use('/api', router);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(app.get('port'), app.get('host'), () => {
    monitorTransactions.then(
        logger.info(
            `Monitoring Transactions Started Successfully`
        )
    )
    logger.info(
        `Server started at http://${app.get('host')}:${app.get('port')}/api`
    );
});

export default app;