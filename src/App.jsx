import React, { useEffect, useState } from "react";
import { COPY } from "./copy.js";
import { PORTFOLIO_CONTENT } from "./content.js";

const EMAIL = "matsouzaleao@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/matheus-leao-br/";

function Header({ language, copy, onLanguageChange }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Matheus Leão, home">
        <span className="brand-mark" aria-hidden="true"><img src="/images/profile-photo.jpg" alt="" /></span>
        <span className="brand-name">MATHEUS LEÃO</span>
      </a>

      <nav className="primary-nav" aria-label={copy.navigation}>
        <a href="#resume">{copy.navResume}</a>
        <a href="#blog">{copy.navBlog}</a>
        <a href="#services">{copy.navServices}</a>
        <a href="#contact">{copy.navContact}</a>
      </nav>

      <div className="header-actions">
        <div className="language-switch" role="group" aria-label={copy.languageLabel}>
          {["en", "pt"].map((locale) => (
            <span className="language-option" key={locale}>
              {locale !== "en" && <span aria-hidden="true">/</span>}
              <button
                type="button"
                className={`language-button${language === locale ? " is-active" : ""}`}
                aria-pressed={language === locale}
                onClick={() => onLanguageChange(locale)}
              >
                {locale.toUpperCase()}
              </button>
            </span>
          ))}
        </div>
        <a className="header-cta" href="#contact"><span>{copy.headerCta}</span><span aria-hidden="true">↗</span></a>
      </div>
    </header>
  );
}

function Hero({ copy }) {
  return (
    <section className="hero section-shell" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /><span>{copy.heroEyebrow}</span></p>
        <h1 id="hero-title">{copy.heroTitle}</h1>
        <p className="hero-lede">{copy.heroLede}</p>
        <p className="hero-focus">{copy.heroFocus}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#resume"><span>{copy.heroPrimary}</span><span aria-hidden="true">↘</span></a>
          <a className="button button-quiet" href="#services">{copy.heroSecondary}</a>
        </div>
        <div className="availability" aria-label={copy.workPreferences}>
          <span className="availability-icon" aria-hidden="true">⌖</span>
          <span>{copy.availability}</span>
        </div>
      </div>

      <aside className="hero-card" aria-label={copy.atGlance}>
        <div className="hero-card-top"><span className="card-kicker">{copy.atGlance}</span><span className="card-index">01 / 04</span></div>
        <p className="hero-card-statement">{copy.heroCardStatement}</p>
        <div className="hero-card-divider" />
        <div className="hero-stat-row">
          <span className="hero-stat-number">9<span>+</span></span>
          <span className="hero-stat-label">{copy.yearsLabel}</span>
        </div>
        <div className="hero-card-bottom">
          <span className="mini-avatar" aria-hidden="true">ML</span>
          <span><strong>{copy.currentRole}</strong><small>Aya Healthcare · {copy.current}</small></span>
          <span className="current-indicator" aria-hidden="true" />
        </div>
      </aside>
      <div className="hero-index" aria-hidden="true">01 — 04</div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, intro, titleId }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow section-eyebrow">{eyebrow}</p>
        <h2 id={titleId}>{title}</h2>
      </div>
      <p className="section-intro">{intro}</p>
    </div>
  );
}

function ImpactGrid({ items, label }) {
  return (
    <div className="impact-grid" aria-label={label}>
      {items.map((item, index) => (
        <article className={`impact-card impact-card-${index + 1}`} key={item.label}>
          <strong>{item.value}</strong><span>{item.label}</span>
        </article>
      ))}
    </div>
  );
}

function ExperienceList({ items, copy }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article className={`timeline-item${item.current ? " is-current" : ""}`} key={`${item.company}-${item.role}`}>
          <div className="timeline-marker" aria-hidden="true" />
          <div className="timeline-content">
            <div className="timeline-meta"><span>{item.period}</span>{item.current && <span className="current-tag">{copy.present}</span>}</div>
            <h4>{item.role}</h4>
            <p className="timeline-company">{item.company} <span>·</span> {item.location}</p>
            <p className="timeline-summary">{item.summary}</p>
            {item.details.length > 0 && <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
          </div>
        </article>
      ))}
    </div>
  );
}

