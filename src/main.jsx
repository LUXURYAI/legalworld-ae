import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, ChevronDown,
  ChevronRight, FileCheck2, Globe2, Handshake, Languages, Mail, Menu,
  ShieldCheck, Sparkles, Users, X
} from 'lucide-react'
import { languages, translations } from './translations'
import './styles.css'

const EMAIL = 'Legalworld579@gmail.com'
const STORAGE_KEY = 'legalworld_language'
const supported = languages.map((language) => language.code)

const serviceIcons = [
  Building2, FileCheck2, ShieldCheck, BriefcaseBusiness,
  Users, Handshake, Languages, Building2, Globe2
]

function normalizeLanguage(value = '') {
  const code = value.toLowerCase().replace('_', '-')
  if (code.startsWith('ru')) return 'ru'
  if (code.startsWith('ar')) return 'ar'
  if (code.startsWith('fr')) return 'fr'
  if (code.startsWith('zh')) return 'zh'
  if (code.startsWith('de')) return 'de'
  return 'en'
}

function detectInitialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && supported.includes(saved)) return saved

  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  for (const candidate of browserLanguages) {
    const normalized = normalizeLanguage(candidate)
    if (supported.includes(normalized)) return normalized
  }
  return 'en'
}

function Reveal({ children, className = '' }) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (!('IntersectionObserver' in window)) {
      element.classList.add('visible')
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('visible')
        observer.unobserve(element)
      }
    }, { threshold: 0.12 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function LanguageSelector({ language, onChange }) {
  const [open, setOpen] = React.useState(false)
  const wrapper = React.useRef(null)
  const active = languages.find((item) => item.code === language) || languages[0]

  React.useEffect(() => {
    const close = (event) => {
      if (wrapper.current && !wrapper.current.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div className="language-selector" ref={wrapper}>
      <button
        type="button"
        className="language-button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Select language"
      >
        <Globe2 size={17} />
        <span>{active.short}</span>
        <ChevronDown size={15} />
      </button>

      {open && (
        <div className="language-menu">
          {languages.map((item) => (
            <button
              type="button"
              key={item.code}
              className={item.code === language ? 'active' : ''}
              onClick={() => {
                onChange(item.code)
                setOpen(false)
              }}
            >
              <span>{item.label}</span>
              <small>{item.short}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Header({ t, language, onLanguageChange }) {
  const [open, setOpen] = React.useState(false)
  const sectionIds = ['about', 'services', 'process', 'consultation', 'testimonials', 'contact']

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Legal World home">
        <img src="/legal-world-logo.png" alt="Legal World" />
        <span>Legal World</span>
      </a>

      <button
        type="button"
        className="menu-btn"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open menu"
      >
        {open ? <X /> : <Menu />}
      </button>

      <nav className={open ? 'open' : ''}>
        {t.nav.map((label, index) => (
          <a
            key={sectionIds[index]}
            href={`#${sectionIds[index]}`}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#consultation" onClick={() => setOpen(false)}>
          {t.freeCall}
        </a>
        <LanguageSelector language={language} onChange={onLanguageChange} />
      </nav>
    </header>
  )
}

function ContactForm({ t }) {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    country: '',
    category: '',
    message: '',
    consent: false
  })

  function update(event) {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function submit(event) {
    event.preventDefault()
    if (!form.consent) return

    const subject = encodeURIComponent(`Legal World request — ${form.category || 'General'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCountry: ${form.country}\nCategory: ${form.category}\n\nRequest:\n${form.message}`
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <input required name="name" value={form.name} onChange={update} placeholder={t.form.name} />
        <input required type="email" name="email" value={form.email} onChange={update} placeholder={t.form.email} />
      </div>

      <div className="form-row">
        <input required name="country" value={form.country} onChange={update} placeholder={t.form.country} />
        <select required name="category" value={form.category} onChange={update}>
          {t.form.categories.map((item, index) => (
            <option key={item} value={index === 0 ? '' : item}>{item}</option>
          ))}
        </select>
      </div>

      <textarea
        required
        rows="7"
        name="message"
        value={form.message}
        onChange={update}
        placeholder={t.form.message}
      />

      <label className="consent">
        <input required type="checkbox" name="consent" checked={form.consent} onChange={update} />
        <span>{t.form.consent}</span>
      </label>

      <button className="btn btn-primary" type="submit">
        {t.form.send} <Mail size={18} />
      </button>
    </form>
  )
}

function App() {
  const [language, setLanguage] = React.useState(detectInitialLanguage)
  const t = translations[language]

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.title = t.metaTitle

    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', t.heroText)
  }, [language, t])

  return (
    <>
      <Header t={t} language={language} onLanguageChange={setLanguage} />

      <main id="home">
        <section className="hero">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-glow" />

          <div className="container hero-content">
            <img src="/legal-world-logo.png" className="hero-logo" alt="Legal World logo" />
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-text">{t.heroText}</p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                {t.submit} <ArrowRight size={18} />
              </a>
              <a href="#consultation" className="btn btn-secondary">{t.freeCall}</a>
            </div>

            <div className="hero-trust">
              {t.trust.map((item) => (
                <span key={item}><CheckCircle2 size={16} />{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="metrics">
          <div className="container metrics-grid">
            {t.metrics.map(([strong, label]) => (
              <div key={label}><strong>{strong}</strong><span>{label}</span></div>
            ))}
          </div>
        </section>

        <section id="about" className="section-pad">
          <div className="container two-col">
            <Reveal>
              <p className="section-kicker">{t.aboutKicker}</p>
              <h2>{t.aboutTitle}</h2>
            </Reveal>
            <Reveal className="copy-block">
              {t.aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </Reveal>
          </div>
        </section>

        <section id="services" className="section-pad panel-section">
          <div className="container">
            <Reveal>
              <p className="section-kicker">{t.servicesKicker}</p>
              <h2>{t.servicesTitle}</h2>
            </Reveal>

            <div className="cards-grid">
              {t.services.map(([title, text], index) => {
                const Icon = serviceIcons[index]
                return (
                  <Reveal key={title} className="reveal-delay">
                    <article className="service-card" style={{ '--delay': `${index * 55}ms` }}>
                      <div className="card-top">
                        <Icon />
                        <span>{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                      <a href="#contact">{t.describe}<ChevronRight size={16} /></a>
                    </article>
                  </Reveal>
                )
              })}
            </div>

            <Reveal>
              <div className="special-request">
                <Sparkles size={26} />
                <div>
                  <h3>{t.specialTitle}</h3>
                  <p>{t.specialText}</p>
                </div>
                <a href="#contact" className="btn btn-secondary">{t.specialButton}</a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="process" className="section-pad">
          <div className="container">
            <Reveal>
              <p className="section-kicker">{t.processKicker}</p>
              <h2>{t.processTitle}</h2>
            </Reveal>

            <div className="timeline">
              {t.steps.map(([title, text], index) => (
                <Reveal key={title}>
                  <article className="timeline-item">
                    <div className="timeline-number">{String(index + 1).padStart(2, '0')}</div>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="consultation" className="section-pad consultation-section">
          <div className="container consultation-grid">
            <Reveal>
              <p className="section-kicker">{t.consultKicker}</p>
              <h2>{t.consultTitle}</h2>
              <p>{t.consultText}</p>

              <div className="consult-list">
                {t.consultPoints.map((item) => (
                  <span key={item}><CheckCircle2 />{item}</span>
                ))}
              </div>

              <p className="fine-print">{t.consultNote}</p>
            </Reveal>

            <Reveal>
              <div className="consult-card">
                <span className="free-badge">FIRST 10 MINUTES FREE</span>
                <strong>10</strong>
                <h3>{t.minutes}</h3>
                <a href="#contact" className="btn btn-primary">{t.book}</a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="testimonials" className="section-pad">
          <div className="container testimonial-layout">
            <Reveal>
              <p className="section-kicker">{t.testimonialsKicker}</p>
              <h2>{t.testimonialsTitle}</h2>
              <p className="testimonial-intro">{t.testimonialsText}</p>
            </Reveal>

            <Reveal>
              <div className="principles-grid">
                {t.confidentiality.map((item) => (
                  <div key={item}><ShieldCheck size={21} /><span>{item}</span></div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="privacy" className="section-pad privacy-section">
          <div className="container privacy-card">
            <Reveal>
              <div className="privacy-content">
                <div className="privacy-icon"><ShieldCheck size={34} /></div>
                <div>
                  <p className="section-kicker">{t.privacyKicker}</p>
                  <h2>{t.privacyTitle}</h2>
                  <p>{t.privacyText}</p>
                </div>
                <a href="https://emcoin.vip/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {t.privacyButton} <ArrowRight size={18} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="section-pad contact-section">
          <div className="container contact-grid">
            <Reveal>
              <p className="section-kicker">{t.contactKicker}</p>
              <h2>{t.contactTitle}</h2>
              <p>{t.contactText}</p>
              <a className="email-link" href={`mailto:${EMAIL}`}>
                <Mail size={19} /> {EMAIL}
              </a>
            </Reveal>

            <Reveal>
              <ContactForm t={t} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/legal-world-logo.png" alt="Legal World" />
            <div>
              <strong>Legal World</strong>
              <span>{t.footerTagline}</span>
            </div>
          </div>
          <p className="legal-note">{t.disclaimer}</p>
        </div>
      </footer>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
