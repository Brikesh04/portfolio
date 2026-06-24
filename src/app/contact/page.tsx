import { getSettings } from '@/lib/db';
import Script from 'next/script';

export default async function ContactPage() {
  const settings = await getSettings();
  const T = settings.translations?.fr || {};

  return (
    <>
      <link rel="stylesheet" href="/styles/contact.css" />

      <div className="info-canvas" id="contact-canvas"></div>
      <div className="info-vignette"></div>

      <div className="intro-overlay" id="intro-overlay"></div>

      <div className="page-title" id="page-title">Contact</div>

      <a className="back-btn" id="back-btn" href="/" aria-label="Retour à l'accueil">
        <span className="chr-hover" data-chr="Back"></span>
      </a>

      <main className="info-main contact-main" id="contact-main">
        <section className="info-left contact-left">
          <div className="contact-panel">
            <h2 className="contact-panel-title" data-i18n="contact.panel.title">{T['contact.panel.title'] || 'Parlons de votre projet.'}</h2>
            <p className="contact-panel-copy" data-i18n="contact.panel.copy">
              {T['contact.panel.copy'] || "Je reponds rapidement aux demandes d'alternance, de mission freelance et aux collaborations autour d'experiences web interactives."}
            </p>
          </div>
          <div className="info-meta">
            <span className="info-meta-label" data-i18n="contact.meta.base">{T['contact.meta.base'] || 'Base'}</span>
            <span className="info-meta-value" data-i18n="contact.meta.base.value">{T['contact.meta.base.value'] || 'Chennai, India'}</span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label" data-i18n="contact.meta.status">{T['contact.meta.status'] || 'Statut'}</span>
            <span className="info-meta-value" data-i18n="contact.meta.status.value">{T['contact.meta.status.value'] || 'Étudiant / Freelance'}</span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label" data-i18n="contact.meta.delay">{T['contact.meta.delay'] || 'Delai moyen'}</span>
            <span className="info-meta-value" data-i18n="contact.meta.delay.value">{T['contact.meta.delay.value'] || '48h'}</span>
          </div>
        </section>

        <section className="info-right contact-right">
          <div className="info-headline">
            <span className="info-eyebrow" data-i18n="contact.eyebrow">{T['contact.eyebrow'] || 'Contact'}</span>
            <h1 className="info-name">Let&rsquo;s build together.</h1>
            <p className="info-role" data-i18n="contact.role">{T['contact.role'] || 'Creative developer, axé animation, interaction, et experiences web sur mesure.'}</p>
          </div>

          <p className="info-desc" data-i18n="contact.desc">
            {T['contact.desc'] || 'Si vous avez un projet en tête, une idée ambitieuse, je serais ravi d\'échanger avec vous afin d\'en discuter et d\'explorer une potentielle collaboration.'}
          </p>

          <div className="contact-links">
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="contact.shortcuts">{T['contact.shortcuts'] || 'Raccourcis'}</div>
              <ul>
                <li><a className="contact-link" href={`mailto:${settings.email}`} data-i18n="contact.maildirect">{T['contact.maildirect'] || 'Mail direct'}</a></li>
                <li><a className="contact-link" href={settings.linkedin_url || "https://www.linkedin.com/in/brikesh-vikin/"} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a className="contact-link" href={settings.github_url || "https://github.com/BrikeshG"} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a className="contact-link" href="https://www.behance.net/brikesh" target="_blank" rel="noopener noreferrer">Behance</a></li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="contact.brief">{T['contact.brief'] || 'Format de brief'}</div>
              <ul>
                <li data-i18n="contact.brief.product">{T['contact.brief.product'] || 'Objectif produit'}</li>
                <li data-i18n="contact.brief.deadline">{T['contact.brief.deadline'] || 'Deadline visee'}</li>
                <li data-i18n="contact.brief.stack">{T['contact.brief.stack'] || 'Stack technique'}</li>
                <li data-i18n="contact.brief.deliverables">{T['contact.brief.deliverables'] || 'Livrables attendus'}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <div className="info-bottom" id="contact-bottom">
        <a className="info-mail chr-hover" data-chr={settings.email} href={`mailto:${settings.email}`}></a>
        <span className="info-version">AVAILABLE 2026</span>
      </div>

      <Script src="/js/i18n.js" strategy="afterInteractive" />
      <Script src="/js/core-renderer.js" strategy="afterInteractive" />
      <Script src="/js/hero-project.js" strategy="afterInteractive" />
      <Script src="/js/contact.js" strategy="afterInteractive" />
    </>
  );
}
