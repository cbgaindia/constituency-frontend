import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

import { fetchDatasets, convertToCkanSearchQuery } from 'utils/fetch';

import Header from 'components/pages/state/Header';
import SchemeList from 'components/pages/state/SchemeList';
import { Button } from 'components/actions';
import { Banner } from 'components/layouts';
import { BannerWrapper } from 'components/layouts/Banner';

type Props = {
  data: any;
  query: any;
};

const Datasets: React.FC<Props> = ({ data, query }) => {
  const state = query.stateName;
  const { results } = data.result;

  const bannerDetails = {
    heading:
      'Do you know what is the Total Available Fund for Swachh Bharat Mission - Gramin (SBM-G) for Uttar Pradesh?',
    content: (
      <Button kind="secondary" size="sm">
        Explore Now
      </Button>
    ),
    image: '/assets/images/banner.png',
  };

  function stateName(id) {
    switch (id) {
      case 'up':
        return 'uttar pradesh';
      default:
        return id;
    }
  }

  const headerData = {
    title: stateName(state),
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
        <SchemeList data={results} url={state} />
        <Banner details={bannerDetails} />
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

const Wrapper = styled.main`
  .banner{
    margin-top: 32px;
    margin-bottom: 212px;
  }
`;
