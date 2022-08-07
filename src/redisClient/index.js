import { config } from 'dotenv';

config();
import { clientDev } from './redisClient.js';
import { clientDocker } from './redisClientDocker.js';

console.log(process.env.NODE_ENV);

const redisClient = (process.env.NODE_ENV === 'development') ? clientDev : clientDocker;
export default redisClient;