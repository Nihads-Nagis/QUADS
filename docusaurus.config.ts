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

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://nihads-nagis.github.io',
  baseUrl: '/QUADS/',

  organizationName: 'Quads',
  projectName: '9999',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },
  markdown:{
    mermaid: true
  },
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
  
    // '@r74tech/docusaurus-plugin-panzoom',
      // require.resolve('./src/components/docusaurus-plugin-panzoom'),
      require.resolve('./src/components/docusaurus-plugin-panzoom/index.ts'),


],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [
            remarkMath,
            remarkSectionize,
          ],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [
            remarkMath,
            remarkSectionize,
          ],
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

  // Global KaTeX stylesheet for math rendering
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
    // 'svg[id^="mermaid-svg"]',                 // mermaid-generated svg root
    '.docusaurus-mermaid-container svg',      // docusaurus wrapper variant
    // '.mermaid > svg',                         // fallback safe selector
    '.drawio',                                // keep drawio if you use it
  ],
  wrap: true,
  timeout: 1000,
  excludeClass: 'panzoom-exclude',
  toolbar: { enabled: true, position: 'top-right', opacity: 0.4 },
  enableWheelZoom: true,
  enableDoubleClickResetZoom: true,
  minScale: 0.5,
  maxScale: 7,    
    // You can also pass any options supported by @panzoom/panzoom
    // See: https://github.com/timmywil/panzoom for available options
  },
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'My Site',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
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

export default config;
