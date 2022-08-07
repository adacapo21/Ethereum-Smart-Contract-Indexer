import redis from "redis";
import logger from "../utils/logger.js";

export const clientDocker =
    redis.createClient({
        legacyMode: true,
        socket: {
            host: 'test-redis',
            port: process.env.REDIS_PORT
        }
    });

clientDocker.on('error', function (err) {
    logger.info('Docker image could not establish a connection with redis. ' + err);
});
clientDocker.on('connect', function () {
    logger.info('Docker Connected to Redis successfully');
});
