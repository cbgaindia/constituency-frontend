import React from 'react';
import { Combobox } from 'components/actions';
import styled from 'styled-components';
import { GroupBarChart } from 'components/viz';

const ConstBar = ({ meta, filteredData }) => {
  const [barData, setBarData] = React.useState([]);

  React.useEffect(() => {
    if (filteredData && Object.keys(filteredData).length) {
      // for compare section
      // if (compareItem.state) {
      //   const barValues1 = [meta.constituency];
      //   const barValues2 = [compareItem.cons];

      //   const headerArr = ['Constituency'];
      //   Object.keys(filteredData).map((year) => {
      //     headerArr.push(year);
      //     barValues1.push(filteredData[year][meta.consCode]);
      //     barValues2.push(filteredData[year][compareItem.consCode]);
      //   });

      //   const barValues = [headerArr, barValues1, barValues2];

      //   setBarStacked(barValues);
      // } else {
      //   const barValues1 = [meta.constituency];

      //   const headerArr = ['Constituency'];
      //   Object.keys(filteredData).map((year) => {
      //     headerArr.push(year);
      //     barValues1.push(filteredData[year][meta.consCode]);
      //   });
      //   const barValues = [headerArr, barValues1];
      //   setBarData(barValues);
      // }

      const barValues1 = [meta.constituency];

      const headerArr = ['Constituency'];
      Object.keys(filteredData).map((year) => {
        headerArr.push(year);
        barValues1.push(filteredData[year][2]); // --change-this 2 to dynamic
      });
      const barValues = [headerArr, barValues1];
      setBarData(barValues);
    }
  }, [filteredData]);

  const states = [
    {
      label: 'Mizoram',
      options: [
        { value: 'Aska', label: 'Aska' },
        { value: 'vidhan', label: 'vidhan' },
        { value: meta.constituency, label: meta.constituency },
      ],
    },
    {
      label: 'Meghalaya',
      options: [
        { value: 'Sikkim', label: 'Sikkim' },
        { value: 'Odisha', label: 'Odisha' },
      ],
    },
  ];

  return (
    <Wrapper>
      <ComboWrapper>
        {meta.constituency && (
          <Combobox
            options={states}
            defaultValue={{
              value: meta.constituency,
              label: meta.constituency,
            }}
            isMulti
            isGrouped
            id="cons-selector"
          />
        )}
        {meta.year && (
          <Combobox
            options={meta.allYears}
            defaultValue={{ value: meta.year, label: meta.year }}
            isMulti
            isSearchable={false}
            id="year-selector"
          />
        )}
      </ComboWrapper>
      <>
        <GroupBarChart
          yAxisLabel={`Value (in ${meta.unit})`}
          xAxisLabel="Constituency"
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={barData}
          stack={false}
          Title=""
          subTitle=""
          left="60vw"
          type="bar"
          smooth={true}
        />
      </>
    </Wrapper>
  );
};
export default ConstBar;

const Wrapper = styled.div`
  background-color: var(--color-background-light);
  height: 100%;
`;

const ComboWrapper = styled.div`
  display: flex;
  gap: 12px;
  padding-inline: 16px;
  padding-top: 16px;

  #cons-selector {
    flex-basis: 63%;
    flex-grow: 1;

    input {
      outline: none !important;
    }
  }

  #year-selector {
    flex-basis: 43%;
    flex-grow: 1;
  }
`;
