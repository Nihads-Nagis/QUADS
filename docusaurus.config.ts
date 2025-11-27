import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkSectionize from 'remark-sectionize';

const config: Config = {
  title: 'QUADS',
  tagline: 'The QuadSQuad',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  // Works for BOTH localhost & GitHub Pages
  url: 'https://nihads-nagis.github.io',
  baseUrl: '/QUADS/',

  organizationName: 'Nihads-Nagis',
  projectName: 'QUADS',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },

  markdown: { mermaid: true },
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    require.resolve('./src/components/docusaurus-plugin-panzoom/index.ts'),
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',         // docs = homepage
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Nihads-Nagis/QUADS/tree/main/',
          remarkPlugins: [remarkMath, remarkSectionize],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          routeBasePath: '/blog',
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          editUrl: 'https://github.com/Nihads-Nagis/QUADS/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [remarkMath, remarkSectionize],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/hx3.css'),
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    zoom: {
      selectors: [
        '.docusaurus-mermaid-container svg',
        '.drawio',
      ],
      wrap: true,
      timeout: 1000,
      excludeClass: 'panzoom-exclude',
      toolbar: { enabled: true, position: 'top-right', opacity: 0.4 },
      enableWheelZoom: true,
      enableDoubleClickResetZoom: true,
      minScale: 0.5,
      maxScale: 7,
    },

    image: 'img/docusaurus-social-card.jpg',

    colorMode: { respectPrefersColorScheme: true },

    navbar: {
      title: 'QUADS',
      logo: { alt: 'QUADS Logo', src: 'img/logo.svg' },
      items: [
        { to: '/blog', label: 'Blog', position: 'left' },
        { type: 'localeDropdown', position: 'right' },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Getting Started', to: '/' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/docusaurus' },
            { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },
            { label: 'X', href: 'https://x.com/docusaurus' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: 'https://github.com/Nihads-Nagis/QUADS' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} QUADSquad. Built with Belief.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

if (process.env.NODE_ENV === 'development') {
  config.baseUrl = '/';
  config.url = 'http://localhost:3000/';
}

export default config;
