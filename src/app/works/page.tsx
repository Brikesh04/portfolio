import { getSettings } from '@/lib/db';
import Script from 'next/script';

export default async function WorksPage() {
  const settings = await getSettings();
  const T = settings.translations?.fr || {};

  return (
    <>
      <link rel="stylesheet" href="/styles/works.css" />

      <div className="intro-overlay" id="intro-overlay"></div>
      <div className="page-title" id="page-title">Work</div>

      <h1 className="sr-only" data-i18n="works.h1">
        {T['works.h1'] || "Projets — Brikesh Vikin, Creative Developer. Découvrez mes réalisations en développement web, animation et design interactif."}
      </h1>

      <a className="back-btn" id="back-btn" href="/" aria-label="Retour à l'accueil">
        <span className="chr-hover" data-chr="Back"></span>
      </a>

      <div className="scroll-hint" id="scroll-hint">Scroll to explore</div>

      <div className="scroll-chevron" id="scroll-chevron">
        <svg viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      <canvas className="ruler" id="ruler-left"></canvas>
      <canvas className="ruler" id="ruler-right"></canvas>
      <div className="counter-wrap" id="counter-wrap">
        <div className="counter-window">
          <div className="counter-strip" id="counter-strip"></div>
        </div>
      </div>

      <div className="cube-viewport" id="cube-viewport">
        <div className="cube-scene">
          <div className="cube" id="cube">
            <div className="cube-face" data-face="0"></div>
            <div className="cube-face" data-face="1"></div>
            <div className="cube-face" data-face="2"></div>
            <div className="cube-face" data-face="3"></div>
          </div>
        </div>
      </div>

      <Script src="/js/i18n.js" strategy="afterInteractive" />
      <Script src="/js/works.js" strategy="afterInteractive" />
    </>
  );
}
