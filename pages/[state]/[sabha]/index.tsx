import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { stateDataFetch, stateSchemeFetch } from 'utils/fetch';

import {
  Overview as OverViewIcon,
  Explorer as ExplorerIcon,
} from 'components/icons';
import { Header } from 'components/pages/cons/Header';
import { Toolbar } from 'components/layouts/Toolbar';
import { upperCaseString } from 'utils/helper';
import { Overview } from 'components/pages/cons';
import { useRouter } from 'next/router';

const Explorer = dynamic(
  () => import('components/pages/cons/Explorer/Explorer'),
  {
    ssr: false,
  }
);

const Seo = dynamic(() => import('components/common/Seo/Seo'), {
  ssr: false,
});

type Props = {
  query: any;
  stateScheme: any;
  stateData: any;
  schemeData: any;
  consData: any;
};
export const ToolbarContext = React.createContext(null);

const ConsPage: React.FC<Props> = ({
  query,
  stateData,
  stateScheme,
  consData,
}) => {
  const [view, setView] = useState('overview');
  const router = useRouter();
  const { state, sabha, scheme, cons_code } = query;
  const { constituency_name: cons } = consData;
  function handleToolbarSwitch(e: string) {
    function isTabbed(val: string) {
      if (['explorer', 'overview'].includes(val)) return true;
      return false;
    }

    function showScheme(val) {
      if (isTabbed(val)) {
        if (scheme) return scheme;
        return '';
      }
      if (val == 'list') return '';
      return val;
    }

    const tabState = isTabbed(e) ? e : 'explorer';
    setView(tabState);
    router.replace({
      pathname: `/${state}/${sabha}`,
      query: {
        cons_code,
        scheme: showScheme(e),
      },
    });

    window.scrollTo(0, 0);
  }

  const tabData = React.useMemo(
    () => [
      {
        value: 'overview',
        name: 'Overview',
        altName: 'Key Highights of Constituency',
        icon: <OverViewIcon size={40} />,
        content: (
          <ToolbarContext.Provider value={handleToolbarSwitch}>
            <Overview
              data={stateData}
              queryData={{ state, sabha, cons }}
              schemeList={stateScheme}
              consData={consData}
            />
          </ToolbarContext.Provider>
        ),
      },
      {
        value: 'explorer',
        name: 'Explorer',
        altName: 'Scheme Data of Constituency',
        icon: <ExplorerIcon size={40} />,
        content: <Explorer queryData={query} schemeList={stateScheme} />,
      },
    ],
    [stateData]
  );

  const seo = {
    title: `${upperCaseString(cons)} . ${upperCaseString(
      state
    )} - Constituency Dashboard`,
    description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${state}`,
  };

  return (
    <>
      <Seo seo={seo} />
      {
        <>
          <main className="container">
            <Header queryData={{ state, sabha, cons }} />
            <Wrapper id="consPageWrapper">
              <Toolbar
                value={view}
                onValueChange={(e) => handleToolbarSwitch(e)}
                fullScreenId="consPageWrapper"
                data={tabData}
              />
            </Wrapper>
          </main>
        </>
      }
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const queryValue: any = query || {};
  if (!['vidhan', 'lok'].includes(queryValue.sabha)) return { notFound: true };

  const json = await fetch(
    'http://localhost:3000/assets/json/bihar_ac.json'
  ).then((res) => res.json());

  const [stateScheme, stateData] = await Promise.all([
    stateSchemeFetch(query.state),
    stateDataFetch(query.state),
  ]);

  if (!(stateData && stateScheme && queryValue.cons_code))
    return { notFound: true };

  return {
    props: {
      query: queryValue,
      stateData: stateData,
      stateScheme,
      consData: json[queryValue.cons_code],
    },
  };
};

export default ConsPage;

const Wrapper = styled.div`
  margin-top: 32px;
  background-color: var(--color-background-light);
`;
