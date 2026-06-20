import React from 'react'
import { createRoot } from 'react-dom/client'
import { Scale, Globe2, ShieldCheck, Building2, FileText, Landmark, Home, Plane, Handshake, BriefcaseBusiness, Mail, MapPin, ChevronRight, Menu, X } from 'lucide-react'
import './styles.css'

const email = 'Legalworld579@gmail.com'

const services = [
  { icon: Building2, title: 'Corporate & Business Support', text: 'Company formation, corporate structuring, business documentation, shareholder agreements, partnership agreements and ongoing business support.' },
  { icon: Landmark, title: 'Banking & Compliance Support', text: 'Assistance with personal and corporate bank accounts, KYC, compliance requests, source of funds explanations and financial documentation.' },
  { icon: FileText, title: 'Contracts & Legal Documents', text: 'Drafting, reviewing and preparing contracts, agreements, legal letters, powers of attorney, claims, replies and business documents.' },
  { icon: Home, title: 'Real Estate Support', text: 'Legal and business support for property purchase, sale, rent, investment, document review and transaction assistance.' },
  { icon: Plane, title: 'Immigration & Residency', text: 'Support with residency, visa-related matters, relocation, family documentation and business migration.' },
  { icon: Handshake, title: 'Dispute Resolution & Negotiations', text: 'Case analysis, legal strategy, claim preparation, negotiation support and assistance in resolving disputes.' },
  { icon: Globe2, title: 'International Business Solutions', text: 'Support for cross-border transactions, international partnerships, due diligence, investment projects and commercial negotiations.' },
  { icon: ShieldCheck, title: 'Investment & Asset Protection', text: 'Risk review, transaction structuring, investor support and protection of commercial interests.' }
]

const industries = [
  'Business & Trade',
  'Real Estate & Construction',
  'Banking & Finance',
  'Import, Export & Logistics',
  'Technology & Digital Projects',
  'Private Clients & Families',
  'Investments & Partnerships'
]

const testimonials = [
  ['Legal World helped us prepare documents for an international business matter and explained each step clearly and professionally.', 'Corporate Client'],
  ['We contacted Legal World regarding a banking compliance request. The team helped us prepare the correct explanation and supporting documents.', 'Private Client'],
  ['Professional approach, clear strategy and strong communication. We received support from the first consultation until the final result.', 'Entrepreneur'],
  ['Legal World reviewed our real estate documents and helped us understand the risks before moving forward with the transaction.', 'Investor']
]

