import React from 'react';
import { GetServerSideProps } from 'next';
import { stateSchemeFetch } from 'utils/fetch';
import { HomeAbout, HomeHeader, HomeStates } from 'components/pages/home';
import { Seo } from 'components/common';

export default function Home({ stateData }) {
  const seo = {
    title: 'Welcome - Constituency Dashboard',
    description:
      'A unique, one-of-its-kind dashboard that opens up constituency-wise fiscal information for several centrally sponsored and central sector schemes.',
  };

  return (
    <>
      <Seo seo={seo} />
      <main>
        <HomeHeader stateData={stateData} />
        <HomeAbout />
        {/* <HomeHighlight /> */}
        <HomeStates />
        {/* <HomeQuiz /> */}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const stateData = await stateSchemeFetch();

  return {
    props: {
      stateData,
    },
  };
};
