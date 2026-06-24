// seed_supabase.js
// Pushes the default configuration and works database to your Supabase instance.
// Ensure you have SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local before running!

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables manually from .env.local
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length === 2) {
      const key = parts[0].trim();
      const val = parts[1].trim().replace(/^["']|["']$/g, ''); // remove quotes
      process.env[key] = val;
    }
  });
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be defined in your .env.local file.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const INITIAL_PROJECTS = [
    {
        "id": "cyberdiag",
        "title": "CyberDiag website",
        "desc_en": "Showcase website for the CyberDiag app, presenting its features and benefits, and offering download for easy access.",
        "desc_fr": "Site web de présentation de l'application CyberDiag, pour présenter ses fonctionnalités et ses avantages et proposer le téléchargement afin de faciliter son accès.",
        "category_en": "Website",
        "category_fr": "Site Web",
        "year": "2026",
        "tags": ["Gsap", "Lenis", "Three.js"],
        "img": "assets/images/projects/Covers/backend architectures_web.avif",
        "date": "01 2025",
        "images": [
            "assets/images/projects/CyberDiagWebsite/image1.png",
            "assets/images/projects/CyberDiagWebsite/image2.png",
            "assets/images/projects/CyberDiagWebsite/image3.png"
        ]
    },
    {
        "id": "anima",
        "title": "Anima",
        "desc_en": "Website about animal rights, created to practice web animations with tools like GSAP and Lenis.",
        "desc_fr": "Site web sur la cause animale afin de m'exercer à la création d'animations web avec des outils comme GSAP ou Lenis.",
        "category_en": "Website",
        "category_fr": "Site Web",
        "year": "2026",
        "tags": ["Gsap", "Lenis"],
        "img": "assets/images/projects/Covers/Anima.avif",
        "date": "06 2025",
        "images": [
            "assets/images/projects/Anima/image1.png",
            "assets/images/projects/Anima/image2.png",
            "assets/images/projects/Anima/image3.png"
        ]
    },
    {
        "id": "cyberdiag-app",
        "title": "CyberDiag app",
        "desc_en": "Desktop application designed for SMEs to perform comprehensive cybersecurity diagnostics. Intuitive interface to assess vulnerabilities and provide tailored recommendations.",
        "desc_fr": "Application conçue pour les PME afin de réaliser des diagnostics de développement backend complets. Interface intuitive pour évaluer les vulnérabilités et proposer des recommandations personnalisées.",
        "category_en": "Desktop App",
        "category_fr": "Application Desktop",
        "year": "2026",
        "tags": ["Python", "Gsap", "Three.js"],
        "img": "assets/images/projects/Covers/CyberDiag.avif",
        "date": "09 2025",
        "images": [
            "assets/images/projects/cyberdiag/image1.png",
            "assets/images/projects/cyberdiag/image2.png",
            "assets/images/projects/cyberdiag/image3.png"
        ]
    },
    {
        "id": "zenith",
        "title": "Zenith",
        "desc_en": "Innovative web browser focused on privacy and performance, featuring a built-in ad blocker, optimized tab management, and extensive customization.",
        "desc_fr": "Navigateur web innovant axé sur la confidentialité et la performance, avec bloqueur de publicités intégré, gestion optimisée des onglets et personnalisation poussée.",
        "category_en": "Desktop App",
        "category_fr": "Application Desktop",
        "year": "2026",
        "tags": ["Electron", "JavaScript", "Three.js"],
        "img": "assets/images/projects/Covers/Zenith.avif",
        "date": "11 2025",
        "images": [
            "assets/images/projects/Zenith/image1.png",
            "assets/images/projects/Zenith/image2.png",
            "assets/images/projects/Zenith/image3.png"
        ]
    },
    {
        "id": "skymcdb",
        "title": "SkymcDB",
        "desc_en": "A powerful and intuitive tool designed to manage, organize, and optimize your Minecraft building projects, developed specifically for builders.",
        "desc_fr": "Un outil puissant et intuitif conçu pour gérer, organiser et optimiser vos projets de construction Minecraft, développé spécifiquement pour les builders.",
        "category_en": "Desktop App",
        "category_fr": "Application Desktop",
        "year": "2024",
        "tags": ["Java", "JavaFX", "CSS"],
        "img": "assets/images/projects/Covers/SkymcDB.avif",
        "date": "02 2026",
        "images": [
            "assets/images/projects/skymcdb/image.png",
            "assets/images/projects/skymcdb/image2.png",
            "assets/images/projects/skymcdb/image3.png",
            "assets/images/projects/skymcdb/image4.png"
        ]
    },
    {
        "id": "chromablock",
        "title": "ChromaBlock",
        "desc_en": "Web adaptation of SkymcDB to reach a wider audience, introducing brand new features for Minecraft builders.",
        "desc_fr": "Adaptation web de SkymcDB, pour élargir l'audience, permettant des fonctionnalités inédites dans le domaine du build Minecraft.",
        "category_en": "Web Application",
        "category_fr": "Application Web",
        "year": "2024",
        "tags": ["JavaScript", "HTML", "CSS"],
        "img": "assets/images/projects/Covers/ChromaBlock.avif",
        "date": "03 2026",
        "images": [
            "assets/images/projects/chromablock/image1.png",
            "assets/images/projects/chromablock/image2.png",
            "assets/images/projects/chromablock/image3.png"
        ]
    },
    {
        "id": "symphony",
        "title": "Symphony",
        "desc_en": "Web application allowing users to host and stream their music, as well as discover music published by others on the platform.",
        "desc_fr": "Application web permettant aux utilisateurs d'héberger et lire leurs musiques ainsi que celles publiées par d'autres utilisateurs sur la plateforme.",
        "category_en": "Web Application",
        "category_fr": "Application Web",
        "year": "2024",
        "tags": ["Netlify Functions", "JavaScript", "HTML/CSS"],
        "img": "assets/images/projects/Covers/Symphony.avif",
        "date": "03 2026",
        "images": [
            "assets/images/projects/symphony/image2.png",
            "assets/images/projects/symphony/image.png",
            "assets/images/projects/symphony/image3.png"
        ]
    },
    {
        "id": "echo",
        "title": "Echo",
        "desc_en": "Web interface to interact and chat with a local Artificial Intelligence (Qwen). Smooth and private conversational experience.",
        "desc_fr": "Interface web permettant d'interagir et discuter avec une intelligence artificielle fonctionnant en local (Qwen). Expérience conversationnelle fluide et privée.",
        "category_en": "AI / Web",
        "category_fr": "IA / Web",
        "year": "2024",
        "tags": ["JavaScript", "HTML/CSS", "AI Local"],
        "img": "assets/images/projects/Covers/Echo.avif",
        "date": "03 2026",
        "images": [
            "assets/images/projects/echo/image.png"
        ]
    }
];

