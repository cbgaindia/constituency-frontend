import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import ExplorerView from './ExplorerView';
import { dataTransform } from 'utils/fetch';
import { SubHeading } from './SubHeading';
import { swrFetch } from 'utils/helper';

const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};

const SchemeSelected = ({ schemeSlug, queryData, schemeList }) => {
  const { data: schemeRes } = swrFetch(
    `${process.env.NEXT_PUBLIC_CKAN_URL}/package_search?fq=slug:"${schemeSlug}" AND organization:constituency-wise-scheme-data AND private:false`
  );
  const schemeObj = schemeRes?.result.results[0];

  const fetcher = () =>
    dataTransform(schemeSlug, queryData.sabha || 'lok', schemeObj);
  const { data } = useSWR(`${queryData.state}/${schemeSlug}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  React.useEffect(() => {
    dispatch({ schemeName: schemeObj?.extras[0].value });
  }, [schemeObj]);

  const initalState = {
    state: queryData.state || '',
    scheme: schemeSlug || '',
    sabha: queryData.sabha || 'lok',
    constituency: queryData.cons || '',
    schemeName: 'Loading...',
    schemeData: '',
    indicator: '',
    year: '',
    allYears: [],
    unit: '',
    consCode: '',
    vizType: 'map',
  };
  const [state, dispatch] = React.useReducer(reducer, initalState);

  return (
    <>
      {<SubHeading meta={state} schemeList={schemeList} />}
      <ExplorerWrapper>
        {!data ? (
          <div>Loading...</div>
        ) : (
          <>
            <ExplorerView schemeRaw={data} meta={state} dispatch={dispatch} />
          </>
        )}
      </ExplorerWrapper>
    </>
  );
};

export default SchemeSelected;

const ExplorerWrapper = styled.div`
  margin-top: 32px;
`;
