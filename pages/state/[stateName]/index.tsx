import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

import Header from 'components/pages/state/Header';
import SchemeList from 'components/pages/state/SchemeList';
import { Button } from 'components/actions';
import { Banner } from 'components/layouts';
import { stateDataFetch, stateSchemeFetch } from 'utils/fetch';

type Props = {
  stateScheme: any;
  stateData: any;
  query: any;
};

const Datasets: React.FC<Props> = ({ query, stateScheme, stateData }) => {
  const [currentState, setCurrentState] = useState<any>();
  const state = query.stateName;

  useEffect(() => {
    setCurrentState(
      stateData.find((o) => o.State.toLowerCase() == state.toLowerCase())
    );
  }, [stateData]);

  const bannerDetails = {
    heading:
      'Do you know what is the Total Available Fund for Swachh Bharat Mission - Gramin (SBM-G) for Uttar Pradesh?',
    content: (
      <Button kind="secondary" size="sm">
        Explore Now
      </Button>
    ),
    image: '/assets/images/banner.png',
  };

  return currentState ? (
    <>
      <Head>
        <title>{currentState.State || 'State'} | Constituency Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper className="container">
        <Header data={currentState} />
        <SchemeList
          data={stateScheme[currentState.State]}
          state={currentState.State}
        />
        {/* <Banner details={bannerDetails} /> */}
      </Wrapper>
    </>
  ) : (
    <></>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query || {};
  const stateScheme = await stateSchemeFetch();
  const stateData = await stateDataFetch();
  return {
    props: {
      query,
      stateScheme,
      stateData,
    },
  };
};

export default Datasets;

const Wrapper = styled.main`
  .banner {
    margin-top: 32px;
    margin-bottom: 212px;
  }
`;
