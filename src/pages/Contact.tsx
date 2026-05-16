import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: 'wedding', date: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStatus('success');
      const whatsappText = `Hello Romantic Love Photography! I'm ${formData.name}. I'm interested in ${formData.service} photography. Phone: ${formData.phone}. Date: ${formData.date}. Message: ${formData.message}`;
      window.open(`https://wa.me/918142775926?text=${encodeURIComponent(whatsappText)}`, '_blank');
      setFormData({ name: '', phone: '', email: '', service: 'wedding', date: '', message: '' });
    }, 1800);
  };

  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } }
  };

  const stagger: any = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bg">
          <img src="https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?auto=format&fit=crop&q=80&w=2000" alt="Contact" />
          <div className="contact-hero-overlay" />
        </div>
        <div className="container">
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="section-label">Let's Connect</span>
            <h1 className="contact-hero-title">Begin Your <em>Journey</em></h1>
            <p className="contact-hero-sub">We'd love to hear about your special day and how we can capture it forever.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main section-padding">
        <div className="container">
          <div className="contact-grid">

            {/* Left - Info */}
            <motion.div
              className="contact-info-panel"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <span className="section-label">Studio Details</span>
                <h2 className="contact-info-title">Reach <em>Us</em></h2>
              </motion.div>

              <div className="info-cards">
                {[
                  { icon: MapPin, title: 'Location', text: 'Sercle, Old Bowenpally\nSecunderabad, Hyderabad\nTelangana 500011' },
                  { icon: Phone, title: 'Phone', text: '+91 81427 75926' },
                  { icon: Mail, title: 'Email', text: 'hello@romanticlove.in' },
                  { icon: Clock, title: 'Hours', text: 'Mon – Sun · Opens 9:00 AM' },
                ].map((item, i) => (
                  <motion.div key={i} className="info-card glass" variants={fadeUp}>
                    <div className="info-icon-wrap">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div className="info-card-title">{item.title}</div>
                      <div className="info-card-text">{item.text}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="https://wa.me/918142775926"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-cta"
                variants={fadeUp}
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
                <ArrowRight size={14} />
              </motion.a>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              className="contact-form-panel glass"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <h3 className="form-heading">Send an Enquiry</h3>
              <p className="form-subheading">Fill in your details and we'll get back to you within 24 hours.</p>

              {status === 'success' ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h4>Message Sent!</h4>
                  <p>We'll get back to you very soon. A WhatsApp message has also been opened for you.</p>
                </div>
              ) : (
                <form className="booking-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name <span>*</span></label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required />
                    </div>
                    <div className="form-group">
                      <label>Phone Number <span>*</span></label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                    </div>
                    <div className="form-group">
                      <label>Event Date</label>
                      <input type="date" name="date" value={formData.date} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Service Required <span>*</span></label>
                    <select name="service" value={formData.service} onChange={handleChange}>
                      <option value="wedding">Wedding Photography</option>
                      <option value="pre-wedding">Pre-Wedding Shoot</option>
                      <option value="baby-shoots">Baby Shoots</option>
                      <option value="maternity">Maternity Portrait</option>
                      <option value="cinematic-video">Cinematic Video</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message / Special Requirements</label>
                    <textarea name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Tell us about your vision, venue, or any special requests..." />
                  </div>

                  <button type="submit" className="btn-primary submit-btn" disabled={sending}>
                    <span>{sending ? 'Sending...' : 'Send Enquiry'}</span>
                    {!sending && <ArrowRight size={14} />}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map */}
      <div className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121808.56061148816!2d78.43105151590212!3d17.44744738528994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a3e2182098b%3A0xc3c5fa17f4159f!2sSecunderabad%2C%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location"
        />
      </div>
    </div>
  );
};

export default Contact;
