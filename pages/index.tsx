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
import { Seo } from 'components/common';

export default function Home({ stateData }) {
  console.log(stateData);
  
  const seo = {
    title: 'Welcome - Constituency Dashboard',
    description:
      'A unique, one-of-its-kind dashboard that opens up constituency-wise fiscal information for several centrally sponsored and central sector schemes.',
  };

  return (
    <>
      <Seo seo={seo} />
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
