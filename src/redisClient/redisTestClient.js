export default class RedisClient {
    constructor(data = []) {
        this.data = data;
    }
    keys() {
        return this.data.map((d) => d.transaction);
    }
    connect() {
        return Promise.resolve();
    }
    HSET(data) {
        this.data.push(data);
    }
    HGETALL(hash) {
        if (!hash) {
            return {};
        }
        const found = this.data.find((x) => x.transaction === hash);
        if (!found) {
            return {};
        }
        return found;
    }
}