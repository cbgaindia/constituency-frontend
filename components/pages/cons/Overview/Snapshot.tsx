import { Menu } from 'components/actions';
import { Indicator } from 'components/data';
import React from 'react';
import styled from 'styled-components';
import Source from '../Source';
import SnapshotCard from './SnapshotCard';

type Props = {
  indicator: string;
  meta: any;
};

const Snapshot = ({ indicator, meta }: Props) => {
  const [selectedIndicator, setSelectedIndicator] = React.useState(indicator);
  const [selectedYear, setSelectedYear] = React.useState('2018-19');
  const tempYears = [
    {
      label: '2018-19',
      value: '2018-19',
    },
    {
      label: '2019-20',
      value: '2019-20',
    },
  ];

  const tempIndicators = {
    data: [
      {
        name: 'Opening Balance',
        description:
          'Amount reported as balance under the scheme by the end of the previous Financial Year (FY)',
        slug: 'opening-balance',
      },
      {
        name: 'Total Available Fund',
        description:
          'Based on the demand from the states / UTs funds are made available by the Union Government for the scheme.',
        slug: 'total-available-fund',
      },
      {
        name: 'Total Expenditure on Wages',
        description:
          'Total expenditure incurred on wage payments to labourers',
        slug: 'total-expenditure-on-wages',
      },
      {
        name: 'Total Expenditure on Materials',
        description: 'Total expenditure incurred on procuring materials',
        slug: 'total-expenditure-on-materials',
      },
      {
        name: 'Total Expenditure on Taxes',
        description: 'Total expenditure incurred tax payments',
        slug: 'total-expenditure-on-taxes',
      },
      {
        name: 'Total Expenditure on Admin Expenses',
        description: 'Total expenditure incurred tax payments',
        slug: 'total-expenditure-on-admin-expenses',
      },
      {
        name: 'Grand Total Expenditure',
        description: 'Aggregate expenditure on wage, materials, admin & tax',
        slug: 'grand-total-expenditure',
      },
      {
        name: 'Total Unspent Balance',
        description:
          'The total unspent balance is the difference between the total available fund and grand total expenditure (including payment due). ',
        slug: 'total-unspent-balance',
      },
      {
        name: 'Total Payment Due',
        description:
          'The amount is due for payment to labourers, material cost, admin and costs for admin expenses',
        slug: 'total-payment-due',
      },
    ],
  };

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

      <SnapshotWrapper>
        <Indicator
          newIndicator={(e) => {
            setSelectedIndicator(e);
          }}
          selectedIndicator={selectedIndicator}
          schemeData={tempIndicators}
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
