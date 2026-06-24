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

// Mock WebSocket for Node.js environments < v22 (Supabase Realtime requires a WebSocket constructor to compile, but REST doesn't use it)
if (typeof global.WebSocket === 'undefined') {
  global.WebSocket = class {};
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const INITIAL_PROJECTS = [
    {
        "id": "food-delivery",
        "title": "Food Delivery Platform",
        "desc_en": "Built two React Native apps supporting 190+ menu items and 150+ daily orders in live production. Secure Node.js, Express, Prisma, and PostgreSQL backend with JWT authentication, Stripe payments, and real-time WebSockets tracking.",
        "desc_fr": "Développement de deux applications React Native (190+ articles, 150+ commandes/jour). Backend sécurisé Node.js, Express, Prisma, PostgreSQL avec JWT, Stripe et suivi WebSockets en temps réel.",
        "category_en": "Mobile App",
        "category_fr": "App Mobile",
        "year": "2024",
        "tags": ["React Native", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "Stripe", "WebSockets"],
        "img": "/food_delivery.png",
        "date": "09 2024",
        "images": ["/food_delivery.png"]
    },
    {
        "id": "sports-club",
        "title": "TuS Cricket Pfarrkirchen",
        "desc_en": "Built and maintained responsive frontend web interfaces and authentication systems for TuS Cricket (TuS 1860 e.V. Pfarrkirchen) using React, HTML5, CSS3, and Tailwind CSS. REST API integration and Netlify deployment.",
        "desc_fr": "Développement et maintenance d'un portail web responsive pour le club TuS Cricket (TuS 1860 e.V. Pfarrkirchen) avec React, HTML5, CSS3 et Tailwind. Intégration d'API REST et déploiement Netlify.",
        "category_en": "Web Application",
        "category_fr": "Application Web",
        "year": "2024",
        "tags": ["React.js", "Tailwind CSS", "REST API", "Netlify"],
        "img": "/sports_club.png",
        "date": "06 2024",
        "images": ["/sports_club.png"]
    },
    {
        "id": "durr-cts",
        "title": "Inspection Data Manager",
        "desc_en": "Desktop solution designed and delivered during a hackathon (now officially certified). Built a smart Python parser to extract equipment tags, checklist results, and comments, synced over SharePoint/OneDrive with a multi-user SQLite database and automatic conflict resolution.",
        "desc_fr": "Solution de bureau conçue lors d'un hackathon (officiellement certifiée). Parseur Python intelligent pour extraire les équipements et commentaires, base SQLite synchronisée via SharePoint/OneDrive avec résolution de conflits.",
        "category_en": "Desktop Application",
        "category_fr": "Application Desktop",
        "year": "2024",
        "tags": ["Python", "SQLite", "SharePoint", "OneDrive", "Pytest"],
        "img": "/assets/images/projects/Covers/CyberDiag.avif",
        "date": "11 2024",
        "images": ["/assets/images/projects/Covers/CyberDiag.avif"]
    },
    {
        "id": "healthcare-nlp",
        "title": "Healthcare NLP Chatbot",
        "desc_en": "Python (Flask) backend application for healthcare symptom classification and RESTful APIs to process user queries. Implemented NLP techniques including TF-IDF and N-grams for intent classification, achieving 80% accuracy in clinical classification.",
        "desc_fr": "Backend Python (Flask) pour la classification de symptômes médicaux. Implémentation de techniques de traitement automatique du langage naturel (TF-IDF, N-grams) pour la classification d'intentions avec 80% de précision.",
        "category_en": "AI / Backend API",
        "category_fr": "IA / API Backend",
        "year": "2023",
        "tags": ["Python", "Flask", "NLP", "TF-IDF", "N-grams"],
        "img": "/healthcare_nlp.png",
        "date": "05 2023",
        "images": ["/healthcare_nlp.png"]
    },
    {
        "id": "aws-infra",
        "title": "AWS Cloud Infrastructure",
        "desc_en": "Provisioned and configured AWS EC2 instances, security groups, and inbound/outbound network access for secure cloud lifecycle management.",
        "desc_fr": "Provisionnement et configuration d'instances AWS EC2, de groupes de sécurité et de règles réseau pour une gestion sécurisée du cycle de vie cloud.",
        "category_en": "Cloud / DevOps",
        "category_fr": "Cloud / DevOps",
        "year": "2025",
        "tags": ["AWS", "EC2", "Security Groups", "Infrastructure"],
        "img": "/aws_infra.png",
        "date": "11 2025",
        "images": ["/aws_infra.png"]
    }
];

const INITIAL_SETTINGS = {
    "id": 1,
    "first_name": "Brikesh",
    "last_name": "Vikin Gowrish",
    "email": "brikeshvikin13@gmail.com",
    "linkedin_url": "https://www.linkedin.com/in/brikesh-vikin-gowrish/",
    "github_url": "https://github.com/Brikesh04",
    "photo_url": "/portrait.png",
    "translations": {
        "en": {
            "meta.description": "Software developer specialized in backend APIs, mobile apps, and full-stack web systems. Discover my projects.",
            "index.title": "Brikesh Vikin Gowrish, Software Developer",
            "index.h1": "Brikesh Vikin Gowrish, Software Developer, computer science M.Sc. student at Universität Passau.",
            "index.hero.tagline": 'Software developer, <span class="other-accent">building applications that get used</span>,<br>from backend APIs to mobile apps.',
            "index.about.text": 'As a <span class="other-accent">software developer</span>, I design and build reliable, scalable digital solutions.',
            "index.about.sub": "My name is Brikesh. A passionate creator and computer science M.Sc. student at Universität Passau, Germany, I build memorable digital experiences, always seeking performance, clean code, and robust architectures.",
            "index.cg.phrase": 'Building high-performance software that solves real-world problems.',
            "index.skills.subtitle": "Skills",
            "index.skills.text": "Software developer comfortable across the full stack: Backend, Frontend, Databases, Cloud & DevOps.",
            "index.skills.frontend": "Frontend",
            "index.skills.animation": "Backend",
            "index.skills.backend": "Databases",
            "index.skills.database": "Cloud & DevOps",
            "index.skills.devops": "AI & Tools",
            "index.skills.security": "Core Concepts",
            "index.skills.design": "Languages",
            "index.contact.title": "Contact",
            "index.contact.dispo1": 'Looking for a junior full-stack / backend developer role where I can contribute from day one.',
            "index.contact.dispo2": 'I\'m available for <span class="other-accent">freelance missions worldwide</span>, on <span class="other-accent">your ambitious projects</span> and international collaborations.',
            "index.proj.label": "Preview",
            "index.detail.back": "🡼BACK",
            "info.title": "Info, Brikesh Vikin Gowrish",
            "info.eyebrow": "About",
            "info.role": "Software Developer & Computer Science M.Sc. student at Universität Passau.",
            "info.desc": 'I enjoy building things that actually work and get used by real people. I am comfortable across the full stack, specializing in backend APIs, mobile apps, and database designs. Seeking a junior role where I can keep learning and contribute.',
            "info.meta.based": "Based in",
            "info.meta.status": "Status",
            "info.meta.based.value": "Passau, Germany",
            "info.meta.status.value": "Looking for a junior role",
            "info.skills.frontend": "Frontend",
            "info.skills.animation": "Databases",
            "info.skills.backend": "Backend",
            "info.skills.security": "Cloud & DevOps",
            "contact.title": "Contact, Brikesh Vikin Gowrish",
            "contact.panel.title": "Let's talk about your project.",
            "contact.panel.copy": "I respond quickly to job opportunities, freelance missions and collaborations around backend APIs and web/mobile experiences.",
            "contact.meta.base": "Based in",
            "contact.meta.status": "Status",
            "contact.meta.delay": "Avg. response",
            "contact.meta.base.value": "Passau, Germany",
            "contact.meta.status.value": "Student / Developer",
            "contact.meta.delay.value": "24h",
            "contact.eyebrow": "Contact",
            "contact.role": "Software developer, focused on backend APIs, database design, and mobile app development.",
            "contact.desc": "If you have a job opening, a project in mind, or an ambitious idea, I'd be glad to discuss it with you and explore a potential collaboration.",
            "contact.shortcuts": "Shortcuts",
            "contact.brief": "Brief format",
            "contact.maildirect": "Direct mail",
            "contact.brief.product": "Product goal",
            "contact.brief.deadline": "Target deadline",
            "contact.brief.stack": "Tech stack",
            "contact.brief.deliverables": "Expected deliverables",
            "works.title": "Work, Brikesh Vikin Gowrish",
            "works.h1": "Projects, Brikesh Vikin Gowrish, Software Developer. Discover my work in software development, backend APIs, and full-stack systems.",
            "common.aria.back": "Back to home",
            "common.aria.menu": "Main navigation",
            "common.aria.social": "Social links",
            "common.aria.footer": "Footer navigation",
            "404.title": "404 — Brikesh",
            "404.subtitle": "This page got lost in the void.<br><span class=\"subtitle-dim\">It doesn't exist, or no longer does.</span>",
            "404.ticker": "— PAGE NOT FOUND — SIGNAL LOST — ERROR 0x404 — THIS PAGE DOESN'T EXIST — COORDINATES: NULL — UNKNOWN DESTINATION — ",
            "404.aria.back": "Back to home"
        },
        "fr": {
            "meta.description": "Développeur software spécialisé dans les API backend, les applications mobiles et les systèmes web full-stack.",
            "index.title": "Brikesh Vikin Gowrish, Développeur Software",
            "index.h1": "Brikesh Vikin Gowrish, Développeur Software, étudiant en Master Informatique à l'Université de Passau.",
            "index.hero.tagline": 'Développeur software, <span class="other-accent">créant des applications qui fonctionnent</span>,<br>des API backend aux applications mobiles.',
            "index.about.text": 'En tant que <span class="other-accent">développeur software</span>, je conçois et construis des solutions numériques fiables et évolutives.',
            "index.about.sub": "Je m'appelle Brikesh. Passionné et étudiant en Master Informatique à l'Université de Passau en Allemagne, je conçois des expériences numériques performantes, avec du code propre et des architectures robustes.",
            "index.cg.phrase": 'Construire des logiciels performants qui résolvent des problèmes réels.',
            "index.skills.subtitle": "Compétences",
            "index.skills.text": "Développeur software compétent sur tout le cycle de développement : Backend, Frontend, Bases de données, Cloud & DevOps.",
            "index.skills.frontend": "Frontend",
            "index.skills.animation": "Backend",
            "index.skills.backend": "Bases de données",
            "index.skills.database": "Cloud & DevOps",
            "index.skills.devops": "IA & Outils",
            "index.skills.security": "Concepts Clés",
            "index.skills.design": "Langues",
            "index.contact.title": "Contact",
            "index.contact.dispo1": "Recherche d'un rôle de développeur junior full-stack / backend où je peux contribuer dès le premier jour.",
            "index.contact.dispo2": 'Je suis disponible pour des <span class="other-accent">missions en freelance</span>, sur <span class="other-accent">vos projets ambitieux</span> et des collaborations internationales.',
            "index.proj.label": "Aperçu",
            "index.detail.back": "🡼RETOUR",
            "info.title": "Info, Brikesh Vikin Gowrish",
            "info.eyebrow": "À propos",
            "info.role": "Développeur Software & Étudiant en Master Informatique à l'Université de Passau.",
            "info.desc": "J'aime concevoir des produits qui fonctionnent réellement et qui sont utiles au quotidien. Compétent sur toute la stack, je me spécialise en API backend, applications mobiles et conception de bases de données. À la recherche d'un poste junior.",
            "info.meta.based": "Basé à",
            "info.meta.status": "Statut",
            "info.meta.based.value": "Passau, Allemagne",
            "info.meta.status.value": "Recherche d'un poste junior",
            "info.skills.frontend": "Frontend",
            "info.skills.animation": "Bases de données",
            "info.skills.backend": "Backend",
            "info.skills.security": "Cloud & DevOps",
            "contact.title": "Contact, Brikesh Vikin Gowrish",
            "contact.panel.title": "Discutons de votre projet.",
            "contact.panel.copy": "Je réponds rapidement pour des propositions d'embauche, de freelance ou de collaboration autour d'API backend et d'applications mobiles.",
            "contact.meta.base": "Basé à",
            "contact.meta.status": "Statut",
            "contact.meta.delay": "Délai rép.",
            "contact.meta.base.value": "Passau, Allemagne",
            "contact.meta.status.value": "Étudiant / Développeur",
            "contact.meta.delay.value": "24h",
            "contact.eyebrow": "Contact",
            "contact.role": "Développeur software, axé sur les API backend, la conception de bases de données et les applications mobiles.",
            "contact.desc": "Si vous avez une opportunité d'emploi, un projet en tête ou une idée ambitieuse, je serais ravi d'en discuter avec vous.",
            "contact.shortcuts": "Raccourcis",
            "contact.brief": "Format brief",
            "contact.maildirect": "Mail direct",
            "contact.brief.product": "Objectif produit",
            "contact.brief.deadline": "Date limite",
            "contact.brief.stack": "Stack technique",
            "contact.brief.deliverables": "Livrables attendus",
            "works.title": "Projets, Brikesh Vikin Gowrish",
            "works.h1": "Projets — Brikesh Vikin Gowrish, Développeur Software. Découvrez mes réalisations en développement logiciel, API backend et systèmes full-stack.",
            "common.aria.back": "Retour à l'accueil",
            "common.aria.menu": "Navigation principale",
            "common.aria.social": "Réseaux sociaux",
            "common.aria.footer": "Navigation du pied de page",
            "404.title": "404 — Brikesh",
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
