import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { fetchAPI, explorerPopulation, fetchFromTags } from 'utils/explorer';
import { resourceGetter } from 'utils/resourceParser';

import {
  ExplorerHeader,
  ExplorerViz,
} from 'components/pages/explorer';
import SchemeSelector from 'components/pages/shared/SchemeSelector';
import {
  HeaderControls,
  SchemesMenu,
} from 'components/pages/shared/SchemeSelector/SchemeSelector';

type Props = {
  data: any;
  meta: any;
  fileData: any;
};

const headerData = {
  content:
    'It is the most populated state in India, as well as the most populous country subdivision in the world. The state is bordered by Rajasthan to the west, Haryana, Himachal Pradesh and Delhi to the northwest, Uttarakhand and an international border with Nepal to the north, Bihar to the east, Madhya Pradesh to the south, and touches the states of Jharkhand and Chhattisgarh to the southeast.',
};

const Explorer: React.FC<Props> = ({ data, meta, fileData }) => {
  return (
    <>
      <Head>
        <title>Explorer | Constituency Dashboard</title>
      </Head>
      <Wrapper>
        <div className="container">
          <SchemeSelector suggestion={false} sabha={false} />

          {Object.keys(data).length !== 0 ? (
            <>
              <ExplorerHeader />
              <ExplorerViz data={data} meta={meta} fileData={fileData} />
            </>
          ) : (
            <></>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // fetch dataset
  const dataRes = await fetchAPI(context.query.id);

  let data: any = {};
  let fileData: any = {};
  const meta = {};

  if (dataRes.success) {
    data = explorerPopulation(dataRes.result);

    // fetch and parse metadata csv
    const metaRes = await resourceGetter(data.metaUrl);
    metaRes.forEach((elm) => {
      meta[elm[0]] = elm[1] || '';
    });

    // fetch and parse data csv
    fileData = await resourceGetter(data.dataUrl, true);

    // generate indicators
    const indicators = [
      ...Array.from(
        new Set(
          fileData.map((item: { indicators: any }) => item.indicators || null)
        )
      ),
    ];

    data.indicators = indicators;
  }

  return {
    props: {
      data,
      meta,
      fileData,
    },
  };
};

export default Explorer;

const Wrapper = styled.main`
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
