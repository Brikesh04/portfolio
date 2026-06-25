(async function () {
    // Always English — standalone mode
    document.documentElement.lang = 'en';
    document.documentElement.dataset.lang = 'en';
    window.__I18N_LANG = 'en';

    window.getCharHTML = function (ch) {
        if (ch === ' ') return '&nbsp;';
        if (ch === '🡲' || ch === '🡺') return '<svg style="width: 1.25em; height: 1.25em; vertical-align: -0.25em;" viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/></svg>';
        if (ch === '🡼') return '<svg style="width: 1.25em; height: 1.25em; vertical-align: -0.25em;" viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-135 42 42.5)"><path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/></g></svg>';
        if (ch === '🞣') return '<svg style="width: 0.9em; height: 0.9em; vertical-align: -0.1em; transform: translateY(-0.1em);" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"/></svg>';
        return ch;
    };

    // Standalone English defaults — no external API needed
    const settings = {
        first_name: "Brikesh",
        last_name: "Vikin",
        email: "brikeshvikin13@gmail.com",
        linkedin_url: "https://www.linkedin.com/in/brikesh-vikin-gowrish/",
        github_url: "https://github.com/Brikesh04",
        photo_url: "/assets/images/profile/me.jpg",
        translations: {
            en: {
                'meta.description': 'Creative developer specialized in web interfaces, animation and interactive design. Discover my projects and works.',
                'index.title': 'Brikesh Vikin, Creative Developer',
                'index.h1': 'Brikesh Vikin, Creative Developer, computer science student in Chennai, specialized in web development, animation and interactive design.',
                'index.hero.tagline': 'Quiet creator, <span class="other-accent">bringing ideas to life</span>,<br>through motion, detail and softness.',
                'index.about.text': 'As a <span class="other-accent">creative developer</span>, I craft tailor-made web experiences, blending technical precision and <span class="other-accent">emotion</span>.',
                'index.about.sub': "My name is Brikesh. A passionate creator and Computer Science student in Chennai, I build memorable digital experiences, always seeking the symbiosis between art and information.",
                'index.cg.phrase': 'Each project is a chance to <span class="other-accent">learn</span>, <span class="other-accent">experiment</span> and push my limits.',
                'index.skills.subtitle': 'Skills',
                'index.skills.text': 'Software developer specialized in building scalable backend APIs, mobile apps, and interactive web experiences.',
                'index.skills.frontend': 'Frontend',
                'index.skills.animation': 'Backend',
                'index.skills.backend': 'Databases',
                'index.skills.database': 'Cloud & DevOps',
                'index.skills.devops': 'AI & Tools',
                'index.skills.security': 'Core Concepts',
                'index.skills.design': 'Languages',
                'index.contact.title': 'Contact',
                'index.contact.dispo1': 'Looking for an <span class="other-accent">internship</span> starting September. Eager to join an innovative team and contribute to ambitious projects.',
                'index.contact.dispo2': 'Available for <span class="other-accent">freelance missions worldwide</span>, on <span class="other-accent">your ambitious projects</span> and international collaborations.',
                'index.proj.label': 'Preview',
                'index.detail.back': '🡼BACK',

                'info.title': 'Info — Brikesh Vikin',
                'info.eyebrow': 'About',
                'info.role': 'Creative developer & Computer Science student, specialized in web development.',
                'info.desc': 'I craft tailor-made web experiences where technical precision meets emotion. Passionate about animation, interaction and <span class="other-accent">detail</span>, I always seek the symbiosis between art and information.',
                'info.meta.based': 'Based in',
                'info.meta.status': 'Status',
                'info.meta.based.value': 'Chennai, India',
                'info.meta.status.value': 'Seeking an internship',
                'info.skills.frontend': 'Frontend',
                'info.skills.animation': 'Databases',
                'info.skills.backend': 'Backend',
                'info.skills.security': 'Cloud & DevOps',

                'contact.title': 'Contact — Brikesh Vikin',
                'contact.panel.title': "Let's talk about your project.",
                'contact.panel.copy': "I respond quickly to internship requests, freelance missions and collaborations around interactive web experiences.",
                'contact.meta.base': 'Based in',
                'contact.meta.status': 'Status',
                'contact.meta.delay': 'Avg. response',
                'contact.meta.base.value': 'Chennai, India',
                'contact.meta.status.value': 'Student / Freelance',
                'contact.meta.delay.value': '48h',
                'contact.eyebrow': 'Contact',
                'contact.role': 'Creative developer, focused on animation, interaction, and tailor-made web experiences.',
                'contact.desc': "If you have a project in mind, an ambitious idea, I'd be glad to discuss it with you and explore a potential collaboration.",
                'contact.shortcuts': 'Shortcuts',
                'contact.brief': 'Brief format',
                'contact.maildirect': 'Direct email',
                'contact.brief.product': 'Product goal',
                'contact.brief.deadline': 'Target deadline',
                'contact.brief.stack': 'Tech stack',
                'contact.brief.deliverables': 'Expected deliverables',

                'works.title': 'Work — Brikesh Vikin',
                'works.h1': 'Projects — Brikesh Vikin, Creative Developer. Discover my work in web development, animation and interactive design.',

                'common.aria.back': 'Back to home',
                'common.aria.menu': 'Main navigation',
                'common.aria.social': 'Social links',
                'common.aria.footer': 'Footer navigation',

                '404.title': '404 — Brikesh Vikin',
                '404.subtitle': 'This page got lost in the void.<br><span class="subtitle-dim">It doesn\'t exist, or no longer does.</span>',
                '404.ticker': '— PAGE NOT FOUND — SIGNAL LOST — ERROR 0x404 — THIS PAGE DOESN\'T EXIST — COORDINATES: NULL — UNKNOWN DESTINATION — ',
                '404.aria.back': 'Back to home',
            }
        }
    };

    // Try to fetch live settings from API (optional — falls back gracefully)
    try {
        const response = await fetch('/api/v1/settings');
        if (response.ok) {
            const data = await response.json();
            if (data && (data.email || data.first_name)) {
                // Merge live settings but keep English translations
                settings.first_name = data.first_name || settings.first_name;
                settings.last_name = data.last_name || settings.last_name;
                settings.email = data.email || settings.email;
                settings.linkedin_url = data.linkedin_url || settings.linkedin_url;
                settings.github_url = data.github_url || settings.github_url;
                settings.photo_url = data.photo_url || settings.photo_url;
            }
        }
    } catch (e) {
        // Offline — use defaults above
    }

    window.__SETTINGS = settings;
    const T = settings.translations['en'];

    // Apply any remaining data-i18n attributes in the DOM
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        const key = el.getAttribute('data-i18n');
        if (T[key] != null) el.innerHTML = T[key];
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
        el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
            const idx = pair.indexOf(':');
            if (idx < 0) return;
            const attr = pair.slice(0, idx).trim();
            const key = pair.slice(idx + 1).trim();
            if (T[key] != null) el.setAttribute(attr, T[key]);
        });
    });

    const titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey && T[titleKey]) document.title = T[titleKey];

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && T['meta.description']) descMeta.setAttribute('content', T['meta.description']);

    window.__t = function (key) {
        return T[key] || '';
    };

    // Dispatch settings ready event for other scripts
    window.dispatchEvent(new CustomEvent('settingsready', { detail: settings }));
})();