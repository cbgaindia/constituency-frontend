import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { fetchQuery } from 'utils/fetch';
import styled from 'styled-components';
import {
  HomeAbout,
  HomeHeader,
  HomeHighlight,
  HomeQuiz,
  HomeStates,
} from 'components/pages/home';

export default function Home({ statesData }) {
  return (
    <>
      <Head>
        <title>Constituency Dashboard</title>
      </Head>
      <HomePage>
        <HomeHeader statesData={statesData} />
        <HomeAbout />
        {/* <HomeHighlight /> */}
        <HomeStates />
        {/* <HomeQuiz /> */}
        <BGSpace />
      </HomePage>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stateList = await fetchQuery(
    'schemeType',
    'Centrally Sponsored Scheme'
  );

  return {
    props: {
      statesData: stateList.map((scheme) => ({
        state: scheme.extras[3].value,
        scheme_name: scheme.extras[0].value,
        slug: scheme.extras[2].value,
      })),
    },
  };
};

const HomePage = styled.main``;
const BGSpace = styled.div`
  height: 304px;
  width: 100%;
  background-color: #d9e2de;
`;
