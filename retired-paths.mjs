// Every page from the site's agency era. Each one permanently redirects to the front door.
// Shared by next.config.js and tests/site.test.mjs so the two cannot drift apart.
// A `:rest*` entry also covers that page's children (for example, individual insight posts).
export const RETIRED_PATHS = [
    '/about',
    '/assets',
    '/blog',
    '/channels',
    '/contact',
    '/designs',
    '/insights',
    '/insights/:rest*',
    '/method',
    '/packages',
    '/playbook',
    '/services',
    '/terms',
    '/work',
    '/work/:rest*'
];
