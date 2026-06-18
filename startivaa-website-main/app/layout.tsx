import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ConditionalShell from '@/components/ConditionalShell';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'sonner'; // Toast provider

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Startivaa - Build. Fund. Scale.',
  description:
    'Startivaa is a startup mentorship, consulting, and ecosystem platform helping founders, students, and institutions grow through AI, strategy, and powerful networks.',
  metadataBase: new URL('https://startivaa.com'),
  // ... other metadata unchanged ...
};

const globalJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://startivaa.com/#organization',
      name: 'Startivaa',
      url: 'https://startivaa.com',
      logo: 'https://startivaa.com/images/logo.png',
      sameAs: [
        'https://www.linkedin.com/in/amoloagrawal',
        'https://instagram.com/startivaa',
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://startivaa.com/#localbusiness',
      name: 'Startivaa',
      image: 'https://startivaa.com/images/og-image.png',
      url: 'https://startivaa.com',
      telephone: '+91 94032 83555',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hyderabad, Telangana, India',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '17.3850',
        longitude: '78.4867',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Global JSON-LD Schema Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body>
        <ConditionalShell>{children}</ConditionalShell>
        {/* Vercel Speed Insights & Real-Time Analytics */}
        <Analytics />
        <SpeedInsights />
        {/* Global toast notifications */}
        <Toaster
          toastOptions={{
            style: {
              background: '#0e0e1a',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  );
}
