import React, { useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import NextNprogress from 'nextjs-progressbar';
import { GlobalStyle } from 'styles/Global';
import { DEFAULT_THEME } from 'config/theme';
import Layout from 'config/layout';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      // if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) ga.pageview(url);

      // change focus to top
      if (url.includes('#')) {
        let idPresent = url.split('#').pop();
        (document.querySelector(`#${idPresent}`) as HTMLElement).focus();
      } else {
        (
          document.querySelector('#top-of-site-pixel-anchor') as HTMLElement
        ).focus();
      }
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  });

  const { stateScheme, stateData } = pageProps;
  return (
    <>
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script
              strategy="afterInteractive"
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
          </>
        )}
      </Head>
      <Layout>
        <NextNprogress
          color={DEFAULT_THEME.tertiary}
          startPosition={0.3}
          stopDelayMs={100}
          height={3}
          options={{ easing: 'ease', speed: 300, showSpinner: false }}
        />
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
