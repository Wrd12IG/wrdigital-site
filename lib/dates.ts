// Date del blog: i post storici hanno formati misti ("2026-07-29", "05 Ago 2026", "11/01/2026").
// Tutto passa da qui per avere un unico formato visibile ("29 luglio 2026") e ISO nello schema.
// Si lavora in UTC così server e browser producono la stessa stringa (niente hydration mismatch).

const MONTHS: Record<string, number> = {
    gen: 0, feb: 1, mar: 2, apr: 3, mag: 4, giu: 5, lug: 6, ago: 7, set: 8, ott: 9, nov: 10, dic: 11,
    jan: 0, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, dec: 11,
};

export function parseBlogDate(value?: string | Date | null): Date | null {
    if (!value) return null;
    if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
    const str = value.trim();

    // DD/MM/YYYY (new Date() la leggerebbe come MM/DD/YYYY)
    const dmy = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dmy) return new Date(Date.UTC(+dmy[3], +dmy[2] - 1, +dmy[1]));

    // DD Mmm YYYY (es. "05 Ago 2026")
    const dMy = str.match(/^(\d{1,2})\s+([A-Za-z]{3})[a-z]*\s+(\d{4})$/);
    if (dMy) {
        const month = MONTHS[dMy[2].toLowerCase()];
        if (month !== undefined) return new Date(Date.UTC(+dMy[3], month, +dMy[1]));
    }

    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
}

const formatter = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** "29 luglio 2026"; se la data non è interpretabile restituisce il valore originale. */
export function formatBlogDate(value?: string | Date | null): string {
    const d = parseBlogDate(value);
    if (d) return formatter.format(d);
    return typeof value === 'string' ? value : '';
}

/** ISO 8601 (YYYY-MM-DD) per schema.org e Open Graph. */
export function isoBlogDate(value?: string | Date | null): string | undefined {
    const d = parseBlogDate(value);
    return d ? d.toISOString().slice(0, 10) : undefined;
}
