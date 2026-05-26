'use client';

import React, { useState } from 'react';
import styles from './Pricing.module.css';

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'once' | 'monthly'>('once');

  // Pricing configuration
  const plans = [
    {
      id: 'brand-launch',
      name: 'Brand Launch',
      description: 'Sito Vetrina ad altissime prestazioni per liberi professionisti e attività locali.',
      priceOnce: 1490,
      priceMonthly: 149,
      features: [
        { text: 'Sviluppo in Next.js (Velocità < 1s)' },
        { text: 'Design esclusivo e personalizzato' },
        { text: 'Ottimizzazione SEO on-page locale' },
        { text: 'Pulsante WhatsApp & Form Leads' },
        { text: 'CMS Headless semplice ed intuitivo' },
        { text: 'Automazione Leads (Google Sheets/Telegram)', highlight: true },
      ],
      note: 'Ideale per dominare le ricerche locali su Monza e Brianza.',
      ctaText: 'Inizia con Brand Launch',
      whatsappMsg: 'Ciao! Vorrei maggiori informazioni sul pacchetto Brand Launch.',
      popular: false,
    },
    {
      id: 'growth-suite',
      name: 'Growth Suite',
      description: 'Per aziende ambiziose che vogliono clienti costanti tramite geolocalizzazione mirata.',
      priceOnce: 2490,
      priceMonthly: 249,
      features: [
        { text: 'Tutto il pacchetto Brand Launch' },
        { text: 'Pagine Geo-settoriali illimitate' },
        { text: 'Setup & Ottimizzazione Google GBP' },
        { text: 'Copywriting Persuasivo orientato al ROI' },
        { text: 'Configurazione Analytics Avanzata' },
        { text: 'Automazione Lead + Notifica Slack/Telegram', highlight: true },
        { text: '3 mesi di monitoraggio performance & manutenzione inclusi!' },
      ],
      note: 'Il nostro pacchetto più richiesto per aumentare il fatturato.',
      ctaText: 'Scegli Growth Suite',
      whatsappMsg: 'Ciao! Vorrei maggiori informazioni sul pacchetto Growth Suite.',
      popular: true,
    },
    {
      id: 'ecommerce-premium',
      name: 'E-commerce Premium',
      description: 'Piattaforma e-commerce headless ultra-rapida per vendite senza barriere.',
      priceOnce: 3890,
      priceMonthly: 389,
      features: [
        { text: 'E-commerce headless Next.js ultra-rapido' },
        { text: 'Catalogo prodotti dinamico & performante' },
        { text: 'Checkout ottimizzato (Stripe/PayPal/Apple Pay)' },
        { text: 'SEO E-commerce per schede prodotto' },
        { text: 'Automazione ordini & notifiche automatiche', highlight: true },
        { text: 'Formazione completa per la gestione autonoma' },
        { text: '3 mesi di monitoraggio performance & manutenzione inclusi!' },
      ],
      note: 'Progettato per massimizzare il tasso di conversione delle vendite.',
      ctaText: 'Lancia il tuo E-commerce',
      whatsappMsg: 'Ciao! Vorrei maggiori informazioni sul pacchetto E-commerce Premium.',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>Piani & Tariffe</span>
          <h2 className={styles.title}>Investi nella tua crescita digitale</h2>
          <p className={styles.subtitle}>
            Siti web Next.js ultra-veloci e strategie SEO locali pensate per convertire i visitatori in clienti reali. Senza sorprese.
          </p>

          {/* Billing Switch */}
          <div className={styles.switchContainer}>
            <button
              onClick={() => setBillingPeriod('once')}
              className={`${styles.switchBtn} ${billingPeriod === 'once' ? styles.switchBtnActive : ''}`}
            >
              Soluzione Unica
            </button>
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`${styles.switchBtn} ${billingPeriod === 'monthly' ? styles.switchBtnActive : ''}`}
            >
              Canone Mensile
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className={styles.grid}>
          {plans.map((plan) => {
            const price = billingPeriod === 'once' ? plan.priceOnce : plan.priceMonthly;
            const periodText = billingPeriod === 'once' ? '' : '/mese';
            
            // Explicit formatting with dot separator for thousands (Italian standard)
            const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            
            const waUrl = `https://wa.me/393401204651?text=${encodeURIComponent(plan.whatsappMsg + ' (' + (billingPeriod === 'once' ? 'Soluzione Unica' : 'Canone Mensile') + ')')}`;

            return (
              <div
                key={plan.id}
                className={`${styles.card} ${plan.popular ? styles.spotlight : ''}`}
              >
                {plan.popular && <span className={styles.popularBadge}>Consigliato</span>}
                
                <div className={styles.cardHeader}>
                  <h3 className={styles.packName}>{plan.name}</h3>
                  <p className={styles.packDesc}>{plan.description}</p>
                </div>

                <div className={styles.priceContainer}>
                  <span className={styles.priceLabel}>da</span>
                  <span className={styles.priceValue}>
                    € {formattedPrice}
                  </span>
                  <span className={styles.pricePeriod}>{periodText}</span>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.ctaBtn} ${plan.popular ? styles.ctaBtnPrimary : styles.ctaBtnSecondary}`}
                >
                  {plan.ctaText}
                </a>

                <ul className={styles.features}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <svg
                        className={styles.checkIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        {feature.text}
                        {feature.highlight && <span className={styles.automationBadge}>Plus</span>}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className={styles.note}>{plan.note}</p>
              </div>
            );
          })}
        </div>

        {/* Upsell Campaign Module */}
        <div className={styles.upsellBanner}>
          <div className={styles.upsellText}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg style={{ width: '20px', height: '20px', color: '#f59e0b', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Vuoi accelerare i risultati ed essere subito primo?
            </h4>
            <p>
              Aggiungi il <strong>Modulo Performance</strong> (Campagne Google Ads & Meta Ads) a partire da <strong>€ 490/mese</strong> per intercettare clienti caldi oggi stesso.
            </p>
          </div>
          <a
            href="https://wa.me/393401204651?text=Ciao!%20Vorrei%20informazioni%20sulle%20campagne%20Google%20e%20Meta%20Ads."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.upsellBtn}
          >
            Aggiungi Modulo Performance
          </a>
        </div>

        {/* Social Proof Sectors */}
        <div className={styles.socialProof}>
          <h5>Specializzati nella crescita di settori chiave</h5>
          <div className={styles.industriesList}>
            <span className={styles.industryItem} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M21 16V10a2 2 0 00-2-2h-3V5a1 1 0 00-1-1H9v12m7 0h4" />
              </svg>
              Automotive
            </span>
            <span className={styles.industryItem} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              Ristorazione & Food
            </span>
            <span className={styles.industryItem} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Professionisti & Medici
            </span>
            <span className={styles.industryItem} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Immobiliare
            </span>
            <span className={styles.industryItem} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              E-commerce & Retail
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
