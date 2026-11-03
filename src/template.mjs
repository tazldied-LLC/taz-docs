export const SITE_ORIGIN = 'https://taz.bot';
const IMAGE = 'https://cdn.tazldied.com/images/taz/taz-sitting.png';
// Contributions go to staging: CONTRIBUTING.md asks for pull requests there, not main.
const EDIT_BASE = 'https://github.com/tazldied-LLC/taz-docs/edit/staging/content/';

export function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// JSON-LD sits inside a <script>, so a "<" in a description could end it early.
function jsonString(text) {
  return JSON.stringify(text).replace(/</g, '\\u003c');
}
// dont evne trip dawg
function head({ title, description, url }) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${t}</title>
  <meta name="description" content="${d}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="taz" />
  <meta property="og:title" content="${t}" />
  <meta property="og:description" content="${d}" />
  <meta property="og:image" content="${IMAGE}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${t}" />
  <meta name="twitter:description" content="${d}" />
  <meta name="twitter:image" content="${IMAGE}" />
  <meta name="theme-color" content="#e05585" />
  <link rel="icon" href="https://cdn.tazldied.com/images/taz/favicon.ico">
  <link rel="canonical" href="${url}" />
  <meta property="og:url" content="${url}" />
  <script>
    (function () {
      var stored = localStorage.getItem('theme');
      var dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    })();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles/main.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <link rel="stylesheet" href="/styles/marketing.css" />
  <link rel="stylesheet" href="/styles/docs.css" />
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": ${jsonString(title)},
  "description": ${jsonString(description)},
  "url": "${url}",
  "image": "${IMAGE}",
  "author": {
    "@type": "Organization",
    "name": "taz",
    "url": "https://taz.bot/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "taz",
    "url": "https://taz.bot/"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${url}"
  }
}
  </script>
</head>
<body class="marketing docs-page">
<a class="skip" href="#main">skip to content</a>

<x-nav></x-nav>
`;
}

const SEARCH = `    <div class="docs-search" role="search">
      <i class="fas fa-search docs-search-icon" aria-hidden="true"></i>
      <input type="search" class="docs-search-input" placeholder="search the docs" aria-label="search the docs" aria-keyshortcuts="/" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="docs-search-results" />
      <kbd class="docs-search-key" aria-hidden="true">/</kbd>
      <div class="docs-search-results" id="docs-search-results" role="listbox" hidden></div>
    </div>`;

const TAIL = `
<x-signoff></x-signoff>

<x-footer></x-footer>

<script src="/js/theme-toggle.js"></script>
<script src="/js/fit.js"></script>
<script src="/js/docsSearch.js"></script>
<script src="/js/pen.js"></script>
<script src="/js/pages/docs.js"></script>

</body>
</html>
`;

function pageList(pages, path) {
  return pages.map((page) => `        <li><a href="${page.href}"${page.href === path ? ' aria-current="page"' : ''}>${escapeHtml(page.title)}</a></li>
`).join('');
}

function onThisPage(toc) {
  if (toc.length < 2) return '';
  const items = toc.map((h) => `        <li><a href="#${h.id}">${h.html}</a></li>
`).join('');
  return `    <nav class="docs-toc" aria-label="on this page">
      <p class="docs-toc-h">on this page</p>
      <ol>
${items}      </ol>
    </nav>
`;
}

function editLink(slug) {
  return `    <p class="docs-edit"><i class="fab fa-github" aria-hidden="true"></i><a href="${EDIT_BASE}${slug}.md">edit this page on github</a></p>
`;
}

function pager(prev, next, home) {
  const link = (page, rel, label) => (page
    ? `      <a class="docs-${rel}" href="${page.href}" rel="${rel}"><span>${label}</span>${escapeHtml(page.title)}</a>\n`
    : '');
  return `    <nav class="docs-pager" aria-label="more docs">
${link(prev || home, 'prev', prev ? 'previous' : 'back to')}${link(next, 'next', 'next')}    </nav>
`;
}

export function contentPage({ title, description, url, path, slug, intro, body, toc, home, pages, prev, next }) {
  return `${head({ title: `${title} docs - taz`, description, url })}
<div class="docs wrap">
  <aside class="docs-side">
${SEARCH}
    <nav class="docs-pages" aria-label="docs pages">
      <a class="docs-pages-home" href="${home.href}">${escapeHtml(home.title)}</a>
      <ol>
${pageList(pages, path)}      </ol>
    </nav>
  </aside>

  <main id="main" class="docs-main">
    <header class="docs-head">
      <p class="docs-crumb"><a href="${home.href}">${escapeHtml(home.title)}</a> / ${escapeHtml(title)}</p>
      <h1 class="docs-h">${escapeHtml(title)}</h1>
      <p class="docs-intro">${intro}</p>
    </header>
${onThisPage(toc)}    <div class="docs-prose">
${body}    </div>
${editLink(slug)}${pager(prev, next, home)}  </main>
</div>
${TAIL}`;
}

export function indexPage({ title, heading, description, url, intro, body, cards }) {
  const list = cards.map((card) => `      <li><a href="${card.href}">
        <i class="fas ${card.icon}" aria-hidden="true"></i>
        <span class="dh-t">${escapeHtml(card.title)}</span>
        <span class="dh-d">${escapeHtml(card.desc)}</span>
      </a></li>
`).join('');
  const more = body ? `
  <section class="dh-more" aria-labelledby="dh-more-h">
    <h2 class="dh-more-h" id="dh-more-h">good to know</h2>
    <div class="docs-prose">
${body}    </div>
  </section>
` : '';

  return `${head({ title: `${title} - taz`, description, url })}
<main id="main" class="docs-home wrap">
  <header class="dh-head">
    <h1 class="dh-h">${escapeHtml(heading)}</h1>
    <div class="dh-intro">
${intro ? `      <p class="docs-intro">${intro}</p>\n` : ''}${SEARCH}
    </div>
  </header>

  <section class="dh-pages" aria-labelledby="dh-pages-h">
    <h2 class="sr" id="dh-pages-h">every page</h2>
    <ol class="dh-list">
${list}    </ol>
  </section>
${more}</main>
${TAIL}`;
}
