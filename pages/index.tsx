import { HomeHeader } from 'components/pages/home';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { fetchJSON } from 'utils/fetch';

const HomeStates = dynamic(
  () => import('components/pages/home/HomeStates/HomeStates'),
  {
    ssr: false,
  }
);

export default function Home({ constList }) {
  return (
    <>
      <main>
        <HomeHeader constList={constList} />
        <HomeStates />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const jsonData = await fetchJSON('Cons Info');

  return {
    props: {
      constList: jsonData,
      meta: {
        title: 'Welcome - Constituency Dashboard',
        description:
          'A unique, one-of-its-kind dashboard that opens up constituency-wise fiscal information for several centrally sponsored and central sector schemes.',
      },
    },
  };
};
