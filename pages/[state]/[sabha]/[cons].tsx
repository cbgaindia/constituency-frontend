import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ConsInfo, Header, SchemeList } from 'components/pages/cons';
import { stateDataFetch, stateSchemeFetch } from 'utils/fetch';
import { Seo } from 'components/common';
import styled from 'styled-components';
import { LokSabha, VidhanSabha } from 'components/icons';
import { Toolbar } from 'components/layouts';

type Props = {
  query: any;
  stateScheme: any;
  stateData: any;
};

const ConsPage: React.FC<Props> = ({ query, stateData, stateScheme }) => {
  const [currentState, setCurrentState] = useState<any>();
  const [queryData, setQueryData] = useState<any>();
  const [tabData, setTabData] = React.useState<any>();

  useEffect(() => {
    function upperCase(str) {
      return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }
    const { state, sabha, cons } = query;
    setQueryData({ state: upperCase(state), sabha, cons: upperCase(cons) });
  }, [query]);

  useEffect(() => {
    // get meta data of current state
    setCurrentState(
      stateData.find(
        (o) => o.State.toLowerCase() == queryData?.state.toLowerCase()
      )
    );
  }, [queryData]);

  React.useEffect(() => {
    if (currentState)
      setTabData([
        {
          value: 'overview',
          name: 'Overview',
          altName: 'Key Highights of Constituency',
          icon: <VidhanSabha />,
          content: <ConsInfo data={currentState} queryData={queryData} />,
        },
        {
          value: 'explorer',
          name: 'Explorer',
          altName: 'Scheme Data of Constituency',
          icon: <LokSabha />,
          content: (
            <SchemeList
              data={stateScheme[currentState?.State]}
              state={currentState?.State}
            />
          ),
        },
      ]);
  }, [currentState]);

  const seo = {
    title: `${queryData?.cons} . ${queryData?.state} - Constituency Dashboard`,
    description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${queryData?.state}`,
  };

  if (!['vidhan', 'lok'].includes(queryData?.sabha))
    return <p>Incorrect URL!</p>;
  return (
    <>
      <Seo seo={seo} />
      {currentState && tabData ? (
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
  const [stateScheme, stateData] = await Promise.all([
    stateSchemeFetch(),
    stateDataFetch('State Info'),
  ]);

  return {
    props: {
      query: queryValue,
      stateData: stateData[0],
      stateScheme,
    },
  };
};

export default ConsPage;

const Wrapper = styled.div`
  margin-top: 32px;
`;
