// Fonte di verità unica per i dati aziendali (entità, NAP, KPI).
// Homepage, pagine servizio, footer, schema JSON-LD e llms.txt devono leggere da qui:
// un LLM che trova numeri diversi sulla stessa entità smette di fidarsi dell'entità.

export const SITE_URL = 'https://www.wrdigital.it';

export const COMPANY = {
    name: 'WR Digital',
    alternateName: 'W[r]Digital',
    legalName: 'WRDigital S.r.l.',
    vatID: 'IT10961410965',
    foundingYear: 2019,
    email: 'info@wrdigital.it',
    telephone: '+39-340-120-4651',
    address: {
        streetAddress: 'Via Venezia, 2',
        addressLocality: 'Nova Milanese',
        addressRegion: 'MB',
        postalCode: '20834',
        addressCountry: 'IT',
    },
    geo: { latitude: 45.5898, longitude: 9.1995 },
    openingHours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    sameAs: [
        'https://www.instagram.com/wrdigital',
        'https://www.linkedin.com/company/wrdigital',
        'https://www.facebook.com/wrdigital',
        'https://www.youtube.com/@wrdigital.agency',
    ],
    founders: [
        { name: "Valentina Dell'Orto", jobTitle: 'CEO & Founder | Digital Marketing Manager' },
        { name: 'Roberto Solano', jobTitle: 'CEO & Founder | Google Specialist' },
        { name: 'Giuseppe Savino', jobTitle: 'CEO & Founder | Business Developer' },
    ],
} as const;

export const KPI = {
    clients: 50,
    clientsLabel: '50+',
    sitesDelivered: 50,
    sitesDeliveredLabel: '50+',
} as const;

export const yearsActive = () => new Date().getFullYear() - COMPANY.foundingYear;

// @id stabili: tutti i nodi JSON-LD referenziano la stessa entità.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const postalAddress = () => ({ '@type': 'PostalAddress', ...COMPANY.address });

/** Riferimento compatto all'entità, da usare come provider/publisher/worksFor. */
export const orgRef = () => ({ '@id': ORG_ID, '@type': 'ProfessionalService', name: COMPANY.name });
