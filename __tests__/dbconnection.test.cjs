const redis = require("redis-mock"),
    client = redis.createClient();
require('should');

describe("Db Connection", function () {
    it("should clean database", function (done) {
        const redisMockClient = redis.createClient();
        redisMockClient.set("foo", "bar", function (err, result) {
            redisMockClient.flushdb(function (err, result) {
                result.should.equal("OK");

                redisMockClient.exists("foo", function (err, result) {
                    result.should.be.equal(0);
                    redisMockClient.end();
                    done();
                })
            });
        });
    });

    it('with the url param, Then the remaining options parameters are successfully parsed', () => {
        const client = redis.createClient('redis://lol:1234/a');

        client.options.host.should.equal('lol');
        client.options.port.should.equal(1234);
        client.options.path.should.equal('/a');
    });

    it('With the host, but without the port, Then the default port is populated', () => {
        const client = redis.createClient({ host: 'localhost' });

        client.options.port.should.equal(6379);
    });
});