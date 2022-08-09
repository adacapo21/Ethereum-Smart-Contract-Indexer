import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index.test.js';
// Assertion
const should = chai.should();
chai.use(chaiHttp);
describe('Transactions Endpoints', () => {
    const fakeHash = '0x5a862a043841b6e557c7205183230faa555f66a26f9e4a42d15ffa2a6de9f3f9';
    it('should fetch all Transactions', async () => {
        chai.request(server)
            .get("/api/transactions")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.not.be.eq(0);
                done();
            });
    });

    it('should get Amount of Transactions', async () => {
        chai.request(server)
            .get("/api/transactions/amount")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.not.be.eq(0);
                done();
            });
    });

    it("It should NOT return the Transaction", (done) => {
        chai.request(server)
            .get("/api/transactions/search/" + fakeHash)
            .end((err, response) => {
                response.should.have.status(409);
                done();
            });
    });
});