import { config } from 'dotenv';

config();
import { clientDev } from './redisClient.js';
import { clientDocker } from './redisClientDocker.js';
import TestClientRedis from "./redisTestClient.js";

console.log(process.env.NODE_ENV);

let redisClient = (process.env.NODE_ENV === 'development') ? clientDev : clientDocker;
if (process.env.NODE_ENV === "test") {
    redisClient = new TestClientRedis([
        {
            transaction:
                "0xdc1ef08ce2bc9ed608088c0a3bb7eff6e8e58c70e555abae04af941840fd3090",
            value: "19248000000000000.0",
            blockNumber: "15296766",
        },
        {
            transaction:
                "0x0382a5842c4b109a103c7113fb3aeab26bfa2109c55b00ced5dd9cb6d2669115",
            value: "148434205494641385.465998",
            blockNumber: "15295561",
        },
    ]);
}

export default redisClient;