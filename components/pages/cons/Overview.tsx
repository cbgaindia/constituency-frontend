import { Indicator } from 'components/data';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { Summary } from '../shared';

const Overview = ({ data, queryData, schemeData }) => {
  const [selectedIndicator, setSelectedIndicator] =
    React.useState('opening-balance');
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
    <HeaderWrapper>
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
      <section>
        <SnapshotTitle>Scheme Performance Snapshots</SnapshotTitle>
        {schemeData && (
          <SnapshotWrapper>
            <Indicator
              newIndicator={(e) => {
                setSelectedIndicator(e);
              }}
              selectedIndicator={selectedIndicator}
              schemeData={schemeData?.ac}
            />
            <SnapshotSchemes>
              <SnapshotSchemeTitle>
                <h4>All Schemes</h4>
              </SnapshotSchemeTitle>
            </SnapshotSchemes>
          </SnapshotWrapper>
        )}
      </section>
    </HeaderWrapper>
  );
};

export { Overview };

export const HeaderWrapper = styled.div`
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

const SnapshotTitle = styled.h3`
  font-size: 2rem;
  line-height: 1.24;
  font-weight: 700;
  margin-top: 32px;
`;

const SnapshotWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 32px;

  > .indicator {
    max-width: 312px;
    max-height: 904px;
    overflow-y: auto;
  }
`;
const SnapshotSchemes = styled.div`
  width: 100%;
`;

const SnapshotSchemeTitle = styled.div`
  background-color: var(--color-background-lighter);
  filter: drop-shadow(var(--box-shadow-1));
  border-radius: 4px;
  border: var(--border-2);
  padding: 16px 24px;
`;
