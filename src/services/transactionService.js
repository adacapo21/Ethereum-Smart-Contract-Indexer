import { HttpError } from '../utils/httpError.js';
import HttpStatus from 'http-status-codes';
import logger from "../utils/logger.js";
import redisClient from '../redisClient/index.js';

(async () => {
    await redisClient.connect()
})();
let client = redisClient;
if (process.env.NODE_ENV === 'docker') {
    client = client.v4;
}

/**
 * Get all Transactions.
 *
 * @returns {Promise}
 */
export async function getTransactions() {
    let transactions = [];
    const keys = await client.keys('*');

    if (keys) {
        try {
            transactions = await Promise.all(
                keys.map(async key => {
                const transactionData = await client.HGETALL(key)
                    return {
                        transaction: transactionData.transaction,
                        value: transactionData.value,
                        blockNumber: transactionData.blockNumber
                    };
                }));
            return transactions;
        } catch {
            throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, `An error Occurred during this operation`);
        }
    } else {
        throw new HttpError(HttpStatus.CONFLICT,'TXs dont exist');
    }
}

/**
 * Store new Transaction.
 *
 * @param   {Object}  data
 * @returns {Promise}
 */
export async function storeTransactionService(data) {
    let transaction = data.data.transactionHash;
    let value = data.value;
    let blockNumber = data.data.blockNumber;

    await client.HSET(transaction, {
        'transaction': transaction,
        'value': value,
        'blockNumber': blockNumber
    }, (err, reply) => {
        if (err) {
            console.log(err);
        }
    });
}

/**
 * Get Total Transactions Amount transferred.
 *
 * @param   {Object}  transactions
 * @returns {Promise}
 */
export async function getAmountTransferred(transactions) {
    if (transactions) {
        let amount = 0.0;
        transactions.map(item => {
            amount = amount + parseInt(item.value);
        })
        return amount;
    } else {
        logger.info(`Couldn't calculate the amount OR there isn't any TX stored`);
    }
}

/**
 * Get Transaction based on its Hash.
 *
 * @param   {Object}  txHash
 * @returns {Promise}
 */
export async function getTransactionByHash(txHash) {
    const transaction = await client.HGETALL(txHash);

    if (Object.keys(transaction).length === 0) {
        throw new HttpError(HttpStatus.CONFLICT,'TxHash does not exist');
    } else {
        return transaction;
    }
}