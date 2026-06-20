import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, ChevronRight,
  FileCheck2, Globe2, Handshake, Languages, Mail, Menu, Search,
  ShieldCheck, Sparkles, Users, X
} from 'lucide-react'
import './styles.css'

const email = 'Legalworld579@gmail.com'

const services = [
  { icon: Building2, title: 'Company & Corporate Services', text: 'Company formation, restructuring, licensing, administrative support, amendments and closures.' },
  { icon: FileCheck2, title: 'Certificates & Documentation', text: 'Certificates, permits, approvals, legalisation, official documents and professional document support.' },
  { icon: ShieldCheck, title: 'Legal & Professional Support', text: 'Legal consultations, lawyer services through licensed professionals, contracts, disputes and representation.' },
  { icon: BriefcaseBusiness, title: 'Trade, Products & Market Entry', text: 'Buyer and distributor search, supplier support, product placement, import, export and new-market entry.' },
  { icon: Users, title: 'Recruitment & Specialist Search', text: 'Finding employees, consultants, technical experts, project specialists and trusted service providers.' },
  { icon: Handshake, title: 'Negotiations & Representation', text: 'Meeting organisation, negotiation support, representation, preparation and deal coordination.' },
  { icon: Languages, title: 'Translation & Language Support', text: 'Professional interpreters and translators for meetings, documents, negotiations and international projects.' },
  { icon: Globe2, title: 'Special & International Requests', text: 'Complex, unusual and cross-border matters that do not fit a standard service category.' }
]

const steps = [
  ['Request Submission', 'You describe your objective, location, urgency and preferred result.'],
  ['Initial Review', 'Our coordination team studies the request and identifies the information required.'],
  ['Multidisciplinary Assessment', 'The matter is reviewed from all relevant professional and practical perspectives.'],
  ['Specialist Selection', 'We involve the appropriate consultants, licensed professionals, partners or service providers.'],
  ['Strategy & Proposal', 'You receive a clear plan, expected stages, estimated timing, costs and potential risks.'],
  ['Execution & Coordination', 'We organise documents, meetings, communications, negotiations and implementation.'],
  ['Ongoing Support', 'You keep one point of contact while we coordinate everyone involved.' ]
]

const testimonials = [
  ['Professional, responsive and exceptionally well organised. Legal World coordinated several specialists and kept the entire process clear from start to finish.', 'Business Client'],
  ['We approached the team with an unusual international request. They identified the right specialists and presented a practical way forward.', 'Private Client'],
  ['The strongest advantage was having one responsible contact instead of dealing with several separate companies.', 'Entrepreneur'],
  ['The process was confidential, structured and transparent. Every stage and expected cost was explained before work began.', 'Corporate Client']
]

