import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { dataTransform, stateDataFetch, stateSchemeFetch } from 'utils/fetch';

import {
  Overview as OverViewIcon,
  Explorer as ExplorerIcon,
} from 'components/icons';
import { Header, Explorer, Overview } from 'components/pages/cons';
import Toolbar from 'components/layouts/Toolbar';
import { upperCaseString } from 'utils/helper';

const Seo = dynamic(() => import('components/common/Seo/Seo'), {
  ssr: false,
});

type Props = {
  query: any;
  stateScheme: any;
  stateData: any;
  schemeData: any;
};

const ConsPage: React.FC<Props> = ({ query, stateData, stateScheme }) => {
  const { state, sabha, cons } = query;

  const tabData = React.useMemo(
    () => [
      {
        value: 'overview',
        name: 'Overview',
        altName: 'Key Highights of Constituency',
        icon: <OverViewIcon size={40} />,
        content: (
          <Overview data={stateData} queryData={{ state, sabha, cons }} />
        ),
      },
      {
        value: 'explorer',
        name: 'Explorer',
        altName: 'Scheme Data of Constituency',
        icon: <ExplorerIcon size={40} />,
        content: (
          <Explorer
            queryData={{ state, sabha, cons }}
            schemeList={stateScheme}
          />
        ),
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

  if (!['vidhan', 'lok'].includes(sabha)) return <p>Incorrect URL!</p>;
  return (
    <>
      <Seo seo={seo} />
      {tabData ? (
        <>
          <main className="container">
            <Header queryData={{ state, sabha, cons }} />
            <Wrapper id="consPageWrapper">
              <Toolbar
                defaultValue="overview"
                fullScreenId="consPageWrapper"
                data={tabData}
              />
            </Wrapper>
          </main>
        </>
      ) : (
        <>Loading...</>
      )}
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

  const queryValue = query || {};
  const [stateScheme, stateData] = await Promise.all([
    stateSchemeFetch(query.state),
    stateDataFetch(query.state),
  ]);

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
