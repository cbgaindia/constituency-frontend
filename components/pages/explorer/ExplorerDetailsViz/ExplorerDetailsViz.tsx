import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { filter_data_indicator, filter_data_budgettype } from 'utils/explorer';

import { IndicatorMobile } from 'components/data';
import Source from '../ExplorerViz/Source';
import Toggler from './Toggler';
import { Info } from 'components/icons';
import { barLineTransformer, SimpleBarLineChartViz } from 'components/viz';
import Indicator from './Indicator';

const ExplorerViz = ({ data, meta, fileData, handleReportBtn }) => {
  const [selectedIndicator, setSelectedIndicator] =
    useState('Budget Estimates');
  const [indicatorFiltered, setIndicatorFiltered] = useState([]);
  const [finalFiltered, setFinalFiltered] = useState([]);
  const [budgetTypes, setBudgetTypes] = useState([]);
  const [selectedBudgetType, setSelectedBudgetType] = useState('');

  useEffect(() => {
    handleNewVizData('Budget Estimates');
  }, [fileData]);

  // todo: make it dynamic lie scheme dashboard
  const IndicatorDesc = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia, eligendi commodi aliquid',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia, eligendi commodi aliquid',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia, eligendi commodi aliquid',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia, eligendi commodi aliquid',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia, eligendi commodi aliquid',
  ];

  // const mapData = [
  //   { name: 'SAHARANPUR', value: 4822023 },
  //   { name: 'KAIRANA', value: 731449 },
  //   { name: 'MUZAFFARNAGAR', value: 6553255 },
  //   { name: 'BIJNOR', value: 2949131 },
  //   { name: 'NAGINA (SC)', value: 38041430 },
  //   { name: 'MORADABAD', value: 5187582 },
  //   { name: 'RAMPUR', value: 3590347 },
  //   { name: 'SAMBHAL', value: 917092 },
  //   { name: 'District of Columbia', value: 632323 },
  //   { name: 'Florida', value: 19317568 },
  //   { name: 'Georgia', value: 9919945 },
  //   { name: 'Hawaii', value: 1392313 },
  //   { name: 'Idaho', value: 1595728 },
  //   { name: 'Illinois', value: 12875255 },
  //   { name: 'Indiana', value: 6537334 },
  //   { name: 'Iowa', value: 3074186 },
  //   { name: 'Kansas', value: 2885905 },
  //   { name: 'Kentucky', value: 4380415 },
  //   { name: 'Louisiana', value: 4601893 },
  //   { name: 'Maine', value: 1329192 },
  //   { name: 'Maryland', value: 5884563 },
  //   { name: 'Massachusetts', value: 6646144 },
  //   { name: 'Michigan', value: 9883360 },
  //   { name: 'Minnesota', value: 5379139 },
  //   { name: 'Mississippi', value: 2984926 },
  //   { name: 'Missouri', value: 6021988 },
  //   { name: 'Montana', value: 1005141 },
  //   { name: 'Nebraska', value: 1855525 },
  //   { name: 'Nevada', value: 2758931 },
  //   { name: 'New Hampshire', value: 1320718 },
  //   { name: 'New Jersey', value: 8864590 },
  //   { name: 'New Mexico', value: 2085538 },
  //   { name: 'New York', value: 19570261 },
  //   { name: 'North Carolina', value: 9752073 },
  //   { name: 'North Dakota', value: 699628 },
  //   { name: 'Ohio', value: 11544225 },
  //   { name: 'Oklahoma', value: 3814820 },
  //   { name: 'Oregon', value: 3899353 },
  //   { name: 'Pennsylvania', value: 12763536 },
  //   { name: 'Rhode Island', value: 1050292 },
  //   { name: 'South Carolina', value: 4723723 },
  //   { name: 'South Dakota', value: 833354 },
  //   { name: 'Tennessee', value: 6456243 },
  //   { name: 'Texas', value: 26059203 },
  //   { name: 'Utah', value: 2855287 },
  //   { name: 'Vermont', value: 626011 },
  //   { name: 'Virginia', value: 8185867 },
  //   { name: 'Washington', value: 6897012 },
  //   { name: 'West Virginia', value: 1855413 },
  //   { name: 'Wisconsin', value: 5726398 },
  //   { name: 'Wyoming', value: 576412 },
  //   { name: 'Puerto Rico', value: 3667084 },
  // ];

  const crData = [
    'Budget Estimates',
    'Revised Estimates',
    'Actual Expenditure',
  ];

  const yearData = ['2019-20', '2020-21', '2021-22', '2022-23'];
  const selectedYear = ['2019-20', '2021-22'];

  // Run whenever a new indicator is selected
  useEffect(() => {
    const budgetType = [
      ...Array.from(new Set(indicatorFiltered.map((item) => item.budgetType))),
    ];

    if (budgetType.includes(selectedBudgetType))
      handleDropdownChange(selectedBudgetType);
    else if (selectedBudgetType == '') handleDropdownChange('Total');
    else if (selectedBudgetType == 'NA' && budgetType.length > 1)
      handleDropdownChange('Total');
    else handleDropdownChange(budgetType[0]);
  }, [indicatorFiltered]);

  function handleNewVizData(val: any) {
    if (val) {
      const filtered = filter_data_indicator(fileData, val);
      const budgetType = [
        ...Array.from(new Set(filtered.map((item) => item.budgetType))),
      ];

      const budgetTypeArray = budgetType.map((item) => {
        return { title: item, value: item };
      });

      setSelectedIndicator(val);
      setIndicatorFiltered(filtered);
      setBudgetTypes(budgetTypeArray);
    }
  }

  function handleDropdownChange(val: any) {
    const finalFiltered = filter_data_budgettype(indicatorFiltered, val);
    setSelectedBudgetType(val);
    setFinalFiltered(finalFiltered);
  }

  function handleYearSelector(e) {
    const elm = e.target;

    if (document.getElementById(elm.id)) {
      const isSelected = document
        .getElementById(elm.id)
        .getAttribute('data-selected');

      document
        .getElementById(elm.id)
        .setAttribute(
          'data-selected',
          isSelected == 'true' ? 'false' : 'true'
        );
    }
  }

  return (
    <>
      <IndicatorMobile
        indicators={data.indicators}
        newIndicator={handleNewVizData}
        meta={IndicatorDesc}
        selectedIndicator={selectedIndicator}
      />
      <div id="explorerVizWrapper">
        <Toggler handleReportBtn={handleReportBtn} meta={meta} />

        <Wrapper>
          <Indicator
            data={data.indicators}
            newIndicator={handleNewVizData}
            selectedIndicator={selectedIndicator}
          />

          <VizWrapper>
            <VizHeader>
              <Info fill="#1D7548" />
              <p>Can select multiple indicator and do comparative analysis!</p>
            </VizHeader>

            <VizGraph className="viz__graph" id="#barGraph">
              <YearSelector>
                {yearData.map((item, index) => (
                  <button
                    onClick={handleYearSelector}
                    data-selected={
                      selectedYear.includes(item) ? 'true' : 'false'
                    }
                    key={`year-${index}`}
                    id={item}
                  >
                    {item}
                  </button>
                ))}
              </YearSelector>
              <SimpleBarLineChartViz
                color={'#00ABB7'}
                dataset={barLineTransformer(finalFiltered, selectedIndicator)}
                type="bar"
                smooth={true}
                showSymbol={true}
                Title={
                  selectedIndicator +
                  (budgetTypes.length > 1 ? ' - ' + selectedBudgetType : '')
                }
                subTitle={data.title}
                unit={crData.includes(selectedIndicator) ? 'Cr' : '%'}
              />
            </VizGraph>

            <Source
              title={data.title}
              currentViz="#barGraph"
              selectedBudgetType={selectedBudgetType}
              indicatorFiltered={indicatorFiltered}
            />
          </VizWrapper>
        </Wrapper>
      </div>
    </>
  );
};

