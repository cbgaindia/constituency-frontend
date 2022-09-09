import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { consListFetch } from 'utils/fetch';
import { HomeHeader } from 'components/pages/home';

const HomeStates = dynamic(
  () => import('components/pages/home/HomeStates/HomeStates'),
  {
    ssr: false,
  }
);

const Seo = dynamic(() => import('components/common/Seo/Seo'), {
  ssr: false,
});

export default function Home() {
  const seo = {
    title: 'Welcome - Constituency Dashboard',
    description:
      'A unique, one-of-its-kind dashboard that opens up constituency-wise fiscal information for several centrally sponsored and central sector schemes.',
  };

  return (
    <>
      <Seo seo={seo} />
      <main>
        <HomeHeader />
        <HomeStates />
        {/* <HomeAbout /> */}
        {/* <HomeHighlight /> */}
        {/* <HomeQuiz /> */}
      </main>
    </>
  );
}
