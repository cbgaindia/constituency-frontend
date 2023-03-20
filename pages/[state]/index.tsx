import Header from 'components/pages/state/Header';
import StateList from 'components/pages/state/StateList/StateList';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import { fetchJSON, stateMetadataFetch } from 'utils/fetch';
import { capitalize, getParameterCaseInsensitive } from 'utils/helper';

type Props = {
  pathName: string;
  constList: any;
  stateData: any;
};

const State: React.FC<Props> = ({ pathName, constList, stateData }) => {
  const [currentLokCons, setCurrentLokCons] = useState<any>([]);
  const [currentVidhanCons, setCurrentVidhanCons] = useState<any>([]);
  const state = pathName;

  useEffect(() => {
    // get constituencies of current state
    if (constList) {
      const vidhan = getParameterCaseInsensitive(constList?.vidhan, state);
      const lok = getParameterCaseInsensitive(constList?.lok, state);
      setCurrentVidhanCons(vidhan);
      setCurrentLokCons(lok);
    }
  }, [constList]);

  return (
    <>
      {constList && (
        <>
          <main className="container">
            <Header data={stateData} />
            <StateList
              data={{
                lok: currentLokCons,
                vidhan: currentVidhanCons,
                state,
              }}
            />
          </main>
        </>
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const stateData = await stateMetadataFetch();
  return {
    paths: stateData.map((obj) => ({
      params: {
        state: obj.State.replace(/\s+/g, '-').toLowerCase(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { state }: any = params;
  const stateNormalised = state.replaceAll('-', ' ');
  try {
    const stateData = await stateMetadataFetch(stateNormalised);

    const jsonData: any = await fetchJSON('Cons Info');
    const finalJSON = {
      lok: { [state]: jsonData.lok[state] },
      vidhan: { [state]: jsonData.vidhan[state] },
    };

    return finalJSON
      ? {
          props: {
            pathName: state,
            constList: finalJSON,
            stateData,
            meta: {
              title: `${capitalize(
                state.replaceAll('-', ' ')
              )} - Constituency Dashboard`,
              description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${state}`,
            },
          },
        }
      : { notFound: true };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default State;