function Header() {
  const [open, setOpen] = React.useState(false)
  const links = ['About', 'Services', 'Industries', 'Process', 'Testimonials', 'Contact']
  return <header className="site-header">
    <a className="brand" href="#home" aria-label="Legal World home">
      <img src="/legal-world-logo.png" alt="Legal World logo" />
      <span>Legal World</span>
    </a>
    <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Open menu">{open ? <X/> : <Menu/>}</button>
    <nav className={open ? 'open' : ''}>
      {links.map(link => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}
      <a className="nav-cta" href={`mailto:${email}`}>Consultation</a>
    </nav>
  </header>
}

function App() {
  return <>
    <Header />
    <main id="home">
      <section className="hero section-pad">
        <div className="hero-bg"></div>
        <div className="hero-content container">
          <div className="hero-logo-wrap">
            <img src="/legal-world-logo.png" className="hero-logo" alt="Legal World" />
          </div>
          <p className="eyebrow">Dubai, United Arab Emirates</p>
          <h1>Global Legal & Business Solutions</h1>
          <p className="hero-text">Confidential legal, corporate and business consulting for individuals, entrepreneurs, investors and companies worldwide.</p>
          <div className="hero-actions">
            <a href={`mailto:${email}`} className="btn btn-primary">Get a Consultation <ChevronRight size={18}/></a>
            <a href="#services" className="btn btn-secondary">Our Services</a>
          </div>
        </div>
      </section>

      <section className="trust-bar">
        <div className="container trust-grid">
          <div><strong>International Approach</strong><span>Global perspective for complex matters</span></div>
          <div><strong>Confidentiality</strong><span>Discreet and careful client support</span></div>
          <div><strong>Practical Strategy</strong><span>Clear steps, documents and support</span></div>
        </div>
      </section>

      <section id="about" className="container two-col section-pad">
        <div>
          <p className="section-kicker">About Us</p>
          <h2>Legal World supports clients when matters require strategy, confidentiality and international understanding.</h2>
        </div>
        <div className="copy-block">
          <p>Legal World is an international legal and business consulting company based in Dubai, United Arab Emirates.</p>
          <p>We assist individuals, entrepreneurs, investors and companies with complex legal, corporate, financial and business matters across different jurisdictions.</p>
          <p>Our approach is practical, confidential and result-oriented. We help clients understand risks, prepare the right documents, communicate with institutions and find the most effective path forward.</p>
        </div>
      </section>

      <section id="services" className="section-pad services-section">
        <div className="container">
          <p className="section-kicker">Our Services</p>
          <h2>Comprehensive support for private clients and businesses</h2>
          <div className="cards-grid">
            {services.map(({icon: Icon, title, text}) => <article className="service-card" key={title}>
              <Icon className="card-icon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section id="industries" className="container section-pad industries-section">
        <p className="section-kicker">Industries</p>
        <h2>Industries We Serve</h2>
        <div className="industry-grid">
          {industries.map((item, i) => <div className="industry-item" key={item}><span>{String(i + 1).padStart(2, '0')}</span>{item}</div>)}
        </div>
      </section>

      <section id="process" className="section-pad process-section">
        <div className="container">
          <p className="section-kicker">How We Work</p>
          <h2>A clear process from first consultation to result</h2>
          <div className="steps">
            {['Consultation', 'Legal & Business Analysis', 'Documentation', 'Support & Communication', 'Result & Ongoing Support'].map((step, index) => <div className="step" key={step}>
              <span>{index + 1}</span><h3>{step}</h3>
            </div>)}
          </div>
        </div>
      </section>

      <section id="testimonials" className="container section-pad">
        <p className="section-kicker">Testimonials</p>
        <h2>Client Feedback</h2>
        <div className="testimonial-grid">
          {testimonials.map(([quote, author]) => <blockquote key={quote}>
            “{quote}”<cite>{author}</cite>
          </blockquote>)}
        </div>
      </section>

      <section id="contact" className="section-pad contact-section">
        <div className="container contact-grid">
          <div>
            <p className="section-kicker">Contact</p>
            <h2>Tell us about your matter</h2>
            <p>Our team will review your request and suggest the most practical next step.</p>
            <div className="contact-lines">
              <a href={`mailto:${email}`}><Mail size={18}/>{email}</a>
              <span><MapPin size={18}/>Dubai, United Arab Emirates</span>
            </div>
          </div>
          <form className="contact-form" action={`mailto:${email}`} method="post" encType="text/plain">
            <input name="name" placeholder="Name" required />
            <input name="email" placeholder="Email" type="email" required />
            <input name="phone" placeholder="Phone / WhatsApp" />
            <input name="country" placeholder="Country" />
            <select name="service" defaultValue="">
              <option value="" disabled>Service Required</option>
              <option>Corporate & Business Support</option>
              <option>Banking & Compliance Support</option>
              <option>Contracts & Legal Documents</option>
              <option>Real Estate Support</option>
              <option>Immigration & Residency</option>
              <option>Dispute Resolution</option>
              <option>Other</option>
            </select>
            <textarea name="message" placeholder="Message" rows="5" required></textarea>
            <button className="btn btn-primary" type="submit">Submit Request</button>
          </form>
        </div>
      </section>
    </main>

    <footer>
      <div className="container footer-grid">
        <div>
          <strong>Legal World</strong>
          <p>Global Legal & Business Solutions</p>
        </div>
        <p className="legal-note">Legal World provides legal and business consulting services. Where licensed legal representation is required, we work with qualified lawyers, advocates and authorized professionals.</p>
      </div>
    </footer>
  </>
}

export default App
