import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import ExplorerView from './ExplorerView';
import { newSchemeDataFetch } from 'utils/fetch';
import { SubHeading } from './SubHeading';
import { capitalize, swrFetch } from 'utils/helper';

const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};

const SchemeSelected = ({ queryData, schemeList }) => {
  const { data: schemeRes } = swrFetch(
    `${process.env.NEXT_PUBLIC_CKAN_URL}/package_search?fq=slug:"${queryData.scheme}" AND organization:constituency-wise-scheme-data AND private:false`
  );
  const schemeObj = schemeRes?.result.results[0];

  const newFetcher = () =>
    newSchemeDataFetch(queryData.scheme, queryData.sabha, schemeObj);
  const { data } = useSWR(
    `${queryData.state}/${queryData.scheme}/new`,
    newFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  console.log(data);

  React.useEffect(() => {
    dispatch({
      schemeName: schemeObj?.extras[0].value,
      indicator: queryData.indicator,
    });
  }, [schemeObj, queryData.indicator]);

  React.useEffect(() => {
    if (data) {
      const schemeData = queryData.sabha == 'vidhan' ? data.ac : data.pc;

      if (schemeData.data) {
        const years = Object.keys(
          Object.values(schemeData.data)[0]['state_Obj'][
            capitalize(queryData.state)
          ]
        ).map((item) => ({
          value: item,
          label: item,
        }));

        dispatch({
          schemeData,
          year: years[0].value,
          allYears: years,
        });
      }
    }
  }, [data]);

  const initalState = {
    state: queryData.state || '',
    scheme: queryData.scheme || '',
    sabha: queryData.sabha || 'lok',
    cons: queryData.cons || '',
    cons_name: queryData.cons_name || '',
    schemeName: queryData.scheme
      ? schemeList.filter((e) => e.scheme_slug == queryData.scheme)[0]
          .scheme_name
      : 'Loading...',
    schemeData: '',
    indicator: queryData.indicator ? queryData.indicator : '',
    year: '',
    allYears: [],
    unit: '',
    vizType: 'map',
  };
  const [reducerState, dispatch] = React.useReducer(reducer, initalState);

  return (
    <>
      <SubHeading
        meta={reducerState}
        schemeList={schemeList}
        queryData={queryData}
      />
      <ExplorerWrapper>
        {!reducerState.schemeData ? (
          <div>Loading...</div>
        ) : (
          <>
            <ExplorerView meta={reducerState} dispatch={dispatch} />
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
