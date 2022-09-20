import React from 'react';
import styled from 'styled-components';
import { Summary } from 'components/pages/shared';
import Snapshot from './Snapshot';

const Overview = ({ data, queryData }) => {
  const summaryCards = React.useMemo(() => {
    return Object.keys(data).reduce(function (result, key) {
      if (key != 'State' && key != 'Description') {
        result.push({
          text: key,
          value: data[key],
        });
      }
      return result;
    }, []);
  }, [data]);

  return (
    <Wrapper id="overview-wrapper">
      <Main>
        <div>
          <h2>About {queryData.cons}</h2>
        </div>
        <p>{data.Description}</p>
      </Main>
      <Summary title="Demographic Highlights" cards={summaryCards.slice(4)} />
      <Snapshot meta={queryData} indicator={'opening-balance'} />
    </Wrapper>
  );
};

export { Overview };

export const Wrapper = styled.div`
  margin-top: 40px;
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
