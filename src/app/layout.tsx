import '@/styles/globals.css';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        <meta name="google-site-verification" content="DuKMiQVUXng39V3PKaF0IeQ_YtEvV-UekGxwb4DNcLs" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" type="image/x-icon" href="/assets/favicon/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />
        <link rel="preload" href="/assets/fonts/Breton.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/Machine.otf" as="font" type="font/otf" crossOrigin="anonymous" />
      </head>
      <body>
        <div id="root-layout-wrapper">
          {children}
        </div>

        {/* Core Animation and Scrolling Dependencies */}
        <Script src="/js/vendor/gsap.min.js" strategy="beforeInteractive" />
        <Script src="/js/vendor/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="/js/vendor/lenis.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
