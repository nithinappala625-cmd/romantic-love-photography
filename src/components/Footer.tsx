import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Camera, Globe, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top-bar" />
      <div className="container">
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-script">Romantic Love</span>
              <span className="footer-logo-tag">Photography Studio</span>
            </div>
            <p className="footer-tagline">"Capturing Emotions, Not Just Moments"</p>
            <div className="footer-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-text">5.0 · 30 Reviews on Google</span>
            </div>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
                <Camera size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook">
                <Globe size={16} />
              </a>
              <a href="https://wa.me/918142775926" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp" title="WhatsApp">
                <Heart size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-links-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/gallery">Portfolio</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/gallery">Wedding Photography</Link></li>
              <li><Link to="/gallery">Pre-Wedding Shoots</Link></li>
              <li><Link to="/gallery">Baby Shoots</Link></li>
              <li><Link to="/gallery">Maternity Portraits</Link></li>
              <li><Link to="/gallery">Cinematic Videos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact-col">
            <h4>Studio</h4>
            <div className="footer-contact-item">
              <MapPin size={14} className="fc-icon" />
              <span>Sercle, Old Bowenpally,<br />Secunderabad, Hyderabad<br />Telangana 500011</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={14} className="fc-icon" />
              <a href="tel:+918142775926" className="footer-phone-link">+91 81427 75926</a>
            </div>
            <div className="footer-contact-item">
              <Mail size={14} className="fc-icon" />
              <span>hello@romanticlove.in</span>
            </div>
            <div className="footer-hours">
              <span className="hours-badge">Open</span>
              <span className="hours-text">Mon – Sun · Opens 9:00 AM</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Romantic Love Photography. All Rights Reserved.</p>
          <div className="footer-bottom-right">
            <p className="footer-credit">Crafted with <span style={{ color: 'var(--rose)' }}>♥</span> in Hyderabad</p>
            <Link to="/admin/login" className="footer-admin-link">Studio Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
