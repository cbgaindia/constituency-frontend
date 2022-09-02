import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { Seo } from 'components/common';
import styled from 'styled-components';
import {
  Overview as OverViewIcon,
  Explorer as ExplorerIcon,
} from 'components/icons';
import { Toolbar } from 'components/layouts';
import { upperCaseString } from 'utils/helper';
import { Overview, Header } from 'components/pages/cons';
import { dataTransform, stateDataFetch, stateSchemeFetch } from 'utils/fetch';
import { Explorer } from 'components/pages/cons/Explorer';

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
  const [queryData, setQueryData] = React.useState<any>();

  React.useEffect(() => {
    const { state, sabha, cons } = query;
    setQueryData({
      state: upperCaseString(state),
      sabha,
      cons: upperCaseString(cons),
    });
  }, [query]);

  const currentState = React.useCallback(
    stateData.find(
      (o) => o.State.toLowerCase() == queryData?.state.toLowerCase()
    ),
    [queryData]
  );

  const tabData = React.useMemo(
    () => [
      {
        value: 'overview',
        name: 'Overview',
        altName: 'Key Highights of Constituency',
        icon: <OverViewIcon size={40} />,
        content: (
          <Overview
            data={currentState}
            schemeData={schemeData}
            queryData={queryData}
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
            queryData={queryData}
            data={stateScheme[currentState?.State]}
          />
        ),
      },
    ],
    [currentState]
  );

  const seo = {
    title: `${queryData?.cons} . ${queryData?.state} - Constituency Dashboard`,
    description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${queryData?.state}`,
  };

  if (!['vidhan', 'lok'].includes(queryData?.sabha))
    return <p>Incorrect URL!</p>;
  return (
    <>
      <Seo seo={seo} />
      {tabData ? (
        <>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="container">
            <Header queryData={queryData} />
            <Wrapper>
              <Toolbar
                defaultValue="overview"
                fullScreenId="stateListWrapper"
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
`;
