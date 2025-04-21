export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/images/aitoolsfor-icon.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body>{children}</body>
    </html>
  );
}
