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
};
export const ToolbarContext = React.createContext(null);

const ConsPage: React.FC<Props> = ({ query, stateData, stateScheme }) => {
  const [view, setView] = useState('overview');
  const router = useRouter();
  const { state, sabha, cons, scheme } = router.query;
  function handleToolbarSwitch(e) {
    const tabState = e == 'list' ? 'explorer' : e;
    setView(tabState);
    router.replace({
      pathname: `/${state}/${sabha}/${cons}`,
      query: { view: tabState, scheme: e == 'list' ? 'all' : scheme },
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
            <Overview data={stateData} queryData={{ state, sabha, cons }} />
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

  const [stateScheme, stateData] = await Promise.all([
    stateSchemeFetch(query.state),
    stateDataFetch(query.state),
  ]);

  if (!(stateData && stateScheme)) return { notFound: true };

  return {
    props: {
      query: queryValue,
      stateData: stateData,
      stateScheme,
    },
  };
};

export default ConsPage;

const Wrapper = styled.div`
  margin-top: 32px;
  background-color: var(--color-background-light);
`;
