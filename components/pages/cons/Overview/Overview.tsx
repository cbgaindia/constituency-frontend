import React from 'react';
import styled from 'styled-components';
import { Summary } from 'components/pages/shared';
import Snapshot from './Snapshot';

const Overview = ({
  consHighlights,
  queryData,
  schemeList,
  data,
  remarks,
}) => {
  const summaryCards = React.useMemo(() => {
    return Object.keys(consHighlights).reduce(function (result, key) {
      if (
        key != 'state_name' &&
        key != 'constituency_type' &&
        key != 'constituency_code'
      ) {
        result.push({
          text: key,
          value: consHighlights[key],
        });
      }
      return result;
    }, []);
  }, [consHighlights]);

  return (
    <Wrapper id="overview-wrapper">
      <Main>
        <div>
          <h2>About {queryData.cons_name}</h2>
        </div>
        <p>{remarks}</p>
      </Main>
      <Summary title="Demographic Highlights" cards={summaryCards} />
      <Snapshot
        queryData={queryData}
        schemeList={schemeList}
        consData={data.consData?.fiscal_year}
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