const INITIAL_SETTINGS = {
    "id": 1,
    "first_name": "Brikesh",
    "last_name": "Vikin",
    "email": "brikeshvikin13@gmail.com",
    "linkedin_url": "https://www.linkedin.com/in/brikesh-vikin/",
    "github_url": "",
    "photo_url": "assets/images/profile/me.avif",
    "translations": {
        "en": {
            "meta.description": "Creative developer specialized in web interfaces, animation and interactive design. Discover my projects and works.",
            "index.title": "Brikesh Vikin, Creative Developer",
            "index.h1": "Brikesh Vikin, Creative Developer, computer science student in Chennai, specialized in web development, animation and interactive design.",
            "index.hero.tagline": 'Quiet creator, <span class="other-accent">bringing ideas to life</span>,<br>through motion, detail and softness.',
            "index.about.text": 'As a <span class="other-accent">creative developer</span>, I craft tailor-made web experiences, blending technical precision and <span class="other-accent">emotion</span>.',
            "index.about.sub": "My name is Brikesh. A passionate creator and computer science student in Chennai, I build memorable digital experiences, always seeking the symbiosis between art and information.",
            "index.cg.phrase": 'Each project is a chance to <span class="other-accent">learn</span>, <span class="other-accent">experiment</span> and push my limits.',
            "index.skills.subtitle": "Skills",
            "index.skills.text": "Computer Science student in Chennai, specialized in cybersecurity, passionate about web development and design.",
            "index.skills.frontend": "Frontend",
            "index.skills.animation": "Animation & 3D",
            "index.skills.backend": "Backend",
            "index.skills.database": "Databases",
            "index.skills.devops": "DevOps & Tools",
            "index.skills.security": "System & Security",
            "index.skills.design": "Design",
            "index.contact.title": "Contact",
            "index.contact.dispo1": 'Looking for an <span class="other-accent">apprenticeship</span> starting September. Eager to join an innovative team and contribute to ambitious projects.',
            "index.contact.dispo2": 'I\'m available for <span class="other-accent">freelance missions worldwide</span>, on <span class="other-accent">your ambitious projects</span> and international collaborations.',
            "index.proj.label": "Preview",
            "index.detail.back": "🡼BACK",
            "info.title": "Info, Brikesh Vikin",
            "info.eyebrow": "About",
            "info.role": "Creative developer & computer science student, specialized in web development.",
            "info.desc": 'I craft tailor-made web experiences where technical precision meets emotion. Passionate about animation, interaction and <span class="other-accent">detail</span>, I always seek the symbiosis between art and information.',
            "info.meta.based": "Based in",
            "info.meta.status": "Status",
            "info.meta.based.value": "Chennai, India",
            "info.meta.status.value": "Looking for an apprenticeship",
            "info.skills.frontend": "Frontend",
            "info.skills.animation": "Animation & 3D",
            "info.skills.backend": "Backend",
            "info.skills.security": "Security & Tools",
            "contact.title": "Contact, Brikesh Vikin",
            "contact.panel.title": "Let's talk about your project.",
            "contact.panel.copy": "I respond quickly to apprenticeship requests, freelance missions and collaborations around interactive web experiences.",
            "contact.meta.base": "Based in",
            "contact.meta.status": "Status",
            "contact.meta.delay": "Avg. response",
            "contact.meta.base.value": "Chennai, India",
            "contact.meta.status.value": "Student / Freelance",
            "contact.meta.delay.value": "48h",
            "contact.eyebrow": "Contact",
            "contact.role": "Creative developer, focused on animation, interaction, and tailor-made web experiences.",
            "contact.desc": "If you have a project in mind, an ambitious idea, I'd be glad to discuss it with you and explore a potential collaboration.",
            "contact.shortcuts": "Shortcuts",
            "contact.brief": "Brief format",
            "contact.maildirect": "Direct mail",
            "contact.brief.product": "Product goal",
            "contact.brief.deadline": "Target deadline",
            "contact.brief.stack": "Tech stack",
            "contact.brief.deliverables": "Expected deliverables",
            "works.title": "Work, Brikesh Vikin",
            "works.h1": "Projects, Brikesh Vikin, Creative Developer. Discover my work in web development, animation and interactive design.",
            "common.aria.back": "Back to home",
            "common.aria.menu": "Main navigation",
            "common.aria.social": "Social links",
            "common.aria.footer": "Footer navigation",
            "404.title": "404 — Brikesh Vikin",
            "404.subtitle": "This page got lost in the void.<br><span class=\"subtitle-dim\">It doesn't exist, or no longer does.</span>",
            "404.ticker": "— PAGE NOT FOUND — SIGNAL LOST — ERROR 0x404 — THIS PAGE DOESN'T EXIST — COORDINATES: NULL — UNKNOWN DESTINATION — ",
            "404.aria.back": "Back to home"
        },
        "fr": {
            "meta.description": "Développeur créatif spécialisé dans les interfaces web, l'animation et le design interactif. Découvrez mes projets et mes réalisations.",
            "index.title": "Brikesh Vikin, Développeur Créatif",
            "index.h1": "Brikesh Vikin — Creative Developer, étudiant en informatique à Chennai, spécialisé en développement web, animation et design interactif.",
            "index.hero.tagline": 'Créateur discret, <span class="other-accent">donnant vie aux idées</span>,<br>par le mouvement, le détail et la douceur.',
            "index.about.text": 'En tant que <span class="other-accent">développeur créatif</span>, je façonne des expériences web sur-mesure, alliant précision technique et <span class="other-accent">émotion</span>.',
            "index.about.sub": "Je m'appelle Brikesh. Passionné et étudiant en informatique à Chennai, je conçois des interfaces marquantes, cherchant constamment la symbiose entre art et technique.",
            "index.cg.phrase": 'Chaque projet est l\'occasion d\'<span class="other-accent">apprendre</span>, d\'<span class="other-accent">expérimenter</span> et de repousser mes limites.',
            "index.skills.subtitle": "Compétences",
            "index.skills.text": "Étudiant en informatique à Chennai, spécialisé en cybersécurité, passionné de développement web et de design.",
            "index.skills.frontend": "Frontend",
            "index.skills.animation": "Animation & 3D",
            "index.skills.backend": "Backend",
            "index.skills.database": "Bases de données",
            "index.skills.devops": "DevOps & Outils",
            "index.skills.security": "Système & Sécurité",
            "index.skills.design": "Design",
            "index.contact.title": "Contact",
            "index.contact.dispo1": 'Recherche d\'une <span class="other-accent">alternance</span> pour la rentrée de Septembre. Hâte d\'intégrer une équipe innovante et de contribuer à des projets ambitieux.',
            "index.contact.dispo2": 'Je suis disponible pour des <span class="other-accent">missions en freelance</span>, sur <span class="other-accent">vos projets ambitieux</span> et des collaborations internationales.',
            "index.proj.label": "Aperçu",
            "index.detail.back": "🡼RETOUR",
            "info.title": "Info, Brikesh Vikin",
            "info.eyebrow": "À propos",
            "info.role": "Développeur créatif & étudiant en informatique, spécialisé dans le web.",
            "info.desc": 'Je façonne des expériences web sur-mesure, alliant précision technique et émotion. Passionné d\'animation, d\'interaction et de <span class="other-accent">détail</span>, je cherche constamment la symbiose entre art et technique.',
            "info.meta.based": "Basé à",
            "info.meta.status": "Statut",
            "info.meta.based.value": "Chennai, Inde",
            "info.meta.status.value": "Recherche d'alternance",
            "info.skills.frontend": "Frontend",
            "info.skills.animation": "Animation & 3D",
            "info.skills.backend": "Backend",
            "info.skills.security": "Sécurité & Outils",
            "contact.title": "Contact, Brikesh Vikin",
            "contact.panel.title": "Discutons de votre projet.",
            "contact.panel.copy": "Je réponds rapidement pour des propositions d'alternance, de freelance ou de collaboration autour d'expériences web interactives.",
            "contact.meta.base": "Basé à",
            "contact.meta.status": "Statut",
            "contact.meta.delay": "Délai rép.",
            "contact.meta.base.value": "Chennai, Inde",
            "contact.meta.status.value": "Étudiant / Freelance",
            "contact.meta.delay.value": "48h",
            "contact.eyebrow": "Contact",
            "contact.role": "Développeur créatif, axé sur l'animation, l'interaction, et le sur-mesure.",
            "contact.desc": "Si vous avez un projet en tête, une idée ambitieuse, je serais ravi d'en discuter avec vous et d'envisager une collaboration.",
            "contact.shortcuts": "Raccourcis",
            "contact.brief": "Format brief",
            "contact.maildirect": "Mail direct",
            "contact.brief.product": "Objectif produit",
            "contact.brief.deadline": "Date limite",
            "contact.brief.stack": "Stack technique",
            "contact.brief.deliverables": "Livrables attendus",
            "works.title": "Projets, Brikesh Vikin",
            "works.h1": "Projets — Brikesh Vikin, Creative Developer. Découvrez mes réalisations en développement web, animation et design interactif.",
            "common.aria.back": "Retour à l'accueil",
            "common.aria.menu": "Navigation principale",
            "common.aria.social": "Réseaux sociaux",
            "common.aria.footer": "Navigation du pied de page",
            "404.title": "404 — Brikesh Vikin",
            "404.subtitle": "Cette page s'est perdue dans le vide.<br><span class=\"subtitle-dim\">Elle n'existe pas, ou plus.</span>",
            "404.ticker": "— PAGE NON TROUVÉE — SIGNAL PERDU — ERREUR 0x404 — CETTE PAGE N'EXISTE PAS — COORDONNÉES : NULL — DESTINATION INCONNUE — ",
            "404.aria.back": "Retour à l'accueil"
        }
    }
};

async function seed() {
  console.log('Seeding settings configuration...');
  const { data: settingsData, error: settingsError } = await supabase
    .from('settings')
    .upsert(INITIAL_SETTINGS);

  if (settingsError) {
    console.error('❌ Settings seeding failed:', settingsError.message);
  } else {
    console.log('✅ Settings table successfully seeded!');
  }

  console.log('Seeding projects list...');
  const { data: projectsData, error: projectsError } = await supabase
    .from('projects')
    .upsert(INITIAL_PROJECTS);

  if (projectsError) {
    console.error('❌ Projects seeding failed:', projectsError.message);
  } else {
    console.log('✅ Projects table successfully seeded!');
  }

  console.log('\nAll seeding completed!');
  process.exit(0);
}

seed();
