// Controlli anti-spam/abuso condivisi dai form pubblici.

export function clientIp(headers: Headers): string {
    const xff = headers.get('x-forwarded-for');
    return (xff ? xff.split(',')[0].trim() : headers.get('x-real-ip')) || 'unknown';
}

const EMAIL_RE = /^[^\s@<>"',;:\\]+@[^\s@<>"',;:\\]+\.[A-Za-z]{2,}$/;
const PHONE_RE = /^\+?[0-9][0-9 .()\-/]{5,24}$/;
const LINK_RE = /(https?:\/\/|www\.)/gi;

export const isEmail = (v: unknown): v is string =>
    typeof v === 'string' && v.length <= 254 && EMAIL_RE.test(v);

export const isPhone = (v: unknown): v is string => typeof v === 'string' && PHONE_RE.test(v.trim());

export const clean = (v: unknown, max: number): string =>
    typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : '';

export const singleLine = (v: unknown, max: number): string => clean(v, max).replace(/[\r\n]+/g, ' ');

export const countLinks = (v: string) => (v.match(LINK_RE) || []).length;

export function escapeHtml(v: unknown): string {
    return String(v ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Cloudflare Turnstile: obbligatorio solo se TURNSTILE_SECRET_KEY è configurata. */
export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return true;
    if (typeof token !== 'string' || !token) return false;
    try {
        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ secret, response: token, remoteip: ip }),
        });
        const data = await res.json();
        return data.success === true;
    } catch {
        return false;
    }
}
