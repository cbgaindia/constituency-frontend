import React from 'react';
import styled from 'styled-components';
import { Summary } from 'components/pages/shared';
import Snapshot from './Snapshot';

const Overview = ({ stateData, queryData, schemeList, data }) => {
  const summaryCards = React.useMemo(() => {
    return Object.keys(stateData).reduce(function (result, key) {
      if (key != 'State' && key != 'Description') {
        result.push({
          text: key,
          value: stateData[key],
        });
      }
      return result;
    }, []);
  }, [stateData]); // TODO it's using state data

  return (
    <Wrapper id="overview-wrapper">
      <Main>
        <div>
          <h2>About {queryData.cons}</h2>
        </div>
        <p>{stateData.Description}</p>
      </Main>
      <Summary title="Demographic Highlights" cards={summaryCards.slice(4)} />
      <Snapshot
        meta={queryData}
        indicator={'Opening Balance'}
        schemeList={schemeList}
        consData={data.consData.fiscal_year}
        stateAvg={data.stateAvg}
      />
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
