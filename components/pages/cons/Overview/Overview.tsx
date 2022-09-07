import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { Summary } from 'components/pages/shared';
import Snapshot from './Snapshot';

const Overview = ({ data, queryData, schemeData }) => {
  const summaryCards = [
    {
      text: 'Parliamentary Constituencies',
      value: `${data['Parliamentary Constituencies']}`,
    },
    {
      text: 'Assembly Constituencies',
      value: `${data['Assembly Constituencies']}`,
    },
    {
      text: 'Population (July 2022) (In Cr.)',
      value: `${data['Population (July 2022) (In Cr.)']}`,
    },
    {
      text: 'Area (In Square KM.)',
      value: `${data['Area (In Square KM.)']}`,
    },
  ];

  return (
    <Wrapper>
      <article>
        {data.State && (
          <figure>
            <Image
              src={`/assets/states/${data.State.toLowerCase()}.jpg`}
              width={144}
              height={144}
              alt=""
              className="img-cover"
            />
          </figure>
        )}
        <Main>
          <div>
            <h2>About {queryData.cons}</h2>
          </div>
          <p>{data.Description}</p>
        </Main>
      </article>
      <Summary title="Demographic Highlights" cards={summaryCards} />
      <Snapshot
        schemeData={schemeData}
        meta={queryData}
        indicator={'opening-balance'}
      />
    </Wrapper>
  );
};

export default Overview;

export const Wrapper = styled.div`
  margin-top: 40px;

  article {
    display: flex;
    gap: 32px;
    align-items: flex-start;

    figure {
      display: inline-block;
      min-width: 160px;
      top: 10px;
      position: sticky;

      padding: 8px;
      filter: drop-shadow(var(--box-shadow-1));
      border-radius: 4px;
      background-color: var(--color-background-lighter);
      font-size: 0;

      @media (max-width: 673px) {
        display: none;
      }
    }
  }
`;

const Main = styled.section`
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.24;
    text-transform: capitalize;
  }

  p {
    letter-spacing: 0.01em;
  }
`;