function TeachingSection({ copy, content }) {
  return (
    <section className="teaching-block" aria-labelledby="teaching-title">
      <div className="subsection-heading"><h3 id="teaching-title">{copy.teachingTitle}</h3><span className="subsection-rule" /></div>
      <div className="teaching-grid">
        {content.teaching.map((item) => (
          <article className="teaching-card" key={item.organization}>
            <span className="teaching-role">{item.role}</span>
            <h4>{item.organization}</h4>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      <div className="teaching-topics">
        <h4>{copy.teachingTopicsLabel}</h4>
        <ul>{content.teachingTopics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
      </div>
    </section>
  );
}

function Resume({ copy, content }) {
  return (
    <section className="section-shell resume-section" id="resume" aria-labelledby="resume-title">
      <SectionHeading eyebrow={copy.resumeEyebrow} title={copy.resumeTitle} intro={copy.resumeIntro} titleId="resume-title" />
      <ImpactGrid items={content.impact} label={copy.impactLabel} />

      <div className="resume-grid">
        <div className="resume-main">
          <div className="subsection-heading"><h3>{copy.experienceTitle}</h3><span className="subsection-rule" /><span className="subsection-count">04</span></div>
          <ExperienceList items={content.experience} copy={copy} />
          <TeachingSection copy={copy} content={content} />
        </div>

        <aside className="resume-aside">
          <div className="aside-block">
            <div className="subsection-heading subsection-heading-small"><h3>{copy.educationTitle}</h3><span className="subsection-rule" /></div>
            <div className="education-list">
              {content.education.map((item) => (
                <article className="education-item" key={item.title}>
                  <span className="education-period">{item.period}</span>
                  <h4>{item.title}</h4>
                  {item.school && <p>{item.school}</p>}
                </article>
              ))}
            </div>
          </div>
          <div className="aside-block skills-block">
            <div className="subsection-heading subsection-heading-small"><h3>{copy.toolkitTitle}</h3><span className="subsection-rule" /></div>
            <div className="toolkit-list">
              {content.toolkit.map((item) => <div className="toolkit-item" key={item.title}><h4>{item.title}</h4><p>{item.items}</p></div>)}
            </div>
          </div>
          <div className="aside-note">
            <span className="aside-note-icon" aria-hidden="true">↗</span>
            <p>{copy.linkedinPrompt}<br /><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Blog({ copy, posts }) {
  return (
    <section className="blog-section" id="blog" aria-labelledby="blog-title">
      <div className="section-shell blog-inner">
        <SectionHeading eyebrow={copy.blogEyebrow} title={copy.blogTitle} intro={copy.blogIntro} titleId="blog-title" />
        <div className="blog-layout">
          <div className="blog-list" aria-live="polite">
            {posts.length === 0 ? (
              <article className="blog-empty"><span className="blog-empty-icon" aria-hidden="true">✳</span><h3>{copy.blogEmptyTitle}</h3><p>{copy.blogEmptyText}</p></article>
            ) : posts.map((post) => (
              <article className="blog-entry" key={`${post.url}-${post.title}`}>
                <span className="blog-entry-date">{post.date || ""}</span>
                <div><p className="blog-entry-language">{post.language.toUpperCase()}</p><h3>{post.title}</h3><p>{post.description}</p></div>
                <a className="text-link" href={post.url} target="_blank" rel="noreferrer">{copy.blogRead} <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
          <aside className="blog-aside">
            <span className="blog-aside-mark" aria-hidden="true">↗</span>
            <p className="blog-aside-label">{copy.elsewhereLabel}</p>
            <h3>{copy.elsewhereTitle}</h3>
            <a className="text-link" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Services({ copy, services }) {
  return (
    <section className="section-shell services-section" id="services" aria-labelledby="services-title">
      <SectionHeading eyebrow={copy.servicesEyebrow} title={copy.servicesTitle} intro={copy.servicesIntro} titleId="services-title" />
      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.number}>
            <div className="service-card-top"><span className="service-number">{service.number}</span><span className="service-audience">{service.audience}</span></div>
            <h3>{service.title}</h3><p className="service-description">{service.description}</p>
            <ul className="service-topics">{service.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
            <a className="service-link" href={`mailto:${EMAIL}?subject=${encodeURIComponent(service.subject)}`}>{copy.learnMore}<span aria-hidden="true">↗</span></a>
          </article>
        ))}
      </div>
      <div className="services-footnote">
        <span className="availability-icon" aria-hidden="true">✳</span>
        <span>{copy.servicesFootnote}</span>
        <a href="#contact" className="text-link"><span>{copy.startConversation}</span><span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}

function Contact({ copy, language }) {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = language === "pt" ? "Contato pelo portfólio" : "Portfolio inquiry";
    const nameLabel = language === "pt" ? "Nome" : "Name";
    const body = `${nameLabel}: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(copy.formStatus);
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-shell contact-inner">
        <div className="contact-copy">
          <p className="eyebrow section-eyebrow">{copy.contactEyebrow}</p>
          <h2 id="contact-title">{copy.contactTitle}</h2>
          <p className="contact-lede">{copy.contactLede}</p>
          <a className="email-link" href={`mailto:${EMAIL}`}>{EMAIL} <span aria-hidden="true">↗</span></a>
          <p className="contact-location">{copy.contactLocation}</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name">{copy.formNameLabel}</label>
          <input id="contact-name" name="name" autoComplete="name" required placeholder={copy.formNamePlaceholder} />
          <label htmlFor="contact-email">{copy.formEmailLabel}</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder={copy.formEmailPlaceholder} />
          <label htmlFor="contact-message">{copy.formMessageLabel}</label>
          <textarea id="contact-message" name="message" rows="4" required placeholder={copy.formMessagePlaceholder} />
          <button className="button button-primary form-submit" type="submit"><span>{copy.formSubmit}</span><span aria-hidden="true">↗</span></button>
          <p className="form-note">{copy.formNote}</p>
          <p className="form-status" role="status" aria-live="polite">{status}</p>
        </form>
      </div>
    </section>
  );
}

export default function App() {
  const [language, setLanguage] = useState(() => {
    try {
      const savedLanguage = localStorage.getItem("portfolio-language");
      return savedLanguage === "pt" || savedLanguage === "en" ? savedLanguage : "en";
    } catch {
      return "en";
    }
  });
  const copy = COPY[language];
  const content = PORTFOLIO_CONTENT[language];

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = language === "pt" ? "Matheus Leão — Engenheiro de Quality Assurance" : "Matheus Leão — Quality Assurance Engineer";
    try { localStorage.setItem("portfolio-language", language); } catch { /* language still changes for this visit */ }
  }, [language]);

  return (
    <>
      <a className="skip-link" href="#main">{copy.skipLink}</a>
      <Header language={language} copy={copy} onLanguageChange={setLanguage} />
      <main id="main">
        <Hero copy={copy} />
        <Resume copy={copy} content={content} />
        <Blog copy={copy} posts={content.blog} />
        <Services copy={copy} services={content.services} />
        <Contact copy={copy} language={language} />
      </main>
      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <a className="brand footer-brand" href="#home"><span className="brand-mark" aria-hidden="true"><img src="/images/profile-photo.jpg" alt="" /></span><span className="brand-name">MATHEUS LEÃO</span></a>
          <p>{copy.footerLine}</p>
          <a className="back-to-top" href="#home"><span>{copy.backToTop}</span> <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}
