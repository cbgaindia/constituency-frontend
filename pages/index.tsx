import Head from 'next/head';
import styled from 'styled-components';
import React from 'react';
import {
  HomeAbout,
  HomeHeader,
  HomeHighlight,
  HomeQuiz,
  HomeStates,
} from 'components/pages/home';

export default function Home() {
  return (
    <>
      <Head>
        <title>Constituency Dashboard</title>
      </Head>
      <HomePage>
        <HomeHeader />
        <HomeAbout />
        <HomeHighlight />
        <HomeStates />
        <HomeQuiz />
        <BGSpace />
      </HomePage>
    </>
  );
}

const HomePage = styled.main``;
const BGSpace = styled.div`
  height: 304px;
  width: 100%;
  background-color: #d9e2de;
`;
