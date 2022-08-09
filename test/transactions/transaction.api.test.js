import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index.js';
// Assertion
chai.use(chaiHttp);
describe('Transactions Endpoints', () => {
    const fakeHash = '0x5a862a043841b6e557c7205183230faa555f66a26f9e4a42d15ffa2a6de9f3f9';

    it('should fetch all Transactions', (done) => {
        chai.request(server)
            .get("/api/transactions")
            .end((err, response) => {
                expect(response.status).toBe(200);
                expect(response.body.length).not.toEqual(0);
                done();
            });
    });

    it('should get Amount of Transactions', (done) => {
        chai.request(server)
            .get("/api/transactions/amount")
            .end((err, response) => {
                expect(response.status).toBe(200);
                expect(response.body.length).not.toEqual(0)
                done();
            });
    });

    it("It should NOT return the Transaction", (done) => {
        chai.request(server)
            .get("/api/transactions/search/" + fakeHash)
            .end((err, response) => {
                expect(response.status).toBe(500);
                done();
            });
    });
});