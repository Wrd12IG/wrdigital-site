
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
    points: 5, // 5 requests
    duration: 3600, // per 1 hour per IP
});

export async function checkRateLimit(ip: string) {
    try {
        await rateLimiter.consume(ip);
        return { allowed: true };
    } catch (rejRes) {
        return { allowed: false };
    }
}
