export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://codesync.dev';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CodeSync',
    url: APP_URL,
    logo: `${APP_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/codesync',
      'https://github.com/codesync',
      'https://discord.gg/codesync',
    ],
  };
}

export function getSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CodeSync Cloud IDE',
    operatingSystem: 'Any',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '2048',
    },
  };
}

export function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is CodeSync free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We offer a generous Free plan that includes 3 projects, 1 GB of storage, and basic AI assistance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I collaborate in real time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. CodeSync features Google Docs-style real-time collaboration. You can see your teammates\' cursors, share terminals, and pair program instantly.',
        },
      },
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: APP_URL,
    name: 'CodeSync',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${APP_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
