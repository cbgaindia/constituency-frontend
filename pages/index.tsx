import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { dataTransform } from 'utils/fetch';

const HomeStates = dynamic(() => import('components/pages/home/HomeStates'), {
  ssr: false,
});

const HomeHeader = dynamic(() => import('components/pages/home/HomeHeader'), {
  ssr: false,
});

const Seo = dynamic(() => import('components/common/Seo/Seo'), {
  ssr: false,
});

export default function Home({ schemeData }) {
  const seo = {
    title: 'Welcome - Constituency Dashboard',
    description:
      'A unique, one-of-its-kind dashboard that opens up constituency-wise fiscal information for several centrally sponsored and central sector schemes.',
  };

  return (
    <>
      <Seo seo={seo} />
      <main>
        <HomeHeader schemeData={schemeData} />
        <HomeStates />
        {/* <HomeAbout /> */}
        {/* <HomeHighlight /> */}
        {/* <HomeQuiz /> */}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  const schemeData = await dataTransform('mgnrega');

  return {
    props: {
      schemeData,
    },
  };
};
