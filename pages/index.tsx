import Head from 'next/head';
import styled from 'styled-components';
import React from 'react';
import { HomeAbout, HomeHeader, HomeHighlight, HomeQuiz, HomeStates } from 'components/pages/home';

export default function Home() {
  return (
    <>
      <Head>
        <title>Constituency Dashboard</title>
      </Head>
      <HomePage>
        <HomeHeader />
        <HomeHighlight />
        <HomeAbout />
        <HomeStates />
        <HomeQuiz />
      </HomePage>
    </>
  );
}

const HomePage = styled.main``;
