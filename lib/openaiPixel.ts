// Evento di conversione OpenAI Ads. No-op se il pixel non è caricato (nessun consenso marketing).
export function trackOpenAILead() {
    try {
        const oaiq = (window as unknown as { oaiq?: (...args: unknown[]) => void }).oaiq;
        oaiq?.('measure', 'lead_created', { type: 'customer_action' });
    } catch {
        // il tracking non deve mai rompere il form
    }
}
