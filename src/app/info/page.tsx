import { getSettings } from '@/lib/db';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

export default async function InfoPage() {
  const settings = await getSettings();

  const email = settings.email || 'brikeshvikin13@gmail.com';
  const firstName = 'Brikesh';
  const lastName = 'Vikin';
  const photoUrl = settings.photo_url || '/assets/images/profile/me.jpg';

  return (
    <>
      <link rel="stylesheet" href="/styles/info.css" />

      <div className="info-canvas" id="info-canvas"></div>
      <div className="info-vignette"></div>

      <div className="intro-overlay" id="intro-overlay"></div>

      <div className="page-title" id="page-title">Info</div>

      <a className="back-btn" id="back-btn" href="/" aria-label="Back to home">
        <span className="chr-hover" data-chr="Back"></span>
      </a>

      <main className="info-main" id="info-main">
        <section className="info-left">
          <div className="info-photo-wrap">
            <img className="info-photo" src={photoUrl} alt={`${firstName} ${lastName}`} decoding="async" />
            <span className="frame-corner tl"></span>
            <span className="frame-corner tr"></span>
            <span className="frame-corner bl"></span>
            <span className="frame-corner br"></span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label">Based in</span>
            <span className="info-meta-value">Passau, Germany</span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label">Status</span>
            <span className="info-meta-value">Seeking an internship</span>
          </div>
        </section>

        <section className="info-right">
          <div className="info-headline">
            <span className="info-eyebrow">About</span>
            <h1 className="info-name">{firstName} {lastName}.</h1>
            <p className="info-role">Creative developer &amp; Full-Stack Developer, specialized in web development.</p>
          </div>

          <p
            className="info-desc"
            dangerouslySetInnerHTML={{ __html: 'I craft tailor-made web experiences where technical precision meets emotion. Passionate about animation, interaction and <span class="other-accent">detail</span>, I always seek the symbiosis between art and information.' }}
          />

          <div className="info-skills">
            <div className="skill-col">
              <div className="skill-col-title">Frontend</div>
              <ul>
                <li>React.js</li>
                <li>React Native</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>NativeWind</li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title">Backend</div>
              <ul>
                <li>Node.js · Express</li>
                <li>Python · Flask</li>
                <li>Java · SQL</li>
                <li>Prisma ORM</li>
                <li>REST APIs</li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title">Databases</div>
              <ul>
                <li>PostgreSQL</li>
                <li>Supabase</li>
                <li>SQLite</li>
                <li>Relational Design</li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title">Cloud &amp; DevOps</div>
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
        <a className="info-mail chr-hover" data-chr={email} href={`mailto:${email}`}></a>
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