export default ExplorerViz;

export const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: 312px minmax(0, 1fr);
  margin-top: 2.5rem;

  @media (max-width: 980px) {
    display: block;
    margin-top: 1.5rem;
  }

  &.inactive-sidebar {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const VizWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #f7fdf9;
  border-radius: 6px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);

  .inactive-viz {
    display: none;
  }
`;

export const VizHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 16px;
  margin-inline: 24px;
  gap: 10px;
  margin-bottom: 16px;
  border-bottom: var(--border-2);

  p {
    letter-spacing: 0.01em;
  }
`;

export const VizGraph = styled.div`
  margin: 0 2rem 2rem;
  height: 500px;
  overflow-y: auto;
  overflow-x: auto;
  position: relative;
`;

const YearSelector = styled.div`
  position: absolute;
  display: flex;
  gap: 1px;
  filter: drop-shadow(var(--box-shadow-1));
  background-color: var(--color-background-lighter);
  z-index: 1;
  right: 0;

  button {
    padding: 4px 16px;
    line-height: 1.7;
    font-weight: 600;
    font-size: 0.75rem;
    color: var(--text-light-light);
    transition: background-color 250ms ease, color 250ms ease;

    &[data-selected='true'] {
      background-color: var(--color-amazon-00);
      color: var(--color-amazon-300);
    }

    &:first-child {
      border-radius: 2px 0px 0px 2px;
    }
    &:last-child {
      border-radius: 0px 2px 2px 0px;
    }
  }
`;
