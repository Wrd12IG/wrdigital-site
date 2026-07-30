'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Filter, ExternalLink, ShieldCheck } from 'lucide-react';
import styles from './ClientsNetwork.module.css';
import ScrollReveal from './ScrollReveal';

export interface Client {
  id: string;
  name: string;
  url: string;
  description: string;
  sector: string;
  showInSuccessStories: boolean;
  order: number;
}

interface ClientsNetworkProps {
  initialClients: Client[];
}

export default function ClientsNetwork({ initialClients }: ClientsNetworkProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('Tutti');

  const filteredClients = useMemo(() => {
    return initialClients.filter(client => {
      if (!client.showInSuccessStories) return false;
      
      const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            client.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            client.sector.toLowerCase().includes(searchQuery.toLowerCase());
                            
      const matchesSector = selectedSector === 'Tutti' || client.sector === selectedSector;
      
      return matchesSearch && matchesSector;
    });
  }, [initialClients, searchQuery, selectedSector]);

  // Extract unique sectors
  const sectors = useMemo(() => {
    const activeClients = initialClients.filter(c => c.showInSuccessStories);
    const allSectors = activeClients.map(c => c.sector);
    return ['Tutti', ...Array.from(new Set(allSectors))].sort();
  }, [initialClients]);

  return (
    <section id="clienti-network" className={styles.section}>
      <div className={styles.container}>
        
        {/* Header Section */}
        <ScrollReveal direction="up">
          <div className={styles.headerRow}>
            <div className={styles.headerLeft}>
              <span className={styles.label}>PROGETTI ATTIVI & GESTITI</span>
              <h2 className={styles.title}>
                LA RETE DEI <span className={styles.titleAccent}>BRAND.</span>
              </h2>
              <p className={styles.subtitle}>
                Gestiamo la presenza online, le campagne di advertising, il posizionamento SEO e l'infrastruttura tecnologica di oltre 50 aziende leader.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className={styles.controlsRow}>
            {/* Search Bar */}
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={18} />
              <input
                type="text"
                placeholder="Cerca un brand o un servizio..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {/* Sectors Filter Slider */}
            <div className={styles.filtersWrapper}>
              <Filter className={styles.filterIcon} size={16} />
              <div className={styles.filtersList}>
                {sectors.map(sector => (
                  <button
                    key={sector}
                    onClick={() => setSelectedSector(sector)}
                    className={`${styles.filterBtn} ${selectedSector === sector ? styles.filterBtnActive : ''}`}
                    data-cursor="pointer"
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Clients Grid */}
        <div className={styles.gridWrapper}>
          <motion.div layout className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filteredClients.map((client, index) => (
                <motion.article
                  key={client.id}
                  layout
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={styles.card}
                  data-cursor="pointer"
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.sectorBadge}>{client.sector}</span>
                    {client.url ? (
                      <a
                        href={client.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkIcon}
                        title={`Visita ${client.name}`}
                        aria-label={`Visita il sito di ${client.name}`}
                      >
                        <Globe size={16} />
                        <ExternalLink size={10} className={styles.extArrow} />
                      </a>
                    ) : (
                      <span className={styles.managedBadge} title="Gestione infrastruttura e campagne">
                        <ShieldCheck size={16} />
                      </span>
                    )}
                  </div>
                  
                  <h3 className={styles.clientName}>{client.name}</h3>
                  <p className={styles.clientDesc}>{client.description}</p>
                  
                  {client.url && (
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.websiteLink}
                    >
                      <span>{client.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    </a>
                  )}
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredClients.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.emptyState}
            >
              <p>Nessun brand trovato per i criteri selezionati.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedSector('Tutti'); }}
                className={styles.resetBtn}
              >
                Resetta i filtri
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
