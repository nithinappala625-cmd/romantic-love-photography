import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './About.css';

const team = [
  {
    name: 'SIRIGIRI SRIKANTH',
    role: 'Lead Photographer & Visionary',
    bio: 'Dedicated to capturing moments with an artistic eye and a passion for storytelling. Every frame is a timeless story of love, life, and legacy — told with elegance.',
    img: '/portfolio/prewedding/DSC00898A.jpg',
  }
];

const milestones = [
  { year: '2014', title: 'Studio Founded', desc: 'Started with a vision to redefine luxury photography in Hyderabad.' },
  { year: '2017', title: 'First International Award', desc: 'Won Best Wedding Photography at the Asia Photography Summit.' },
  { year: '2020', title: 'Cinematic Division', desc: 'Launched our full cinematic video production wing.' },
  { year: '2024', title: '500+ Weddings', desc: 'Crossed the milestone of 500 luxury wedding stories documented.' },
];

const About = () => {
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
    <div className="about-page">

      {/* ====== HERO ====== */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="/portfolio/prewedding/001.jpg" alt="About Hero" />
          <div className="about-hero-overlay" />
        </div>
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="section-label">Our Story</span>
            <h1 className="about-hero-title">
              We Are <em>Storytellers</em>,<br />Not Just Photographers.
            </h1>
            <p className="about-hero-sub">
              A decade of passion, artistry, and an obsessive dedication to the craft of visual storytelling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====== PHILOSOPHY ====== */}
      <section className="philosophy-section section-padding">
        <div className="container">
          <div className="philosophy-grid">
            <motion.div
              className="philosophy-img"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <img src="/portfolio/prewedding/DSC00923A.jpg" alt="Behind the lens" />
              <div className="philosophy-img-accent" />
            </motion.div>

            <motion.div
              className="philosophy-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.span className="section-label" variants={fadeUp}>Our Philosophy</motion.span>
              <motion.h2 className="section-title" variants={fadeUp}>
                Light. Emotion.<br /><em>Truth.</em>
              </motion.h2>
              <motion.p className="philosophy-text" variants={fadeUp}>
                Based in the heart of Secunderabad, Romantic Love Photography was founded on a single belief — that every love story deserves to be told with the elegance of fine art.
              </motion.p>
              <motion.p className="philosophy-text" variants={fadeUp}>
                We blend natural light, architectural grandeur, and intimate portraiture to create a gallery that transcends ordinary photography. Every session is a collaboration, every edit a labour of love.
              </motion.p>

              <motion.div className="about-stats glass" variants={fadeUp}>
                {[
                  { value: '500+', label: 'Weddings' },
                  { value: '10+', label: 'Years' },
                  { value: '15', label: 'Awards' },
                  { value: '2000+', label: 'Families' },
                ].map((s, i) => (
                  <div key={i} className="about-stat-item">
                    <div className="about-stat-val">{s.value}</div>
                    <div className="about-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== TIMELINE ====== */}
      <section className="timeline-section section-padding">
        <div className="container">
          <motion.div
            className="section-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">A Decade of <em>Excellence</em></h2>
          </motion.div>

          <div className="timeline">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-content glass">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </motion.div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* ====== TEAM ====== */}
      <section className="team-section section-padding">
        <div className="container">
          <motion.div
            className="section-intro centered"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="section-label">Our Studio</span>
            <h2 className="section-title">Our <em>Team</em></h2>
          </motion.div>

          <div className="team-solo-wrap">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="team-card-solo"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.9 }}
              >
                <div className="team-img-wrap solo">
                  <img src={member.img} alt={member.name} />
                  <div className="team-img-overlay" />
                  <div className="team-img-accent" />
                </div>
                <div className="team-info-solo glass">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="about-cta">
        <div className="about-cta-bg">
          <img src="/portfolio/baby-shoots/IMG_8071.JPG" alt="CTA" />
          <div className="about-cta-overlay" />
        </div>
        <div className="container">
          <motion.div
            className="about-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">Begin Your Story</span>
            <h2 className="about-cta-title">Let's Create Something <em>Extraordinary</em>.</h2>
            <Link to="/contact" className="btn-primary">
              <span>Get in Touch</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
