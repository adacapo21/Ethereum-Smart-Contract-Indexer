import * as redis from "redis";
import logger from "../utils/logger.js";

export const clientDev =
    redis.createClient({
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT
    });


clientDev.on('error', function (err) {
    logger.info('Could not establish a connection with redis. ' + err);
});
clientDev.on('connect', function () {
    logger.info('Connected to redis successfully');
});



