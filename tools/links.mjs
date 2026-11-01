export const SITE_PATHS = ['/', '/commands', '/dashboard', '/invite', '/plus', '/roadmap', '/status'];

// The links the page's markdown wrote: its intro and text, not the sidebar,
// "on this page" list or previous/next links around them.
function contentLinks(html) {
  const start = html.indexOf('<p class="docs-intro">');
  const end = html.search(/<nav class="docs-pager"|<\/main>/);
  const content = html.slice(start, end).replace(/<nav class="docs-toc"[\s\S]*?<\/nav>/, '');
  return [...content.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
}

export function findBrokenLinks(pages) {
  const byUrl = new Map(pages.map((page) => [page.url, { page, ids: page.anchors }]));
  const broken = [];
  for (const page of pages) {
    for (const href of contentLinks(page.html)) {
      if (/^https?:\/\//i.test(href)) continue;
      const [pathPart, anchor] = href.split('#');
      const targetUrl = pathPart || page.url;
      const target = byUrl.get(targetUrl);
      const where = `content/${page.slug}.md`;

      if (targetUrl.startsWith('/docs')) {
        if (!target) broken.push(`${where}: links to ${href}, but there's no ${targetUrl} page`);
        else if (anchor !== undefined && !target.ids.has(anchor)) {
          broken.push(`${where}: links to ${href}, but ${target.page.slug}.md has no heading with {#${anchor}}`);
        }
      } else if (!SITE_PATHS.includes(pathPart.split('?')[0])) {
        broken.push(`${where}: links to ${href}, which isn't a docs page or a known taz.bot page (tools/links.mjs lists those)`);
      }
    }
  }
  return broken;
}
