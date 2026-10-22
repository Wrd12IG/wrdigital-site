import { RateLimiterMemory } from 'rate-limiter-flexible';

// NB: in memoria, per istanza serverless. Per un limite globale sostituire con uno store condiviso (es. Upstash).
const limiters = new Map<string, RateLimiterMemory>();

function limiter(name: string, points: number, duration: number) {
    let l = limiters.get(name);
    if (!l) {
        l = new RateLimiterMemory({ points, duration });
        limiters.set(name, l);
    }
    return l;
}

export async function checkRateLimit(key: string, name = 'default', points = 5, duration = 3600) {
    try {
        await limiter(name, points, duration).consume(key);
        return { allowed: true };
    } catch {
        return { allowed: false };
    }
}
