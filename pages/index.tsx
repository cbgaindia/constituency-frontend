import React from 'react';
import { stateSchemeFetch } from 'utils/fetch';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import {
  HomeAbout,
  HomeHeader,
  HomeHighlight,
  HomeQuiz,
  HomeStates,
} from 'components/pages/home';

export default function Home({ stateData }) {
  return (
    <>
      <Head>
        <title>Constituency Dashboard</title>
      </Head>
      <HomePage>
        <HomeHeader stateData={stateData} />
        <HomeAbout />
        {/* <HomeHighlight /> */}
        <HomeStates />
        {/* <HomeQuiz /> */}
        {/* <BGSpace /> */}
      </HomePage>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stateData = await stateSchemeFetch();

  return {
    props: {
      stateData,
    },
  };
};

const HomePage = styled.main``;
const BGSpace = styled.div`
  height: 304px;
  width: 100%;
  background-color: #d9e2de;
`;
