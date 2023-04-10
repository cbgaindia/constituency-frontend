import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import styled from 'styled-components';

import {
  consDescFetch,
  consIndicatorFetch,
  stateDataFetch,
  stateSchemeFetch,
} from 'utils/fetch';

import {
  Explorer as ExplorerIcon,
  Overview as OverViewIcon,
} from 'components/icons';
import { Toolbar } from 'components/layouts/Toolbar';
import { Overview } from 'components/pages/cons';
import { Header } from 'components/pages/cons/Header';
import { SORTED_SCHEMES } from 'config/year';
import { useRouter } from 'next/router';
import { capitalize } from 'utils/helper';

const Explorer = dynamic(
  () => import('components/pages/cons/Explorer/Explorer'),
  {
    ssr: false,
  }
);

type Props = {
  stateScheme: any;
  consHighlights: any;
  schemeData: any;
  data: any;
  remarks: any;
  orderedList;
  any;
};
export const ConstituencyPage = React.createContext(null);

const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};

const ConsPage: React.FC<Props> = ({
  consHighlights,
  stateScheme,
  data,
  remarks,
}) => {
  const router = useRouter();
  const { state, sabha, scheme, cons, indicator }: any = router.query;

  const initialProps = React.useMemo(
    () => ({
      indicator: indicator || 'budget-utilisation',
      scheme: scheme || '',
      year: '',
      consData: data['consData'],
    }),
    [indicator, scheme]
  );
  const [view, setView] = useState('overview');
  const [metaReducer, dispatch] = React.useReducer(reducer, initialProps);
  const { constituency_name: cons_name } = data['consData'];

  async function handleToolbarSwitch(e: string, cardIndicator = null) {
    if (cardIndicator) {
      await router.push({
        pathname: `/${state}/${sabha}/${cons}`,
        query: {
          scheme: showScheme(e),
          indicator: cardIndicator,
        },
      });
      setView('explorer');
      return;
    }

    function isTabbed(val: string) {
      if (['explorer', 'overview'].includes(val)) return true;
      return false;
    }

    function showScheme(val) {
      if (isTabbed(val)) {
        if (scheme) return scheme;
        return '';
      }
      if (val == 'list') return '';
      return val;
    }

    const tabState = isTabbed(e) ? e : 'explorer';
    setView(tabState);

    await router.push({
      pathname: `/${state}/${sabha}/${cons}`,
      query: {
        scheme: showScheme(e),
        indicator,
      },
    });

    window.scrollTo(0, 0);
  }

  const tabData = React.useMemo(
    () => [
      {
        value: 'overview',
        name: 'Overview',
        altName: 'Key Highights of Constituency',
        icon: <OverViewIcon size={40} />,
        content: (
          <ConstituencyPage.Provider
            value={{
              toolbar: handleToolbarSwitch,
              meta: { metaReducer, dispatch },
            }}
          >
            <Overview
              consHighlights={consHighlights}
              queryData={{ ...router.query, cons_name }}
              schemeList={stateScheme}
              data={data}
              remarks={remarks}
            />
          </ConstituencyPage.Provider>
        ),
      },
      {
        value: 'explorer',
        name: 'Explorer',
        altName: 'Scheme Data of Constituency',
        icon: <ExplorerIcon size={40} />,
        content: (
          <ConstituencyPage.Provider
            value={{
              metaReducer: { obj: metaReducer, dispatch },
            }}
          >
            <Explorer
              queryData={{ ...router.query, cons_name }}
              schemeList={stateScheme}
            />
          </ConstituencyPage.Provider>
        ),
      },
    ],
    [consHighlights, metaReducer]
  );

  return (
    <>
      {
        <>
          <main className="container">
            <Header queryData={{ state, sabha, cons, cons_name }} />
            <Wrapper id="consPageWrapper">
              <Toolbar
                value={view}
                onValueChange={(e) => handleToolbarSwitch(e)}
                fullScreenId="consPageWrapper"
                data={tabData}
              />
            </Wrapper>
          </main>
        </>
      }
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const queryValue: any = query || {};
  if (!['vidhan', 'lok'].includes(queryValue.sabha)) return { notFound: true };

  const [stateScheme, consHighlights, stateData, remarks] = await Promise.all([
    stateSchemeFetch(queryValue.state.replaceAll('-', ' ')),
    consIndicatorFetch(queryValue.state, queryValue.cons, queryValue.sabha),
    stateDataFetch(queryValue.state, queryValue.sabha),
    consDescFetch(queryValue.sabha, queryValue.state, queryValue.cons),
  ]);

  const cons_details = stateData['constituency_data'][queryValue.cons];

  if (!(consHighlights && stateScheme && queryValue.cons && cons_details))
    return { notFound: true };
  const list = SORTED_SCHEMES;
  const orderedList = list.filter((e) =>
    stateScheme.find((elm) => elm.scheme_slug === e.scheme_slug)
  );
  return {
    props: {
      consHighlights: consHighlights,
      stateScheme: orderedList,
      data: {
        consData: cons_details,
        stateAvg: stateData['state_avg'],
      },
      remarks,
      meta: {
        title: `${capitalize(cons_details.constituency_name)} . ${capitalize(
          queryValue.state
        )} - Constituency Dashboard`,
        description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${queryValue.state}`,
      },
    },
  };
};

export default ConsPage;

const Wrapper = styled.div`
  margin-top: 32px;
  background-color: var(--color-background-light);
`;
