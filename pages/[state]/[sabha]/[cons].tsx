import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { dataTransform, stateDataFetch, stateSchemeFetch } from 'utils/fetch';
import { upperCaseString } from 'utils/helper';

import {
  Overview as OverViewIcon,
  Explorer as ExplorerIcon,
} from 'components/icons';

const Header = dynamic(() => import('components/pages/cons/Header/Header'), {
  ssr: false,
});
const Explorer = dynamic(
  () => import('components/pages/cons/Explorer/Explorer'),
  {
    ssr: false,
  }
);
const Overview = dynamic(
  () => import('components/pages/cons/Overview/Overview'),
  {
    ssr: false,
  }
);
const Toolbar = dynamic(() => import('components/layouts/Toolbar'), {
  ssr: false,
});
const Seo = dynamic(() => import('components/common/Seo/Seo'), {
  ssr: false,
});

type Props = {
  query: any;
  stateScheme: any;
  stateData: any;
  schemeData: any;
};

const ConsPage: React.FC<Props> = ({
  query,
  stateData,
  stateScheme,
  schemeData,
}) => {
  const { state, sabha, cons } = query;

  const tabData = React.useMemo(
    () => [
      {
        value: 'overview',
        name: 'Overview',
        altName: 'Key Highights of Constituency',
        icon: <OverViewIcon size={40} />,
        content: (
          <Overview
            data={stateData}
            schemeData={schemeData}
            queryData={{ state, sabha, cons }}
          />
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
            schemeList={stateScheme[stateData.State]}
          />
        ),
      },
    ],
    [stateData]
  );

  const seo = {
    title: `${cons} . ${state} - Constituency Dashboard`,
    description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${state}`,
  };

  if (!['vidhan', 'lok'].includes(sabha)) return <p>Incorrect URL!</p>;
  return (
    <>
      <Seo seo={seo} />
      {tabData ? (
        <>
          <main className="container">
            <Header
              queryData={{ state, sabha, cons }}
              vidhanData={schemeData?.ac.metadata.consList}
              lokData={schemeData?.pc.metadata.consList}
            />
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
        <>Wrong URL</>
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
  const [stateScheme, stateData, schemeData] = await Promise.all([
    stateSchemeFetch(),
    stateDataFetch('State Info'),
    dataTransform('mgnrega'),
  ]);

  return {
    props: {
      query: queryValue,
      stateData: stateData[0],
      stateScheme,
      schemeData,
    },
  };
};

export default ConsPage;

const Wrapper = styled.div`
  margin-top: 32px;
  background-color: var(--color-background-light);
`;
