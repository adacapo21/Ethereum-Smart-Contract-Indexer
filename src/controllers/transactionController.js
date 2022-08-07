import HttpStatus from 'http-status-codes';

import * as transactionService from '../services/transactionService.js';

/**
 * Get all Transactions.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function getTransactions(req, res, next) {
    try {
        const transactions = await transactionService.getTransactions();

        res.status(HttpStatus.OK).json(transactions);
    } catch (error) {
        next(error);
    }
}

/**
 * Get Total Transactions Amount transferred.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function getAmountTransferred(req, res, next) {
    try {
        const transactions = await transactionService.getTransactions();
        const amount = await transactionService.getAmountTransferred(transactions);

        res.status(HttpStatus.OK).json(amount);
    } catch (error) {
        next(error);
    }
}

/**
 * Get Transaction based on its Hash.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function getTransactionByHash(req, res, next) {
    try {
        const transaction = await transactionService.getTransactionByHash(req.params.txHash);

        res.status(HttpStatus.OK).json(transaction);
    } catch (error) {
        next(error);
    }
}