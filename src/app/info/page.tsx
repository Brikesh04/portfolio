import { getSettings } from '@/lib/db';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

export default async function InfoPage() {
  const settings = await getSettings();
  const T = settings.translations?.fr || {};

  return (
    <>
      <link rel="stylesheet" href="/styles/info.css" />

      <div className="info-canvas" id="info-canvas"></div>
      <div className="info-vignette"></div>

      <div className="intro-overlay" id="intro-overlay"></div>

      <div className="page-title" id="page-title">Info</div>

      <a className="back-btn" id="back-btn" href="/" aria-label="Retour à l'accueil">
        <span className="chr-hover" data-chr="Back"></span>
      </a>

      <main className="info-main" id="info-main">
        <section className="info-left">
          <div className="info-photo-wrap">
            <img className="info-photo" src={settings.photo_url || "/assets/images/profile/me.avif"} alt={`${settings.first_name} ${settings.last_name}`} decoding="async" />
            <span className="frame-corner tl"></span>
            <span className="frame-corner tr"></span>
            <span className="frame-corner bl"></span>
            <span className="frame-corner br"></span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label" data-i18n="info.meta.based">{T['info.meta.based'] || 'Basé à'}</span>
            <span className="info-meta-value" data-i18n="info.meta.based.value">{T['info.meta.based.value'] || 'Chennai, India'}</span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label" data-i18n="info.meta.status">{T['info.meta.status'] || 'Statut'}</span>
            <span className="info-meta-value" data-i18n="info.meta.status.value">{T['info.meta.status.value'] || 'En recherche d\'alternance'}</span>
          </div>
        </section>

        <section className="info-right">
          <div className="info-headline">
            <span className="info-eyebrow" data-i18n="info.eyebrow">{T['info.eyebrow'] || 'À propos'}</span>
            <h1 className="info-name">{settings.first_name} {settings.last_name}.</h1>
            <p className="info-role" data-i18n="info.role">{T['info.role'] || 'Creative developer & étudiant en informatique, spécialisé en développement web.'}</p>
          </div>

          <p 
            className="info-desc" 
            data-i18n="info.desc"
            dangerouslySetInnerHTML={{ __html: T['info.desc'] || 'Je conçois des expériences web sur mesure, où la précision technique rencontre l\'émotion. Passionné par l\'animation, l\'interaction et le <span class="other-accent">detail</span>, je cherche toujours la symbiose entre l\'art et l\'information.' }}
          />

          <div className="info-skills">
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="info.skills.frontend">{T['info.skills.frontend'] || 'Frontend'}</div>
              <ul>
                <li>React.js</li>
                <li>React Native</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>NativeWind</li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="info.skills.backend">{T['info.skills.backend'] || 'Backend'}</div>
              <ul>
                <li>Node.js · Express</li>
                <li>Python · Flask</li>
                <li>Java · SQL</li>
                <li>Prisma ORM</li>
                <li>REST APIs</li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="info.skills.animation">{T['info.skills.animation'] || 'Databases'}</div>
              <ul>
                <li>PostgreSQL</li>
                <li>Supabase</li>
                <li>SQLite</li>
                <li>Relational Design</li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="info.skills.security">{T['info.skills.security'] || 'Cloud & DevOps'}</div>
              <ul>
                <li>AWS (EC2, SG)</li>
                <li>Firebase</li>
                <li>Netlify · Render</li>
                <li>CI/CD · Git</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <div className="info-bottom" id="info-bottom">
        <a className="info-mail chr-hover" data-chr={settings.email} href={`mailto:${settings.email}`}></a>
        <span className="info-version">
          <svg style={{ width: '1.25em', height: '1.25em', verticalAlign: '-0.25em' }} viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z" />
          </svg>V3.0
        </span>
      </div>

      <Script src="/js/i18n.js" strategy="afterInteractive" />
      <Script src="/js/core-renderer.js" strategy="afterInteractive" />
      <Script src="/js/hero-project.js" strategy="afterInteractive" />
      <Script src="/js/info.js" strategy="afterInteractive" />
    </>
  );
}
