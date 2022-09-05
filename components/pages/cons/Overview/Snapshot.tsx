import { Menu } from 'components/actions';
import { Indicator } from 'components/data';
import React from 'react';
import styled from 'styled-components';
import Source from '../Source';
import SnapshotCard from './SnapshotCard';

type Props = {
  indicator: string;
  schemeData: any;
  meta: any;
};

const Snapshot = ({ schemeData, indicator, meta }: Props) => {
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

  const tempCardList: {
    img: string;
    title: string;
    value?: {
      state: number;
      constituency: number;
    };
  }[] = [
    {
      img: '/assets/images/cbga_logo.png',
      title: 'Mid-Day Meal Programme (MDM)',
      value: {
        state: 30,
        constituency: 40,
      },
    },
    {
      img: '/assets/images/placeholder.jpg',
      title: 'Swachh Bharat Mission-Gramin (SBMG)',
      value: {
        state: 80,
        constituency: 30,
      },
    },
    {
      img: '/assets/schemes/nhm.png',
      title: 'National Health Mission (NHM)',
    },
    {
      img: '/assets/images/placeholder.jpg',
      title: 'National Social Assistance Programme (NSAP)',
      value: {
        state: 20,
        constituency: 40,
      },
    },
    {
      img: '/assets/schemes/nhm.png',
      title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    },
    {
      img: '/assets/images/placeholder.jpg',
      title: 'Pradhan Mantri Awaas Yojana - Grameen (PMAY)',
      value: {
        state: 75,
        constituency: 50,
      },
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
            <SnapshotSchemeList>
              {tempCardList &&
                tempCardList.map((item) => (
                  <SnapshotCard key={item.title} data={item} />
                ))}
            </SnapshotSchemeList>
            <SnapshotFooter>
              <Source
                currentViz={'currentViz'}
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
