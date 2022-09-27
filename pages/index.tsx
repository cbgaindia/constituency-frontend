import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HomeHeader } from 'components/pages/home';
import { GetStaticProps } from 'next';
import { consListFetch, fetchQuery } from 'utils/fetch';

const HomeStates = dynamic(
  () => import('components/pages/home/HomeStates/HomeStates'),
  {
    ssr: false,
  }
);

const Seo = dynamic(() => import('components/common/Seo/Seo'), {
  ssr: false,
});

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
        <HomeStates />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const jsonUrl = await fetchQuery('schemeType', 'Cons Info').then(
    (res) => res[0].resources.filter((e) => e.format == 'JSON')[0].url
  );
  const jsonData = await fetch(jsonUrl).then((res) => res.json());

  return {
    props: {
      stateData: jsonData,
    },
  };
};
