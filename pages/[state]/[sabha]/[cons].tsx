import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ConsInfo, Header } from 'components/pages/cons';
import { dataTransform, stateDataFetch } from 'utils/fetch';
import { Seo } from 'components/common';
import StateList from 'components/pages/state/StateList';
import { getParameterCaseInsensitive } from 'utils/helper';

type Props = {
  query: any;
  schemeData: any;
  stateData: any;
};

const ConsPage: React.FC<Props> = ({ query, stateData }) => {
  const [currentState, setCurrentState] = useState<any>();
  const [queryData, setQueryData] = useState<any>();
  // const [currentLokCons, setCurrentLokCons] = useState<any>([]);
  // const [currentVidhanCons, setCurrentVidhanCons] = useState<any>([]);

  // useEffect(() => {
  //   // get constituencies of current state
  //   const ac = getParameterCaseInsensitive(
  //     schemeData?.ac.metadata.consList,
  //     state
  //   );
  //   const pc = getParameterCaseInsensitive(
  //     schemeData?.pc.metadata.consList,
  //     state
  //   );

  //   setCurrentVidhanCons(ac);
  //   setCurrentLokCons(pc);
  // }, [schemeData]);

  useEffect(() => {
    const { state, sabha, cons } = query;
    setQueryData({ state, sabha, cons });
  }, [query]);

  useEffect(() => {
    // get meta data of current state
    setCurrentState(
      stateData.find(
        (o) => o.State.toLowerCase() == queryData?.state.toLowerCase()
      )
    );
  }, [queryData]);
  console.log(queryData);

  const seo = {
    title: `${queryData?.cons} . ${queryData?.state} - Constituency Dashboard`,
    description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${queryData?.state}`,
  };

  if (!['vidhan', 'lok'].includes(queryData?.sabha))
    return <p>Incorrect URL!</p>;
  return (
    <>
      <Seo seo={seo} />
      {currentState ? (
        <>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="container">
            <Header queryData={queryData} />
            <ConsInfo
              data={currentState}
              queryData={queryData}
              share={false}
            />
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
  const [stateData] = await Promise.all([
    stateDataFetch('State Info'),
    // dataTransform('mgnrega'),
  ]);

  return {
    props: {
      query: queryValue,
      // schemeData,
      stateData: stateData[0],
    },
  };
};

export default ConsPage;
