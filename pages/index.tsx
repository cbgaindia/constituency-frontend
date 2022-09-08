import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { consListFetch } from 'utils/fetch';
import useSWR from 'swr';

const HomeStates = dynamic(
  () => import('components/pages/home/HomeStates/HomeStates'),
  {
    ssr: false,
  }
);

const HomeHeader = dynamic(
  () => import('components/pages/home/HomeHeader/HomeHeader'),
  {
    ssr: false,
  }
);

const Seo = dynamic(() => import('components/common/Seo/Seo'), {
  ssr: false,
});

export default function Home({ consData }) {
  const seo = {
    title: 'Welcome - Constituency Dashboard',
    description:
      'A unique, one-of-its-kind dashboard that opens up constituency-wise fiscal information for several centrally sponsored and central sector schemes.',
  };

  console.log(consData);

  return (
    <>
      <Seo seo={seo} />
      <main>
        <HomeHeader consData={consData} />
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
  const consData = await consListFetch();

  return {
    props: {
      consData,
    },
  };
};
