import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { consListFetch, stateDataFetch } from 'utils/fetch';
import { getParameterCaseInsensitive } from 'utils/helper';

const Header = dynamic(() => import('components/pages/state/Header'), {
  ssr: false,
});

const StateList = dynamic(
  () => import('components/pages/state/StateList/StateList'),
  {
    ssr: false,
  }
);

const Seo = dynamic(() => import('components/common/Seo/Seo'), {
  ssr: false,
});

type Props = {
  query: any;
  consData: any;
  stateData: any;
};

const State: React.FC<Props> = ({ query, consData, stateData }) => {
  const [currentState, setCurrentState] = useState<any>();
  const [currentLokCons, setCurrentLokCons] = useState<any>([]);
  const [currentVidhanCons, setCurrentVidhanCons] = useState<any>([]);
  const state = query.state
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    // get constituencies of current state
    const vidhan = getParameterCaseInsensitive(consData?.vidhan, state);
    const lok = getParameterCaseInsensitive(consData?.lok, state);

    setCurrentVidhanCons(vidhan);
    setCurrentLokCons(lok);
  }, [consData]);

  useEffect(() => {
    // get meta data of current state
    setCurrentState(
      stateData.find((o) => o.State.toLowerCase() == state.toLowerCase())
    );
  }, [stateData]);

  const seo = {
    title: `${state} - Constituency Dashboard`,
    description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${state}`,
  };
  return (
    <>
      <Seo seo={seo} />
      {currentState ? (
        <>
          <main className="container">
            <Header data={currentState} />
            <StateList
              data={{
                lok: currentLokCons,
                vidhan: currentVidhanCons,
                state,
              }}
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
  const [stateData, consData] = await Promise.all([
    stateDataFetch('State Info'),
    consListFetch(),
  ]);

  return {
    props: {
      query: queryValue,
      consData,
      stateData: stateData[0],
    },
  };
};

export default State;
