import { getSettings } from '@/lib/db';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const settings = await getSettings();

  const email = settings.email || 'brikeshvikin13@gmail.com';
  const linkedinUrl = settings.linkedin_url || 'https://www.linkedin.com/in/brikesh-vikin-gowrish/';
  const githubUrl = settings.github_url || 'https://github.com/Brikesh04';

  return (
    <>
      <link rel="stylesheet" href="/styles/contact.css" />

      <div className="info-canvas" id="contact-canvas"></div>
      <div className="info-vignette"></div>

      <div className="intro-overlay" id="intro-overlay"></div>

      <div className="page-title" id="page-title">Contact</div>

      <a className="back-btn" id="back-btn" href="/" aria-label="Back to home">
        <span className="chr-hover" data-chr="Back"></span>
      </a>

      <main className="info-main contact-main" id="contact-main">
        <section className="info-left contact-left">
          <div className="contact-panel">
            <h2 className="contact-panel-title">Let&apos;s talk about your project.</h2>
            <p className="contact-panel-copy">
              I respond quickly to internship requests, freelance missions and collaborations around interactive web experiences.
            </p>
          </div>
          <div className="info-meta">
            <span className="info-meta-label">Based in</span>
            <span className="info-meta-value">Passau, Germany</span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label">Status</span>
            <span className="info-meta-value">Full-Stack Developer / Freelance</span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label">Avg. response</span>
            <span className="info-meta-value">48h</span>
          </div>
        </section>

        <section className="info-right contact-right">
          <div className="info-headline">
            <span className="info-eyebrow">Contact</span>
            <h1 className="info-name">Let&apos;s build together.</h1>
            <p className="info-role">Creative developer, focused on animation, interaction, and tailor-made web experiences.</p>
          </div>

          <p className="info-desc">
            If you have a project in mind, an ambitious idea, I&apos;d be glad to discuss it with you and explore a potential collaboration.
          </p>

          <div className="contact-links">
            <div className="skill-col">
              <div className="skill-col-title">Shortcuts</div>
              <ul>
                <li><a className="contact-link" href={`mailto:${email}`}>Direct email</a></li>
                <li><a className="contact-link" href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a className="contact-link" href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title">Brief format</div>
              <ul>
                <li>Product goal</li>
                <li>Target deadline</li>
                <li>Tech stack</li>
                <li>Expected deliverables</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <div className="info-bottom" id="contact-bottom">
        <a className="info-mail chr-hover" data-chr={email} href={`mailto:${email}`}></a>
        <span className="info-version">AVAILABLE 2026</span>
      </div>

      <Script src="/js/i18n.js" strategy="afterInteractive" />
      <Script src="/js/core-renderer.js" strategy="afterInteractive" />
      <Script src="/js/hero-project.js" strategy="afterInteractive" />
      <Script src="/js/contact.js" strategy="afterInteractive" />
    </>
  );
}
