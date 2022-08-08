let app = require('../src/index.js');
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);


xdescribe('Transaction Endpoints', () => {
    it('should fetch all Transactions', async () => {
        chai.request(app)
            .get("/api/transactions")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.not.be.eq(0);
                done();
            });
    });

    it("It should NOT return all the tasks", (done) => {
        chai.request(app)
            .get("/api/transactions")
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });
});