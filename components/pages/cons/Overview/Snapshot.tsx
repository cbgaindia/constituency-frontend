import { Menu } from 'components/actions';
import { Indicator } from 'components/data';
import React from 'react';
import styled from 'styled-components';
import Source from '../Source';
import SnapshotCard from './SnapshotCard';

type Props = {
  indicator: string;
  meta: any;
  schemeList: any;
  consData: any;
  stateAvg: any;
};

const Snapshot = ({
  indicator,
  meta,
  schemeList,
  consData,
  stateAvg,
}: Props) => {
  const [selectedIndicator, setSelectedIndicator] = React.useState(
    'Budget Utilisation'
  );
  const [selectedYear, setSelectedYear] = React.useState(
    Object.keys(consData)[0]
  );

  const yearList = React.useMemo(() => {
    return Object.keys(consData).map((item) => ({
      label: item,
      value: item,
    }));
  }, [consData]);

  // TODO remove temporary indicators
  const tempIndicators = {
    data: [
      {
        name: 'Budget Utilisation',
        description:
          'Amount reported as balance under the scheme by the end of the previous Financial Year (FY)',
        slug: 'indicator_1',
      },
      {
        name: 'Unspent Balance',
        description:
          'Based on the demand from the states / UTs funds are made available by the Union Government for the scheme.',
        slug: 'indicator_2',
      },
      {
        name: 'Total Amount Disbursed to Other Beneficiaries',
        description:
          'Total expenditure incurred on wage payments to labourers',
        slug: 'indicator_3',
      },
      {
        name: 'Total Amount Due',
        description: 'Total expenditure incurred on procuring materials',
        slug: 'indicator_4',
      },
    ],
  };

  function getProgressValue(obj, slug) {
    if (
      obj[selectedYear][slug] &&
      obj[selectedYear][slug][selectedIndicator]
    ) {
      if (obj == stateAvg) return obj[selectedYear][slug][selectedIndicator];
      return Math.abs(obj[selectedYear][slug][selectedIndicator]); // TODO handle negative
    }
    return false;
  }

  return (
    <section>
      <SnapshotTitle>Scheme Performance Snapshots</SnapshotTitle>

      <SnapshotWrapper id="snapshotWrapper">
        <Indicator
          newIndicator={(e) => {
            setSelectedIndicator(e);
          }}
          selectedIndicator={selectedIndicator}
          schemeData={tempIndicators}
          returnName={true}
        />
        <SnapshotSchemes>
          <SnapshotSchemeTitle>
            <h4>All Schemes</h4>
            <Menu
              value={selectedYear}
              options={yearList}
              heading="Financial Year:"
              handleChange={(e) => setSelectedYear(e)}
            />
          </SnapshotSchemeTitle>
          <SnapshotSchemeList>
            {schemeList &&
              schemeList.map((item) => (
                <SnapshotCard
                  key={item.scheme_slug}
                  data={{
                    ...item,
                    value:
                      getProgressValue(stateAvg, item.scheme_slug) &&
                      getProgressValue(consData, item.scheme_slug)
                        ? {
                            state: getProgressValue(
                              stateAvg,
                              item.scheme_slug
                            ),
                            constituency: getProgressValue(
                              consData,
                              item.scheme_slug
                            ),
                          }
                        : null,
                  }}
                />
              ))}
          </SnapshotSchemeList>
          <SnapshotFooter>
            <Source
              currentViz={'#overview-wrapper'}
              meta={{
                state: meta.state,
                indicator: indicator ? indicator : 'Opening Balance',
                sabha: meta.sabha,
              }}
              source={'Lorem Ipsum is simply dummy text'}
            />
          </SnapshotFooter>
        </SnapshotSchemes>
      </SnapshotWrapper>
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
  flex-wrap: wrap;
  gap: 16px;
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

const SnapshotFooter = styled.div`
  filter: drop-shadow(var(--box-shadow-1));
  background-color: var(--color-background-lighter);
  border-radius: 4px;
  border: var(--border-2);
  margin-top: 16px;
`;

const SnapshotSchemeList = styled.ul`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
