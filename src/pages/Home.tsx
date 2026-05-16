import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Camera, Play } from 'lucide-react';
import { galleryStore } from '../lib/galleryStore';
import './Home.css';

const services = [
  { id: 1, title: 'Wedding',     subtitle: 'Editorial',       image: '/portfolio/wedding/DSC06780Aa.jpg',    href: '/gallery' },
  { id: 2, title: 'Pre-Wedding', subtitle: 'Couture',         image: '/portfolio/prewedding/DSC09046A.jpg',  href: '/gallery' },
  { id: 3, title: 'Baby Shoots', subtitle: 'Precious',        image: '/portfolio/baby-shoots/IMG_8071.JPG',  href: '/gallery' },
  { id: 4, title: 'Cinematic',   subtitle: 'Cinematic Films', image: '/portfolio/prewedding/DSC01418A.jpg',  href: '/gallery' },
];

const testimonials = [
  {
    text: "The most breathtaking photography studio we've ever worked with. Every frame felt like a painting. Our wedding album is a masterpiece.",
    author: "Anjali & Rahul",
    location: "Mumbai, India",
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=200"
  },
  {
    text: "Capturing our little one's very first moments with such artistry and grace. We are forever grateful for this priceless gift.",
    author: "Priya & Karthik",
    location: "Hyderabad, India",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
  }
];

const stats = [
  { value: '500+', label: 'Weddings' },
  { value: '10+', label: 'Years of Excellence' },
  { value: '15', label: 'International Awards' },
  { value: '2000+', label: 'Happy Families' },
];

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } }
  };

  const stagger: any = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };

  return (
    <div className="home-page">

      {/* ====== HERO ====== */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero-parallax" style={{ y: heroY }}>
          <img src="/portfolio/prewedding/DSC09570A.jpg" alt="Hero" />
        </motion.div>
        <div className="hero-overlay" />

        <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
          <motion.span
            className="hero-eyebrow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Camera size={10} /> Secunderabad, Hyderabad
          </motion.span>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="hero-title-script">Romantic</span>
            <span className="hero-title-serif">Love Photography</span>
          </motion.h1>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          >
            "Capturing Emotions, Not Just Moments"
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Link to="/contact" className="btn-primary">
              <span>Reserve Your Date</span>
              <ArrowRight size={14} />
            </Link>
            <Link to="/gallery" className="btn-outline">
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="scroll-line" />
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* ====== STATS BAR ====== */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SERVICES / EXPERTISE ====== */}
      <section className="services-section section-padding">
        <div className="container">
          <motion.div
            className="section-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="section-label">Our Craft</span>
            <h2 className="section-title">
              A Legacy of <em>Timeless Stories</em>
            </h2>
            <p className="section-subtitle">
              From grand wedding epics to intimate family portraits — every project we undertake is a work of art.
            </p>
          </motion.div>

          <motion.div
            className="services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {services.map((s) => (
              <motion.div key={s.id} className="service-card" variants={fadeUp}>
                <div className="service-img-wrap">
                  <img src={s.image} alt={s.title} loading="lazy" />
                  <div className="service-img-overlay" />
                </div>
                <div className="service-content">
                  <span className="service-subtitle">{s.subtitle}</span>
                  <h3 className="service-title">{s.title}</h3>
                  <Link to={s.href} className="service-link">
                    Explore <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== FEATURED GALLERY PREVIEW ====== */}
      <section className="home-gallery-preview section-padding">
        <div className="container">
          <motion.div
            className="section-intro centered"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="section-label">Portfolio Highlights</span>
            <h2 className="section-title">Moments We've <em>Frozen in Time</em></h2>
            <p className="section-subtitle">A glimpse into our world — real couples, real emotions, real art.</p>
          </motion.div>

          <motion.div
            className="home-gallery-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {galleryStore.getFeatured(6).map((item, i) => (
              <motion.div key={item.id} className={`home-gallery-thumb ${i === 0 ? 'tall' : ''}`} variants={fadeUp}>
                {item.type === 'video' ? (
                  <Link to="/gallery">
                    <img src={item.thumbnail || '/portfolio/wedding/DSC06678.jpg'} alt={item.alt} loading="lazy" />
                    <div className="hg-play"><div className="hg-play-circle"><Play size={22} fill="white" /></div></div>
                  </Link>
                ) : (
                  <Link to="/gallery">
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  </Link>
                )}
                <div className="hg-overlay">
                  <span className="hg-label">{item.alt}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="section-cta" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
            <Link to="/gallery" className="btn-outline">View Full Gallery <ArrowRight size={14} /></Link>
          </motion.div>
        </div>
      </section>

      {/* ====== FEATURED SPLIT SECTION ====== */}
      <section className="feature-split">
        <div className="feature-img-side">
          <img src="/portfolio/wedding/DSC06894A.jpg" alt="Studio" />
          <div className="feature-img-overlay" />
          <div className="feature-badge glass">
            <span className="badge-num">10+</span>
            <span className="badge-text">Years of<br/>Excellence</span>
          </div>
        </div>
        <div className="feature-content-side">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="section-label" variants={fadeUp}>Our Philosophy</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>
              We Don't Shoot <em>Photographs</em>.<br />We Craft <em>Masterpieces.</em>
            </motion.h2>
            <motion.p className="feature-text" variants={fadeUp}>
              Based in the heart of Secunderabad, Romantic Love Photography is a luxury studio that operates at the intersection of fine art and emotion. Our editorial approach blends natural light, grand compositions, and intimate portraiture.
            </motion.p>
            <motion.p className="feature-text" variants={fadeUp}>
              Every team member is a storyteller. Every camera angle is intentional. Every delivery is a cinematic experience.
            </motion.p>
            <motion.div className="feature-pillars" variants={fadeUp}>
              {['Artistic Vision', 'State-of-Art Gear', 'Luxury Delivery', 'Bespoke Edits'].map((p, i) => (
                <div key={i} className="pillar-item">
                  <span className="pillar-dot" />
                  {p}
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/about" className="btn-outline">Our Full Story</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="testimonials-section section-padding">
        <div className="container">
          <motion.div
            className="section-intro centered"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="section-label">Client Love</span>
            <h2 className="section-title">Words From Our <em>Beloved Clients</em></h2>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="testimonial-card glass"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
              >
                <div className="quote-mark">"</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <img src={t.img} alt={t.author} className="author-img" />
                  <div>
                    <div className="author-name">{t.author}</div>
                    <div className="author-location">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section className="cta-section">
        <div className="cta-bg">
          <img src="/portfolio/prewedding/DSC09829A.jpg" alt="CTA" />
          <div className="cta-overlay" />
        </div>
        <div className="container">
          <motion.div
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="section-label" variants={fadeUp}>Let's Begin</motion.span>
            <motion.h2 className="cta-title" variants={fadeUp}>
              Your Love Story<br />Deserves to Be <em>Immortalised.</em>
            </motion.h2>
            <motion.p className="cta-subtitle" variants={fadeUp}>
              Limited dates available. Book your session today.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/contact" className="btn-primary">
                <span>Reserve Your Date</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
