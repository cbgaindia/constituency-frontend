import React, { useEffect, createContext } from 'react';
import App from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import { GlobalStyle } from 'styles/Global';
import { DEFAULT_THEME } from 'config/theme';
import Layout from 'config/layout';
import Router from 'next/router';
import { stateDataFetch, stateSchemeFetch } from 'utils/fetch';

export const GlobalContext = createContext<any>({});
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      // if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) ga.pageview(url);
      // if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_NEW) ga.pageviewNew(url);

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
    <Layout>
      <NextNprogress
        color={DEFAULT_THEME.tertiary}
        startPosition={0.3}
        stopDelayMs={100}
        height={3}
        options={{ easing: 'ease', speed: 300, showSpinner: false }}
      />
      <GlobalStyle />
      <GlobalContext.Provider value={{ stateScheme, stateData }}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </Layout>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const stateScheme = await stateSchemeFetch();
  const stateData = await stateDataFetch();

  return { ...appProps, pageProps: { stateScheme, stateData } };
};

export default MyApp;