function Reveal({ children, className = '' }) {
  const ref = React.useRef(null)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible')
        observer.unobserve(el)
      }
    }, { threshold: 0.14 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function Header() {
  const [open, setOpen] = React.useState(false)
  const links = ['About', 'Services', 'Process', 'Consultation', 'Testimonials', 'Contact']
  return <header className="site-header">
    <a className="brand" href="#home" aria-label="Legal World home">
      <img src="/legal-world-logo.png" alt="Legal World" />
      <span>Legal World</span>
    </a>
    <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Open menu">{open ? <X/> : <Menu/>}</button>
    <nav className={open ? 'open' : ''}>
      {links.map(link => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}
      <a className="nav-cta" href="#consultation" onClick={() => setOpen(false)}>Free 10-Minute Call</a>
    </nav>
  </header>
}

function App() {
  return <>
    <Header />
    <main id="home">
      <section className="hero">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-glow" />
        <div className="container hero-content">
          <img src="/legal-world-logo.png" className="hero-logo" alt="Legal World logo" />
          <p className="eyebrow">International Solutions for People and Business</p>
          <h1>One trusted point of contact for almost any challenge.</h1>
          <p className="hero-text">For more than 15 years, we have been helping individuals, entrepreneurs and companies find the right specialists, coordinate complex processes and move difficult matters forward worldwide.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Submit Your Request <ArrowRight size={18}/></a>
            <a href="#consultation" className="btn btn-secondary">Free 10-Minute Initial Call</a>
          </div>
          <div className="hero-trust">
            <span><CheckCircle2 size={16}/> One point of contact</span>
            <span><CheckCircle2 size={16}/> Global professional network</span>
            <span><CheckCircle2 size={16}/> Confidential coordination</span>
          </div>
        </div>
      </section>

      <section className="metrics">
        <div className="container metrics-grid">
          <div><strong>15+</strong><span>Years of experience</span></div>
          <div><strong>Global</strong><span>Professional network</span></div>
          <div><strong>Multi-sector</strong><span>Expert coordination</span></div>
          <div><strong>One team</strong><span>From request to execution</span></div>
        </div>
      </section>

      <section id="about" className="section-pad">
        <div className="container two-col">
          <Reveal>
            <p className="section-kicker">A different kind of company</p>
            <h2>Most companies specialise in one area. Legal World was created differently.</h2>
          </Reveal>
          <Reveal className="copy-block">
            <p>Legal World is an international coordination and solutions company for private clients, entrepreneurs and businesses.</p>
            <p>Clients can contact us with a wide range of requests — from opening or closing a company, obtaining a certificate and finding a specialist to organising negotiations, translation, recruitment, trade support, legal assistance and complex international projects.</p>
            <p>You do not need to search for several separate providers. We analyse the matter, identify the required expertise, involve the right professionals and coordinate the process through one responsible team.</p>
          </Reveal>
        </div>
      </section>

      <section id="services" className="section-pad panel-section">
        <div className="container">
          <Reveal>
            <p className="section-kicker">How we can help</p>
            <h2>A uniquely broad scope of services under one roof</h2>
          </Reveal>
          <div className="cards-grid">
            {services.map(({icon: Icon, title, text}, index) => <Reveal key={title} className="reveal-delay">
              <article className="service-card" style={{'--delay': `${index * 55}ms`}}>
                <div className="card-top"><Icon/><span>{String(index + 1).padStart(2, '0')}</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#contact">Describe your request <ChevronRight size={16}/></a>
              </article>
            </Reveal>)}
          </div>
          <Reveal>
            <div className="special-request">
              <Sparkles size={26}/>
              <div><h3>Your request does not fit a standard category?</h3><p>Tell us what you need. Our assessment team will review the matter and identify possible solutions.</p></div>
              <a href="#contact" className="btn btn-secondary">Submit a Special Request</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="process" className="section-pad">
        <div className="container">
          <Reveal>
            <p className="section-kicker">How we work</p>
            <h2>A structured path from the first request to coordinated execution</h2>
          </Reveal>
          <div className="timeline">
            {steps.map(([title, text], index) => <Reveal key={title}>
              <article className="timeline-item">
                <div className="timeline-number">{String(index + 1).padStart(2, '0')}</div>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section id="consultation" className="section-pad consultation-section">
        <div className="container consultation-grid">
          <Reveal>
            <p className="section-kicker">Professional consultations</p>
            <h2>Start with a complimentary 10-minute initial call</h2>
            <p>Use the first 10 minutes to briefly explain your situation, objective and expected result. Our coordinator will identify the relevant area of expertise and explain the appropriate next step.</p>
            <div className="consult-list">
              <span><CheckCircle2/> Preliminary assessment</span>
              <span><CheckCircle2/> Identification of the right specialist</span>
              <span><CheckCircle2/> Explanation of the next step</span>
              <span><CheckCircle2/> Fee confirmed before paid work begins</span>
            </div>
          </Reveal>
          <Reveal>
            <div className="consult-card">
              <span className="free-badge">Complimentary</span>
              <strong>10 Minutes</strong>
              <h3>Initial Call</h3>
              <p>The initial call does not include detailed professional advice, document analysis, legal conclusions or a complete solution strategy.</p>
              <a href="#contact" className="btn btn-primary">Request Your Initial Call</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="testimonials" className="section-pad panel-section">
        <div className="container">
          <Reveal><p className="section-kicker">Client experiences</p><h2>Trust built through clear coordination</h2></Reveal>
          <div className="testimonial-track">
            {testimonials.map(([quote, author]) => <blockquote key={quote}><p>“{quote}”</p><cite>{author}</cite></blockquote>)}
          </div>
          <p className="testimonial-note">Only genuine client reviews should be published with the client’s permission.</p>
        </div>
      </section>

      <section className="section-pad confidentiality">
        <div className="container two-col">
          <Reveal><p className="section-kicker">Confidentiality</p><h2>Discretion at every stage of the process</h2></Reveal>
          <Reveal className="copy-block"><p>Every request is handled carefully and confidentially. Information is shared only with the professionals whose involvement is necessary for assessment and execution.</p><div className="mini-grid"><span><ShieldCheck/> Controlled access</span><span><Search/> Individual assessment</span><span><Users/> Responsible coordination</span><span><Globe2/> International capability</span></div></Reveal>
        </div>
      </section>

      <section id="contact" className="section-pad contact-section">
        <div className="container contact-grid">
          <Reveal>
            <p className="section-kicker">Submit a confidential request</p>
            <h2>Tell us what result you need</h2>
            <p>Our coordination team will review the information and contact you regarding the appropriate next step.</p>
            <a className="email-link" href={`mailto:${email}`}><Mail size={18}/>{email}</a>
          </Reveal>
          <Reveal>
            <form className="contact-form" action={`mailto:${email}`} method="post" encType="text/plain">
              <div className="form-row"><input name="name" placeholder="Full Name" required/><input name="email" type="email" placeholder="Email" required/></div>
              <div className="form-row"><input name="phone" placeholder="Phone (optional)"/><input name="country" placeholder="Country of Residence"/></div>
              <div className="form-row"><input name="matter_location" placeholder="Matter Location"/><select name="urgency" defaultValue=""><option value="" disabled>Urgency</option><option>Standard</option><option>Important</option><option>Urgent</option></select></div>
              <select name="request_type" defaultValue=""><option value="" disabled>Type of Assistance</option>{services.map(s => <option key={s.title}>{s.title}</option>)}<option>Other / Special Request</option></select>
              <textarea name="message" placeholder="Briefly describe your request and expected result" rows="6" required></textarea>
              <label className="consent"><input type="checkbox" required/> I agree that Legal World may review the submitted information for the purpose of responding to this request.</label>
              <button className="btn btn-primary" type="submit">Submit Request <ArrowRight size={18}/></button>
            </form>
          </Reveal>
        </div>
      </section>
    </main>

    <footer>
      <div className="container footer-grid">
        <div className="footer-brand"><img src="/legal-world-logo.png" alt="Legal World"/><div><strong>Legal World</strong><span>International Solutions for People and Business</span></div></div>
        <p className="legal-note">Legal World coordinates professional services through internal specialists and trusted partners. Where a service requires a specific licence or regulated professional status, the work is performed by appropriately qualified and authorised professionals.</p>
      </div>
    </footer>
  </>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
