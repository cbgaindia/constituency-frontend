import { Menu } from 'components/actions';
import { Indicator } from 'components/data';
import React from 'react';
import styled from 'styled-components';
import { fetchIndicators } from 'utils/fetch';
import { swrFetch } from 'utils/helper';
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
  const [selectedIndicator, setSelectedIndicator] =
    React.useState('Budget Allocation');
  const [selectedYear, setSelectedYear] = React.useState(
    Object.keys(consData)[0]
  );

  const { data: indicatorData, isLoading } = swrFetch(
    `indicatorList`,
    fetchIndicators
  );

  const yearList = React.useMemo(() => {
    return Object.keys(consData).map((item) => ({
      label: item,
      value: item,
    }));
  }, [consData]);

  const indicatorList = React.useMemo(() => {
    const indicatorArr = [];
    indicatorData
      ? Object.values(indicatorData).forEach((elm) => {
          Object.keys(elm).forEach((item) => {
            indicatorArr.push({
              name: item,
              description: elm[item].description,
              slug: item,
              unit: elm[item].unit,
              note: elm[item].note,
            });
          });
        })
      : [];
    return indicatorArr;
  }, [indicatorData]);

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
          data={indicatorList}
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
