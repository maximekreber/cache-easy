export default class CacheEasy {
    private data: any = {};
    private ttl: number;
    private checkInterval: NodeJS.Timer;

    constructor(ttl: number) {
        this.ttl = ttl;
        this.checkInterval = setInterval(() => this.checkAllTtl(), 1000);
    }

    public get(key: string) {
        return this.data[key]?.value;
    }

    public set(key: string, value: any, customTtl?: number) {
        const now = Date.now();
        const ttl = now + (customTtl ?? this.ttl);

        this.data[key] = { value, ttl };
        return value;
    }

    public has(key: string) {
        if (typeof this.data[key] === 'undefined') {
            return false;
        }
        return true;
    }

    public async getOrSet(key: string, value: any, customTtl?: number) {
        const get = this.get(key);
        if (get) {
            return get;
        }

        if (typeof value !== 'function') {
            return this.set(key, value, customTtl);
        }

        if (typeof value() === 'object' && typeof value().then === 'function') {
            return this.set(key, await value(), customTtl);
        }

        return this.set(key, value(), customTtl);
    }

    public delete(key: string) {
        delete this.data[key];
    }

    public checkTtl(key: string) {
        if (this.data[key]?.ttl < Date.now()) {
            this.delete(key);
            return false;
        }
        return true;
    }

    public checkAllTtl() {
        Object.keys(this.data).forEach((key) => this.checkTtl(key));
    }

    public clearCheckTtl() {
        clearInterval(this.checkInterval);
    }
}
