'use client';

import { useState } from 'react';
import Link from 'next/link';

// Domande geo-specifiche per la homepage — ottimizzate per rich snippet locali
const homepageFaqs = [
  {
    q: 'Operate anche a Monza e in tutta la Brianza?',
    a: 'Assolutamente sì. W[r]Digital opera in tutta la provincia di Monza e Brianza: Monza, Nova Milanese, Desio, Lissone, Seregno, Cesano Maderno, Muggiò, Bovisio-Masciago e comuni limitrofi. Conosciamo il tessuto imprenditoriale locale della Brianza e siamo il partner ideale per le PMI del territorio che vogliono crescere online.'
  },
  {
    q: 'Avete un ufficio fisico vicino a Milano?',
    a: 'Sì! W[r]Digital ha sede operativa a Nova Milanese (MB), in Via Venezia 2, a pochi minuti da Monza e facilmente raggiungibile da Milano in auto o treno. Puoi venirci a trovare previo appuntamento oppure iniziare con una consulenza gratuita online o telefonica.'
  },
  {
    q: 'Quanto costa una consulenza SEO a Milano e Monza Brianza?',
    a: 'I nostri piani SEO per aziende nell\'area di Milano e Monza Brianza partono da €1.200/mese per PMI locali. Il costo varia in base alla competitività delle keyword, al settore e agli obiettivi. Offriamo un\'audit SEO gratuita per darti un preventivo preciso prima di qualsiasi impegno.'
  },
  {
    q: 'W[r]Digital è un\'agenzia certificata Google?',
    a: 'Sì, il team di W[r]Digital è certificato Google su Google Ads Search, Shopping Ads e Google Measurement. Queste certificazioni garantiscono che le tue campagne pubblicitarie siano gestite seguendo le best practice ufficiali di Google, massimizzando il ROI per le imprese di Milano e Monza Brianza.'
  },
  {
    q: 'Come iniziare a lavorare con W[r]Digital?',
    a: 'Il processo è semplice: 1) Audit gratuita del tuo stato digitale attuale. 2) Presentazione strategia personalizzata con KPI e budget. 3) Kick-off progetto con team dedicato. 4) Report mensili trasparenti. Non richiediamo vincoli lunghissimi: vogliamo guadagnarci la tua fiducia mese per mese con risultati concreti.'
  },
];

export default function HomepageFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-label="Domande frequenti sull'agenzia di marketing digitale a Milano e Monza Brianza"
      style={{
        padding: '5rem 0',
        background: 'linear-gradient(to bottom, #0a0a0a, #111)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FACC15',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            FAQ — Domande Frequenti
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              margin: '0 0 1rem',
            }}
          >
            Tutto quello che vuoi sapere sulla nostra{' '}
            <span style={{ color: '#FACC15' }}>agenzia a Milano</span>
          </h2>
          <p style={{ color: '#888', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Domande comuni su W[r]Digital e i nostri servizi di marketing digitale a Milano, Monza e in tutta la Brianza.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {homepageFaqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  border: `1px solid ${isOpen ? 'rgba(250,204,21,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: isOpen ? 'rgba(250,204,21,0.04)' : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: isOpen ? '#FACC15' : '#fff',
                    fontSize: '1rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                    transition: 'color 0.2s ease',
                  }}
                >
                  <span>{item.q}</span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: `1px solid ${isOpen ? '#FACC15' : 'rgba(255,255,255,0.2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: isOpen ? '#FACC15' : '#888',
                      transition: 'all 0.2s ease',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.5rem 1.25rem',
                      color: '#aaa',
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                    }}
                  >
                    <p style={{ margin: 0 }}>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA sotto le FAQ */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem',
            borderRadius: '16px',
            background: 'rgba(250,204,21,0.06)',
            border: '1px solid rgba(250,204,21,0.15)',
          }}
        >
          <p style={{ color: '#ccc', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            Hai altre domande? Siamo a Milano e Monza Brianza — parliamoci.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/preventivo"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                background: '#FACC15',
                color: '#000',
                fontWeight: 700,
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'background 0.2s ease',
              }}
            >
              Richiedi Preventivo Gratuito →
            </Link>
            <a
              href="tel:+393401204651"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                background: 'transparent',
                color: '#fff',
                fontWeight: 600,
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              +39 340 120 4651
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
