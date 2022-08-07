import { Router } from 'express';
import bodyParser from 'body-parser';

const router = Router();
// create application/json parser
const jsonParser = bodyParser.json()

import * as transactionController from '../controllers/transactionController.js';

/**
 * GET /api/transactions
 */
router.get('/', transactionController.getTransactions);

/**
 * GET /api/transactions/search/:txHash
 */
router.get('/search/:txHash', transactionController.getTransactionByHash);

/**
 * GET /api/transactions/amount
 */
router.get('/amount', transactionController.getAmountTransferred);

export default router;
