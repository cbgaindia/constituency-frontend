import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

import { fetchDatasets, convertToCkanSearchQuery } from 'utils/fetch';

import { DatasetList } from 'components/pages/datasets';
import Header from 'components/pages/state/Header';

type Props = {
  data: any;
  query: any;
};

const Datasets: React.FC<Props> = ({ data, query }) => {
  const { state } = query;
  const { results } = data.result;

  const headerData = {
    title: state,
    content:
      'It is the most populated state in India, as well as the most populous country subdivision in the world. The state is bordered by Rajasthan to the west, Haryana, Himachal Pradesh and Delhi to the northwest, Uttarakhand and an international border with Nepal to the north, Bihar to the east, Madhya Pradesh to the south, and touches the states of Jharkhand and Chhattisgarh to the southeast.',
  };

  return (
    <>
      <Head>
        <title>{state} | Constituency Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper className="container">
        <Header data={headerData} />
        {data && (
          <SchemeList>
            <DatasetList data={results} />
          </SchemeList>
        )}
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query || {};
  const variables = convertToCkanSearchQuery(query);
  const data = await fetchDatasets(variables);
  return {
    props: {
      data,
      query,
    },
  };
};

export default Datasets;

const Wrapper = styled.main``;

const SchemeList = styled.div`
  margin-top: 2.5rem;
`;
