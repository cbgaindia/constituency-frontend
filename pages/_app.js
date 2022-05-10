import React, { useEffect } from 'react';
import NextNprogress from 'nextjs-progressbar';
import { GlobalStyle } from 'styles/Global';
import { DEFAULT_THEME } from 'config/theme';
import Layout from 'config/layout';
import Router from 'next/router'

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      // if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) ga.pageview(url);
      // if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_NEW) ga.pageviewNew(url);

      // change focus to top
      if (url.includes('#')) {
        let idPresent = url.split('#').pop();
        document.querySelector(`#${idPresent}`).focus();
      } else {
        document.querySelector('#top-of-site-pixel-anchor').focus();
      }
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  });

  return (
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
  );
}

export default MyApp;
