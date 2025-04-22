import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 定义网站的JSON-LD结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Tools For Everything',
    url: 'https://aitoolsfor.online/',
    description:
      'Discover the best AI tools for all your needs. Our curated directory features top AI tools for text, images, videos, business, education and more.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://aitoolsfor.online/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/images/aitoolsfor-icon.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {/* 添加网站地图链接 - 使用正确的方式 */}
        <link rel='alternate' type='application/xml' href='/sitemap.xml' title='Sitemap' />
        {/* 添加结构化数据 */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body>
        {children}

        {/* Google Analytics */}
        <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-3HM05SNTGN' />
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3HM05SNTGN');
            `,
          }}
        />
      </body>
    </html>
  );
}
