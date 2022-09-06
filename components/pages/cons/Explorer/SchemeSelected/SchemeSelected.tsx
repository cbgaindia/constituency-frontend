import { Search } from 'components/data';
import ExplorerViz from 'components/pages/cons/Explorer/SchemeSelected/StateView';
import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { dataTransform } from 'utils/fetch';

const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};

const SchemeSelected = ({ schemeName, queryData }) => {
  const fetcher = (url: string) => dataTransform(schemeName);
  const { data } = useSWR(`${queryData.state}/${schemeName}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const initalState = {
    state: queryData.state || '',
    scheme: schemeName || '',
    schemeData: '',
    sabha: queryData.sabha || 'lok',
    indicator: '',
    year: '',
    unit: '',
    constituency: '',
    consCode: '',
    vizType: 'map',
  };

  const [state, dispatch] = React.useReducer(reducer, initalState);

  return (
    <>
      <SearchWrapper>
        <Search
          onChange={(e) => {}}
          placeholder={'Search here...'}
          aria-label="Search"
        />
      </SearchWrapper>

      <ExplorerWrapper>
        {!data ? (
          <div>Loading...</div>
        ) : (
          <ExplorerViz schemeRaw={data} meta={state} dispatch={dispatch} />
        )}
      </ExplorerWrapper>
    </>
  );
};

export default SchemeSelected;

const SearchWrapper = styled.div`
  margin-top: 32px;
  padding: 12px;
  background-color: var(--color-background-lighter);
  border: var(--border-2);
  box-shadow: var(--box-shadow-1);
  border-radius: 4px;
`;

const ExplorerWrapper = styled.div`
  margin-top: 32px;
`;
