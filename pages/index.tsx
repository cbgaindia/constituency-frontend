import React from 'react';
import { GetServerSideProps } from 'next';
import { dataTransform, stateSchemeFetch } from 'utils/fetch';
import { HomeAbout, HomeHeader, HomeStates } from 'components/pages/home';
import { Seo } from 'components/common';
// import { Button } from '@opub-cdl/design-system';

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
