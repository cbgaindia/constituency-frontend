import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import ExplorerView from './ExplorerView';
import { dataTransform } from 'utils/fetch';
import { SubHeading } from './SubHeading';
import { capitalize, swrFetch } from 'utils/helper';

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

  React.useEffect(() => {
    if (data)
      dispatch({
        schemeData: queryData.sabha == 'vidhan' ? data.ac : data.pc,
      });
  }, [data]);

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

  React.useEffect(() => {
    // fill up available financial years for state+sabha
    if (state.schemeData.data) {
      const years = Object.keys(
        Object.values(state.schemeData.data)[0]['state_Obj'][
          capitalize(state.state)
        ]
      ).map((item) => ({
        value: item,
        label: item,
      }));

      dispatch({
        year: state.year ? state.year : years[0].value,
        allYears: years,
      });
    }
  }, [state.schemeData]);

  return (
    <>
      <SubHeading meta={state} schemeList={schemeList} />
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
