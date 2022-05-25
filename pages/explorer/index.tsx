import React, { Suspense } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';

import { ExplorerHeader } from 'components/pages/explorer';
import SchemeSelector from 'components/pages/shared/SchemeSelector';
import {
  HeaderControls,
  SchemesMenu,
} from 'components/pages/shared/SchemeSelector/SchemeSelector';
import {
  consDescFetch,
  dataTransform,
  stateDataFetch,
  stateSchemeFetch,
} from 'utils/fetch';
import { Seo } from 'components/common';
import dynamic from 'next/dynamic';
import { Info } from 'components/icons';

const ExplorerViz = dynamic(
  () => import('components/pages/explorer/ExplorerViz')
);

const ExplorerDetailsViz = dynamic(
  () => import('components/pages/explorer/ExplorerDetailsViz'),
  {
    ssr: false,
  }
);

type Props = {
  data: any;
  stateData: any;
  scheme: any;
  stateScheme: any;
  constDesc: any;
};

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
  else return false;
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'CONS_DESC':
      return { ...state, consDesc: action.payload };
    case 'VIZ_TYPE':
      return { ...state, vizType: action.payload };
    case 'SET_MULTIPLE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const MyContext = React.createContext(null);

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
    consDesc: {},
  };
  const [state, dispatch] = React.useReducer(reducer, initalState);

  React.useEffect(() => {
    consDescFetch().then((res) =>
      dispatch({ type: 'CONS_DESC', payload: res })
    );
  }, []);

  const seo = {
    title: 'Explorer - Constituency Dashboard',
    description:
      'Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies',
  };
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <Seo seo={seo} />
      <Wrapper>
        <div className="container">
          <SchemeSelector
            suggestion={false}
            sabha={false}
            state={data.state}
            scheme={data.scheme}
            stateData={stateScheme}
          />

          {Object.keys(data).length !== 0 && verifyState(data.state) ? (
            <>
              <ExplorerHeader
                stateData={state.headerData}
                schemeDesc={
                  scheme[Object.keys(scheme)[0]].metadata['description']
                }
              />

              <div id="explorerVizWrapper">
                {state.vizType === 'map' && (
                  <ExplorerViz schemeRaw={scheme} meta={state} />
                )}

                {state.vizType !== 'map' && (
                  <ExplorerDetailsViz meta={state} scheme={scheme} />
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
    </MyContext.Provider>
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

  ${HeaderControls} {
    margin-top: 40px;
    padding: 16px;
  }

  ${SchemesMenu} {
    margin-top: 0;
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
