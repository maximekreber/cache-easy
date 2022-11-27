import SimpleCache from '../src';

const cache = new SimpleCache(2000);

test('Set And Get', () => {
    cache.set('set_get', 2);

    expect(cache.get('set_get')).toBe(2);
});

test('Set Promise', async () => {
    cache.set('set_promise', await promise(), 1000);
    expect(cache.get('set_promise')).toBe(true);
});

test('Has except to be true', () => {
    cache.set('has_true', 2);
    expect(cache.has('has_true')).toBe(true);
});

test('Has except to be false', () => {
    expect(cache.has('has_false')).toBe(false);
});

test('getOrSet Integer', async () => {
    await cache.getOrSet('get_or_set_int', 4);
    expect(await cache.getOrSet('get_or_set_int', null)).toBe(4);
});

test('getOrSet Promise', async () => {
    await cache.getOrSet('get_or_set_promise', promise);
    expect(await cache.getOrSet('get_or_set_promise', null)).toBe(true);
});

test('getOrSet Function', async () => {
    await cache.getOrSet('get_or_set_function', () => true);
    expect(await cache.getOrSet('get_or_set_function', null)).toBe(true);
});

test('delete', () => {
    cache.set('delete', true);
    cache.delete('delete');
    expect(cache.get('delete')).toBe(undefined);
});

test('Check ttl', async () => {
    cache.set('check_ttl', 'check', 50);
    expect(cache.checkTtl('check_ttl')).toBe(true);
    await sleep(51);
    expect(cache.checkTtl('check_ttl')).toBe(false);
});

test('check all ttl', async () => {
    cache.set('check_all_ttl_stay', true, 2000);
    cache.set('check_all_ttl_remove', true, 1);

    await sleep(2);
    cache.checkAllTtl();

    expect(cache.has('check_all_ttl_remove')).toBe(false);
    expect(cache.has('check_all_ttl_stay')).toBe(true);
});

afterAll(async () => {
    await sleep(1001);
    cache.clearCheckTtl();
});

const sleep = (time: number) => new Promise((resolve) => setTimeout(() => resolve(''), time));
const promise = () => new Promise((resolve) => setTimeout(() => resolve(true), 50));
