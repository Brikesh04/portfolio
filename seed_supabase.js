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
  global.WebSocket = class { };
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const INITIAL_PROJECTS = [
  {
    "id": "food-delivery",
    "title": "Food Delivery Platform",
    "desc_en": "Built two React Native apps supporting 190+ menu items and 150+ daily orders in live production. Secure Node.js, Express, Prisma, and PostgreSQL backend with JWT authentication, Stripe payments, and real-time WebSockets tracking.",
    "category_en": "Mobile App",
    "year": "2024",
    "tags": ["React Native", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "Stripe", "WebSockets"],
    "img": "/food_delivery.png",
    "date": "09 2024",
    "images": ["/food_delivery.png"]
  },
  {
    "id": "sports-club",
    "title": "TuS Cricket Pfarrkirchen",
    "desc_en": "Built and maintained the official website for the TuS 1860 Pfarrkirchen cricket department using React, HTML5, CSS3, and Tailwind CSS. Features live squad rankings and a fully responsive layout with Netlify deployment. [live_link:https://tus-cricket-pfarrkirchen.de/]",
    "category_en": "Web Application",
    "year": "2024",
    "tags": ["React.js", "Tailwind CSS", "REST API", "Netlify"],
    "img": "/tus_cricket_1.png",
    "date": "06 2024",
    "images": ["/tus_cricket_1.png", "/tus_cricket_2.png"]
  },
  {
    "id": "durr-cts",
    "title": "Inspection Data Manager",
    "desc_en": "Desktop solution designed and delivered during a hackathon (now officially certified). Built a smart Python parser to extract equipment tags, checklist results, and comments, synced over SharePoint/OneDrive with a multi-user SQLite database and automatic conflict resolution.",
    "category_en": "Desktop Application",
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
    "category_en": "AI / Backend API",
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
    "category_en": "Cloud / DevOps",
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
      "index.h1": "Brikesh Vikin Gowrish, Software Developer, Full-Stack Developer.",
      "index.hero.tagline": 'Software developer, <span class="other-accent">building applications that get used</span>,<br>from backend APIs to mobile apps.',
      "index.about.text": 'As a <span class="other-accent">software developer</span>, I design and build reliable, scalable digital solutions.',
      "index.about.sub": "My name is Brikesh. A passionate creator and a Full-Stack Developer in Passau, Germany, I build memorable digital experiences, always seeking performance, clean code, and robust architectures.",
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
      "info.role": "Software Developer & Full-Stack Developer.",
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
      "contact.meta.status.value": "Full-Stack Developer / Developer",
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
