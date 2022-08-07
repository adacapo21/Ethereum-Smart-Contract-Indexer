const app = require('../src/index.js');
const request = require('supertest');
import * as data from '../infoData.json';
import { storeTransactionService } from '../src/services/transactionService.js'

beforeAll(async() => {
    const transactions = storeTransactionService(data);
})

describe('Transaction Endpoints', () => {

    it('should fetch a single Transaction', async () => {

        const res = request(app).get('/api/transactions');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('transaction');
    });
});