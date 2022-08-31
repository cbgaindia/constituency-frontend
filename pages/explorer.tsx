import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { ExplorerHeader } from 'components/pages/explorer';
import { dataTransform, stateDataFetch, stateSchemeFetch } from 'utils/fetch';
import { Info } from 'components/icons';

const Seo = dynamic(() => import('components/common/Seo/Seo'), {
  ssr: false,
});

const ExplorerViz = dynamic(
  () => import('components/pages/explorer/ExplorerViz/ExplorerViz'),
  {
    ssr: false,
    loading: () => <p>Loading Explorer...</p>,
  }
);

const ExplorerDetailsViz = dynamic(
  () =>
    import('components/pages/explorer/ExplorerDetailsViz/ExplorerDetailsViz'),
  {
    ssr: false,
  }
);

function verifyState(state) {
  if (
    [
      'Uttar Pradesh',
      'Chhattisgarh',
      'Bihar',
      'Odisha',
      'Maharashtra',
      'Jharkhand',
    ].some((e) => e.toLowerCase() === state.toLowerCase())
  )
    return true;
  return false;
}

const reducer = (state, action) => {
  return { ...state, ...action };
};

type Props = {
  data: any;
  stateData: any;
  scheme: any;
  stateScheme: any;
  constDesc: any;
};

const Explorer: React.FC<Props> = ({
  data,
  scheme,
  stateData,
  stateScheme,
}) => {
  const initalState = {
    state: data.state || '',
    scheme: data.scheme || '',
    schemeData: {},
    sabha: data.sabha || 'lok',
    indicator: '',
    year: '',
    unit: '',
    constituency: '',
    consCode: '',
    vizType: 'map',
    headerData: stateData.find(
      (o: { State: string }) =>
        o.State.toLowerCase() == data.state.toLowerCase()
    ),
  };
  const [state, dispatch] = React.useReducer(reducer, initalState);

  const seo = {
    title: 'Explorer - Constituency Dashboard',
    description:
      'Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies',
  };
  return (
    <>
      <Seo seo={seo} />
      <Wrapper>
        <div className="container">
          <ExplorerHeader
            stateData={state.headerData}
            schemeDesc={scheme[Object.keys(scheme)[0]].metadata['description']}
            scheme={data.scheme}
          />

          {Object.keys(data).length !== 0 && verifyState(data.state) ? (
            <>
              <div id="explorerVizWrapper">
                {state.vizType === 'map' && (
                  <ExplorerViz
                    schemeRaw={scheme}
                    meta={state}
                    dispatch={dispatch}
                  />
                )}

                {state.vizType !== 'map' && (
                  <ExplorerDetailsViz meta={state} dispatch={dispatch} />
                )}
              </div>
            </>
          ) : (
            <NoContext>
              <Info id="infoSvg" fill="#317EB9" height="112" width="112" />
              <div>
                <p>Select state and scheme to explore</p>
              </div>
            </NoContext>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { state, scheme, sabha } = context.query;

  const data: any = {};
  data.state =
    state?.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) || '';
  data.scheme = scheme?.toLowerCase() || '';
  data.sabha = sabha?.toLowerCase() || '';

  const [schemeData, stateScheme, stateData] = await Promise.all([
    dataTransform(data.scheme),
    stateSchemeFetch(),
    stateDataFetch('State Info'),
  ]);

  return {
    props: {
      data,
      scheme: schemeData,
      stateData: stateData[0],
      stateScheme,
    },
  };
};

export default Explorer;

const Wrapper = styled.main`
  min-height: 100vh;
  .indicator-mobile {
    margin-top: 2rem;

    @media (min-width: 980px) {
      display: none;
    }
  }

  .heading {
    margin-bottom: 0.5rem;
    font-weight: 900;
    font-size: 2.5rem;
  }
`;

const NoContext = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;

  p {
    font-weight: 700;
    color: var(--text-light-medium);
  }

  path {
    transform: scale(5);
  }
`;
