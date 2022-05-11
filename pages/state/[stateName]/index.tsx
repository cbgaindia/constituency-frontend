import React, { useContext, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { GlobalContext } from 'pages/_app';

import Header from 'components/pages/state/Header';
import SchemeList from 'components/pages/state/SchemeList';
import { Button } from 'components/actions';
import { Banner } from 'components/layouts';

type Props = {
  data: any;
  query: any;
};

const Datasets: React.FC<Props> = ({ query }) => {
  const [currentState, setCurrentState] = useState<any>();
  const state = query.stateName;
  const { stateData, stateScheme } = useContext(GlobalContext);

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
          data={stateScheme[currentState.State.toLowerCase()]}
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
  return {
    props: {
      query,
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
