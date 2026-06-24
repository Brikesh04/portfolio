import { getSettings } from '@/lib/db';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const settings = await getSettings();
  const T = settings.translations?.fr || {};

  return (
    <>
      <link rel="stylesheet" href="/styles/index.css" />

      <div className="intro-bg" id="intro-bg"></div>

      <div className="name-layer" id="name-layer">
        <div className="preloader-content" id="preloader-content">
          <div id="preloader-logo">B</div>
          <span id="preloader-luke">rikesh</span>
          <span id="preloader-baffait"> Vikin</span>
          <span id="preloader-dot">.</span>
        </div>
      </div>

      <div className="transition-panel" id="transition-panel">
        <div className="t-panel-dark" id="t-panel-dark"></div>
        <div className="t-panel-red" id="t-panel-red"></div>
      </div>

      <div className="scroll-wrap" id="scroll-wrap">
        <section className="hero" id="hero">
          <h1 className="sr-only" data-i18n="index.h1">
            {T['index.h1'] || "Brikesh Vikin — Creative Developer, étudiant en informatique à Chennai, spécialisé en développement web, animation et design interactif."}
          </h1>
          <div className="hero-canvas" id="hero-canvas"></div>

          <div className="hero-content">
            <div 
              className="hero-tagline" 
              id="hero-tagline" 
              data-i18n="index.hero.tagline"
              dangerouslySetInnerHTML={{ __html: T['index.hero.tagline'] || 'Créatif discret, <span class="other-accent">je donne vie</span> aux idées,<br> entre mouvement, détail et douceur.' }}
            />

            <div className="hero-line" id="hero-line"></div>
            <div className="hero-bar" id="hero-bar">
              <div className="hero-bar-left">
                <span className="chr-hover" data-chr="🡺V3.0"></span>
              </div>
              <nav className="hero-bar-center" aria-label="Réseaux sociaux">
                <a className="chr-hover" data-chr="Behance" href="https://www.behance.net/brikesh" target="_blank" rel="noopener noreferrer" aria-label="Behance"></a>
                <span className="sep" aria-hidden="true">/</span>
                <a className="chr-hover" data-chr="LinkedIn" href={settings.linkedin_url || "https://www.linkedin.com/in/brikesh-vikin/"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"></a>
                <span className="sep" aria-hidden="true">/</span>
                <a className="chr-hover" data-chr="GitHub" href={settings.github_url || "https://github.com/BrikeshG"} target="_blank" rel="noopener noreferrer" aria-label="GitHub"></a>
              </nav>
              <nav className="hero-bar-right" aria-label="Navigation principale">
                <a className="chr-hover" data-chr="Work" href="/works" data-page-link="work" aria-label="Work"></a>
                <a className="chr-hover" data-chr="Info" href="/info" data-page-link="info" aria-label="Info"></a>
                <a className="chr-hover" data-chr="Contact" href="/contact" data-page-link="contact" aria-label="Contact"></a>
              </nav>
            </div>
          </div>
        </section>
      </div>

      <div className="reveal-image-wrap" id="reveal-image-wrap">
        <canvas className="reveal-image reveal-seq" id="reveal-canvas"></canvas>
        <div className="reveal-frame reveal-seq">
          <span className="reveal-corner tl"></span>
          <span className="reveal-corner tr"></span>
          <span className="reveal-corner bl"></span>
          <span className="reveal-corner br"></span>
        </div>
        <div className="reveal-overlay" id="reveal-overlay"></div>
        <p className="reveal-phrase" id="reveal-phrase">Basically, I make websites.</p>
      </div>

      <section className="section-after" id="section-after">
        <div className="about" id="about">
          <div 
            className="about-text" 
            id="about-text" 
            data-i18n="index.about.text"
            dangerouslySetInnerHTML={{ __html: T['index.about.text'] || 'En tant que<span class="other-accent"> creative developer</span>, je conçois des expériences web sur mesure , en mêlant précision technique et <span class="other-accent">emotion</span>.' }}
          />
          <div 
            className="about-sub" 
            id="about-sub" 
            data-i18n="index.about.sub"
            dangerouslySetInnerHTML={{ __html: T['index.about.sub'] || "Je m'appelle Brikesh. Créatif passionné, je suis étudiant en informatique à Chennai, et je produis des expériences digitales mémorables, toujours à la recherche d'une symbiose entre l'art et l'information." }}
          />
          <div className="about-btn">
            <a className="chr-hover" data-chr="Info" href="/info" data-page-link="info" aria-label="En savoir plus sur moi"></a>
          </div>
          <div className="about-version">
            <svg style={{ width: '1.25em', height: '1.25em', verticalAlign: '-0.25em' }} viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/>
            </svg>V3.0
          </div>
          <div className="about-photo-wrap" id="about-photo-wrap">
            <img className="about-photo" src="/assets/images/profile/me.avif" alt="Brikesh Vikin" decoding="async" width="2500" height="3001" />
          </div>
        </div>

        <div className="projects" id="projects">
          <svg className="fluid-line-svg" id="fluid-line-svg" viewBox="0 0 1400 1400" preserveAspectRatio="xMidYMid slice">
            <path className="fluid-line" id="fluid-line" d="
              M -80,0
              C 300,-20  600,150  540,400
              C 490,650   0,655    300,1050
              C 600,1385 650,1250 850,1200
              C 1050,1150 1350,1250 1540,1300
            " />
          </svg>
          <div className="projects-inner">
            <div className="projects-list" id="projects-list">
              <div className="proj-item" data-id="food-delivery" data-img="/food_delivery.png" data-date="09 2024">Food Delivery Platform</div>
              <div className="proj-item" data-id="sports-club" data-img="/sports_club.png" data-date="06 2024">TuS Cricket Pfarrkirchen</div>
              <div className="proj-item" data-id="durr-cts" data-img="/assets/images/projects/Covers/CyberDiag.avif" data-date="11 2024">Inspection Data Manager</div>
              <div className="proj-item" data-id="healthcare-nlp" data-img="/healthcare_nlp.png" data-date="05 2023">Healthcare NLP Chatbot</div>
              <div className="proj-item" data-id="aws-infra" data-img="/aws_infra.png" data-date="11 2025">AWS Cloud Infrastructure</div>
            </div>
          </div>
        </div>
      </section>

      <section className="circle-gallery" id="circle-gallery">
        <div className="circle-gallery-pin" id="circle-gallery-pin">
          <img className="cg-img" src="/food_delivery.png" alt="Food Delivery Platform" width="3000" height="2250" />
          <img className="cg-img" src="/sports_club.png" alt="TuS Cricket Pfarrkirchen" width="3000" height="2250" />
          <img className="cg-img" src="/assets/images/projects/Covers/CyberDiag.avif" alt="Inspection Data Manager" width="1333" height="1000" />
          <img className="cg-img" src="/healthcare_nlp.png" alt="Healthcare NLP Chatbot" width="3000" height="2250" />
          <img className="cg-img" src="/aws_infra.png" alt="AWS Cloud Infrastructure" width="3000" height="2250" />
          <p 
            className="cg-phrase" 
            id="cg-phrase" 
            data-i18n="index.cg.phrase"
            dangerouslySetInnerHTML={{ __html: T['index.cg.phrase'] || 'Chaque projet est une occasion d\'<span class="other-accent">apprendre</span>, d\'<span class="other-accent">expérimenter</span> et de repousser mes limites.' }}
          />
        </div>
      </section>

      <section className="skills" id="skills">
        <div className="skills-inner">
          <div className="skills-left">
            <div className="skills-subtitle" data-i18n="index.skills.subtitle">Compétences</div>
            <div className="skills-text" data-i18n="index.skills.text">
              {T['index.skills.text'] || "Étudiant en BUT Informatique à Chennai, spécialisé en développement backend, passionné par le développement et le design web."}
            </div>
            <div className="skills-separator"></div>
            <div>
              <a className="skills-contact chr-hover" data-chr="Contact me🞣" href="/contact" data-page-link="contact" aria-label="Me contacter"></a>
            </div>
            <div className="skills-arrow" id="skills-arrow">
              <svg style={{ width: '1.25em', height: '1.25em', verticalAlign: '-0.25em' }} viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/>
              </svg>
            </div>
          </div>
          <div className="skills-right" id="skills-right">
            <div className="skill-group open" data-group="frontend">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.frontend">Frontend</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>React.js</li>
                  <li>React Native</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>NativeWind</li>
                  <li>HTML5 & CSS3</li>
                </ul>
              </div>
            </div>
            <div className="skill-group" data-group="animation">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.animation">Backend</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>Flask</li>
                  <li>REST APIs</li>
                  <li>Prisma ORM</li>
                  <li>JWT Auth</li>
                  <li>Zod Validation</li>
                </ul>
              </div>
            </div>
            <div className="skill-group" data-group="backend">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.backend">Databases</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>PostgreSQL</li>
                  <li>Supabase</li>
                  <li>SQLite</li>
                  <li>Relational Design</li>
                </ul>
              </div>
            </div>
            <div className="skill-group" data-group="database">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.database">Cloud & DevOps</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>AWS (EC2, SG)</li>
                  <li>Firebase</li>
                  <li>Netlify</li>
                  <li>Render</li>
                  <li>CI/CD Pipelines</li>
                  <li>Git</li>
                </ul>
              </div>
            </div>
            <div className="skill-group" data-group="devops">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.devops">AI & Tools</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>NLP (Natural Language)</li>
                  <li>Claude / OpenAI APIs</li>
                  <li>Claude Code</li>
                </ul>
              </div>
            </div>
            <div className="skill-group" data-group="sysadmin">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.security">Core Concepts</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>Data Structures</li>
                  <li>Algorithms</li>
                  <li>OOP</li>
                  <li>Client-Server</li>
                </ul>
              </div>
            </div>
            <div className="skill-group" data-group="design">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.design">Languages</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>JavaScript (ES6+)</li>
                  <li>Python</li>
                  <li>Java</li>
                  <li>SQL</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="contact-bg" id="contact-bg"></div>
      <div className="contact-blob-wrap" id="contact-blob-wrap">
        <div className="contact-blob" id="contact-blob"></div>
      </div>
      <section className="contact" id="contact">
        <div className="contact-pin" id="contact-pin">
          <div className="contact-title" id="contact-title">Contact</div>

          <div className="contact-dispo" id="contact-dispo">
            <p 
              data-i18n="index.contact.dispo1"
              dangerouslySetInnerHTML={{ __html: T['index.contact.dispo1'] || 'À la recherche d\'une <span class="other-accent">alternance</span> à partir de septembre. Motivé à rejoindre une équipe innovante et à contribuer à des projets ambitieux.' }}
            />
          </div>

          <div className="contact-frame" id="contact-frame">
            <img className="contact-frame-img" id="contact-frame-img" src="/assets/images/art/Untitled2.png" alt="" loading="lazy" decoding="async" />
            <span className="frame-corner tl"></span>
            <span className="frame-corner tr"></span>
            <span className="frame-corner bl"></span>
            <span className="frame-corner br"></span>
          </div>

          <div className="contact-dispo" id="contact-dispo-2">
            <p 
              data-i18n="index.contact.dispo2"
              dangerouslySetInnerHTML={{ __html: T['index.contact.dispo2'] || 'Je suis disponible pour <span class="other-accent">des missions en freelance</span> partout dans le monde, sur <span class="other-accent">vos projets ambitieux</span> et des collaborations internationales.' }}
            />
          </div>

          <div className="contact-frame" id="contact-frame-2">
            <img className="contact-frame-img" id="contact-frame-img-2" src="/assets/images/art/Untitled1.png" alt="" loading="lazy" decoding="async" />
            <span className="frame-corner tl"></span>
            <span className="frame-corner tr"></span>
            <span className="frame-corner bl"></span>
            <span className="frame-corner br"></span>
          </div>

          <div className="contact-bottom" id="contact-bottom">
            <nav className="contact-socials" id="contact-socials" aria-label="Réseaux sociaux">
              <a className="chr-hover" data-chr-contact="GitHub" href={settings.github_url || "https://github.com/BrikeshG"} target="_blank" rel="noopener noreferrer" aria-label="GitHub"></a>
              <a className="chr-hover" data-chr-contact="LinkedIn" href={settings.linkedin_url || "https://www.linkedin.com/in/brikesh-vikin/"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"></a>
              <a className="chr-hover" data-chr-contact="Behance" href="https://www.behance.net/brikesh" target="_blank" rel="noopener noreferrer" aria-label="Behance"></a>
            </nav>
            <a className="contact-mail" id="contact-mail" href={`mailto:${settings.email}`}>{settings.email}</a>
          </div>
        </div>
      </section>

      <div className="footer-transition" id="footer-transition"></div>
      <footer className="footer" id="footer">
        <div className="footer-content" id="footer-content">
          <div className="footer-top">
            <div className="footer-top-col">
              <a className="chr-hover footer-mail" data-chr-footer={settings.email} href={`mailto:${settings.email}`} aria-label="Envoyer un mail"></a>
              <span className="chr-hover footer-date" data-chr-footer="© 2026"></span>
            </div>
            <nav className="footer-top-col" aria-label="Réseaux sociaux">
              <a className="chr-hover" data-chr-footer="GitHub" href={settings.github_url || "https://github.com/BrikeshG"} target="_blank" rel="noopener noreferrer" aria-label="GitHub"></a>
              <a className="chr-hover" data-chr-footer="LinkedIn" href={settings.linkedin_url || "https://www.linkedin.com/in/brikesh-vikin/"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"></a>
              <a className="chr-hover" data-chr-footer="Behance" href="https://www.behance.net/brikesh" target="_blank" rel="noopener noreferrer" aria-label="Behance"></a>
            </nav>
            <nav className="footer-top-col" aria-label="Navigation pied de page">
              <a className="chr-hover" data-chr-footer="Work" href="/works" data-page-link="work" aria-label="Work"></a>
              <a className="chr-hover" data-chr-footer="Info" href="/info" data-page-link="info" aria-label="Info"></a>
              <a className="chr-hover" data-chr-footer="Contact" href="/contact" data-page-link="contact" aria-label="Contact"></a>
            </nav>
          </div>
          <div className="footer-ascii-wrap">
            <div className="footer-ascii left">
              <pre id="ascii-left"></pre>
            </div>
            <div className="footer-ascii right">
              <pre id="ascii-right"></pre>
            </div>
          </div>
          <div className="footer-name">
            <span className="footer-name-luke">
              <span className="first-letter">{settings.first_name ? settings.first_name[0] : 'B'}</span>
              {settings.first_name ? settings.first_name.slice(1) : 'rikesh'}
            </span>
            <span className="footer-name-baffait-wrap">
              <span className="footer-name-baffait">{settings.last_name || 'Vikin'}</span>
              <span className="footer-name-dot">.</span>
            </span>
          </div>
        </div>
      </footer>

      <div className="proj-preview" id="proj-preview">
        <div className="proj-card" id="proj-card">
          <div className="proj-meta">
            <span className="proj-date" id="proj-date">01 2025</span>
            <span className="proj-label">Preview</span>
          </div>
          <img id="proj-cover" src="/assets/images/projects/Covers/CyberDiag.avif" alt="" width="1333" height="1000" />
        </div>
      </div>
      <div className="proj-cursor" id="proj-cursor">See project</div>

      <div className="page-fade" id="page-fade"></div>
      <div className="flying-title" id="flying-title"></div>
      <div className="work-transition-overlay" id="work-transition-overlay"></div>
      <div className="work-flying-text" id="work-flying-text">Work</div>

      <section className="project-detail" id="project-detail">
        <div className="detail-back chr-hover" id="detail-back" data-chr="🡼RETOUR" data-i18n-attr="data-chr:index.detail.back"></div>
        <div className="detail-info">
          <div className="detail-title-wrap" id="detail-title-wrap">
            <h1 className="detail-title" id="detail-title"></h1>
            <span className="detail-year" id="detail-year"></span>
          </div>
          <p className="detail-desc" id="detail-desc"></p>
          <div className="detail-tags" id="detail-tags"></div>
        </div>
        <div className="detail-gallery-wrap" id="detail-gallery-wrap">
          <div className="detail-thumbs" id="detail-thumbs">
            <div className="detail-thumbs-inner" id="detail-thumbs-inner"></div>
          </div>
          <div className="detail-selected" id="detail-selected"></div>
        </div>
      </section>

      <div className="scroll-pct" id="scroll-pct">(0)</div>
      <div className="scroll-timeline" id="scroll-timeline">
        <span className="st-label" id="st-label"></span>
        <div className="st-bar" id="st-bar"></div>
      </div>

      {/* Page Specific Scripts */}
      <Script src="/js/i18n.js" strategy="afterInteractive" />
      <Script src="/js/core-renderer.js" strategy="afterInteractive" />
      <Script src="/js/hero-project.js" strategy="afterInteractive" />
      <Script src="/js/index.js" strategy="afterInteractive" />
    </>
  );
}
