import React from 'react';
import { GetStaticProps } from 'next';
import { dataTransform, stateSchemeFetch } from 'utils/fetch';
import { HomeAbout, HomeHeader, HomeStates } from 'components/pages/home';
import { Seo } from 'components/common';
// import { Button } from '@opub-cdl/design-system';

export default function Home({ schemeData, stateScheme }) {
  const seo = {
    title: 'Welcome - Constituency Dashboard',
    description:
      'A unique, one-of-its-kind dashboard that opens up constituency-wise fiscal information for several centrally sponsored and central sector schemes.',
  };

  return (
    <>
      <Seo seo={seo} />
      <main>
        <HomeHeader stateScheme={stateScheme} schemeData={schemeData} />
        <HomeStates />
        <HomeAbout />
        {/* <HomeHighlight /> */}
        {/* <HomeQuiz /> */}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [schemeData, stateScheme] = await Promise.all([
    dataTransform('mgnrega'),
    stateSchemeFetch(),
  ]);

  return {
    props: {
      schemeData,
      stateScheme,
    },
  };
};
