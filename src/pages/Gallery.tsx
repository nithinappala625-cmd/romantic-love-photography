import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryStore } from '../lib/galleryStore';
import type { GalleryItem } from '../lib/galleryStore';
import './Gallery.css';

const CATEGORY_TABS = [
  { key: 'All',          label: 'All Work' },
  { key: 'wedding',      label: 'Weddings' },
  { key: 'pre-wedding',  label: 'Pre-Wedding' },
  { key: 'baby-shoots',  label: 'Baby Shoots' },
  { key: 'cinematic',    label: 'Cinematic' },
];

type LightboxState = { item: GalleryItem; index: number } | null;

const Gallery = () => {
  const [filter, setFilter]             = useState('All');
  const [items, setItems]               = useState<GalleryItem[]>([]);
  const [allItems, setAllItems]         = useState<GalleryItem[]>([]);
  const [lightbox, setLightbox]         = useState<LightboxState>(null);

  // Reset old gallery version on mount so fresh defaults load
  useEffect(() => {
    // Only wipe if still on old key
    if (!localStorage.getItem('rlp_gallery_v3')) {
      ['rlp_gallery', 'rlp_gallery_v2'].forEach(k => localStorage.removeItem(k));
    }
    window.scrollTo(0, 0);
    const all = galleryStore.getAll();
    setAllItems(all);
    setItems(all);

    // Live-reload: listen for admin changes (same tab via custom event, cross-tab via storage)
    const refresh = () => {
      const updated = galleryStore.getAll();
      setAllItems(updated);
      setItems(filter === 'All' ? updated : updated.filter(i => i.category === filter));
    };
    window.addEventListener('gallery-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('gallery-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  useEffect(() => {
    const all = galleryStore.getAll();
    setAllItems(all);
    setItems(filter === 'All' ? all : all.filter(i => i.category === filter));
  }, [filter]);

  /* ── Lightbox keyboard navigation ───────────────────────────────────────── */
  const openLightbox = (item: GalleryItem, index: number) => setLightbox({ item, index });
  const closeLightbox = () => setLightbox(null);

  const navigateLightbox = useCallback((dir: 1 | -1) => {
    if (!lightbox) return;
    const newIndex = (lightbox.index + dir + items.length) % items.length;
    setLightbox({ item: items[newIndex], index: newIndex });
  }, [lightbox, items]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowRight')  navigateLightbox(1);
      if (e.key === 'ArrowLeft')   navigateLightbox(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, navigateLightbox]);

  const countFor = (key: string) =>
    key === 'All' ? allItems.length : allItems.filter(i => i.category === key).length;

  return (
    <div className="gallery-page">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="gallery-hero">
        <div className="gallery-hero-bg">
          <img
            src="/portfolio/wedding/DSC06780Aa.jpg"
            alt="Gallery Hero"
          />
          <div className="gallery-hero-overlay" />
        </div>
        <div className="container">
          <motion.div
            className="gallery-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="section-label">Our Portfolio</span>
            <h1 className="gallery-hero-title">A Visual <em>Legacy</em></h1>
            <p className="gallery-hero-sub">
              Each frame is a carefully crafted moment — a story worth keeping forever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Bar ───────────────────────────────────────────────────── */}
      <div className="gallery-filter-bar">
        <div className="container">
          <div className="filter-tabs">
            {CATEGORY_TABS.map(cat => (
              <button
                key={cat.key}
                className={`filter-tab ${filter === cat.key ? 'active' : ''}`}
                onClick={() => setFilter(cat.key)}
              >
                {cat.label}
                <span className="filter-count">{countFor(cat.key)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <section className="gallery-section">
        <div className="container">
          {items.length === 0 && (
            <div className="gallery-empty">
              <p>No items in this category yet.</p>
            </div>
          )}

          <motion.div layout className="masonry-grid">
            <AnimatePresence>
              {items.map((img, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45 }}
                  key={img.id}
                  className={`gallery-item ${img.featured ? 'featured-item' : ''} ${img.type === 'video' ? 'video-item' : ''}`}
                  onClick={() => openLightbox(img, idx)}
                >
                  {img.type === 'video' ? (
                    <div className="gallery-video-thumb">
                      {img.thumbnail
                        ? <img src={img.thumbnail} alt={img.alt} loading="lazy" />
                        : <div className="video-placeholder-bg" />
                      }
                      <div className="play-overlay">
                        <div className="play-circle"><Play size={28} fill="white" /></div>
                      </div>
                    </div>
                  ) : (
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  )}

                  <div className="gallery-item-overlay">
                    {img.type === 'image'
                      ? <ZoomIn size={28} className="zoom-icon" />
                      : <Play size={28} className="zoom-icon" fill="white" />
                    }
                    <span className="gallery-item-label">{img.alt}</span>
                  </div>

                  {img.featured && <div className="gallery-featured-pin">★</div>}
                  {img.type === 'video' && <div className="video-badge">VIDEO</div>}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-btn" onClick={closeLightbox}><X size={24} /></button>

              {/* Nav arrows */}
              <button className="lb-nav lb-prev" onClick={() => navigateLightbox(-1)}>
                <ChevronLeft size={32} />
              </button>
              <button className="lb-nav lb-next" onClick={() => navigateLightbox(1)}>
                <ChevronRight size={32} />
              </button>

              {lightbox.item.type === 'video' ? (
                <video
                  className="lightbox-video"
                  src={lightbox.item.src}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={lightbox.item.src}
                  alt={lightbox.item.alt}
                  className="lightbox-img"
                />
              )}

              <div className="lightbox-caption">
                <span>{lightbox.item.alt}</span>
                <span className="lb-counter">{lightbox.index + 1} / {items.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
