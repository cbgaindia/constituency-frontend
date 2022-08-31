import { Menu } from 'components/actions';
import { Indicator } from 'components/data';
import React from 'react';
import styled from 'styled-components';

type Props = {
  indicator: string;
  schemeData: any;
};

const Snapshot = ({ schemeData, indicator }: Props) => {
  const [selectedIndicator, setSelectedIndicator] = React.useState(indicator);
  const [selectedYear, setSelectedYear] = React.useState('2018-19');
  const tempYears = [
    {
      title: '2018-19',
      value: '2018-19',
    },
    {
      title: '2019-20',
      value: '2019-20',
    },
  ];

  return (
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
              <Menu
                value={selectedYear}
                options={tempYears}
                heading="Financial Year:"
                handleChange={(e) => setSelectedYear(e)}
              />
            </SnapshotSchemeTitle>
          </SnapshotSchemes>
        </SnapshotWrapper>
      )}
    </section>
  );
};

export default Snapshot;

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
    min-width: 312px;
    width: 312px;
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

  display: flex;
  align-items: center;
  justify-content: space-between;

  h4 {
    border-bottom: var(--border-2);
    padding-bottom: 16px;
    flex-grow: 1;
  }

  > div {
    > span {
      border-bottom: var(--border-2);
      padding-bottom: 16px;
    }
  }
`;
