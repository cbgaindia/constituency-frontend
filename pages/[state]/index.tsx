import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';

import { consListFetch, stateDataFetch } from 'utils/fetch';
import { getParameterCaseInsensitive } from 'utils/helper';
import Header from 'components/pages/state/Header';
import StateList from 'components/pages/state/StateList/StateList';

const Seo = dynamic(() => import('components/common/Seo/Seo'), {
  ssr: false,
});

type Props = {
  pathName: string;
  consData: any;
  stateData: any;
};

const State: React.FC<Props> = ({ pathName, consData, stateData }) => {
  const [currentLokCons, setCurrentLokCons] = useState<any>([]);
  const [currentVidhanCons, setCurrentVidhanCons] = useState<any>([]);
  const state = pathName?.toLowerCase();

  useEffect(() => {
    // get constituencies of current state
    if (consData) {
      const vidhan = getParameterCaseInsensitive(consData?.vidhan, state);
      const lok = getParameterCaseInsensitive(consData?.lok, state);
      setCurrentVidhanCons(vidhan);
      setCurrentLokCons(lok);
    }
  }, [consData]);

  const seo = {
    title: `${state?.replace(/\b\w/g, (c) =>
      c.toUpperCase()
    )} - Constituency Dashboard`,
    description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${state}`,
  };

  return (
    <>
      <Seo seo={seo} />
      {consData && (
        <>
          <main className="container">
            <Header data={stateData} />
            <StateList
              data={{
                lok: currentLokCons,
                vidhan: currentVidhanCons,
                state,
              }}
            />
          </main>
        </>
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const stateData = await stateDataFetch();
  return {
    paths: stateData.map((obj) => ({
      params: {
        state: obj.State.toLowerCase(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { state } = params;

  try {
    const [stateData, consData] = await Promise.all([
      stateDataFetch(state),
      consListFetch(state),
    ]);
    return consData
      ? { props: { pathName: state, consData: consData, stateData } }
      : { notFound: true };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default State;
