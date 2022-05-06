import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { Indicator, IndicatorMobile } from 'components/data';
import Source from '../ExplorerViz/Source';
import Toggler from './Toggler';
import { Info } from 'components/icons';
import { GroupBarChart, SimpleBarLineChartViz } from 'components/viz';
import ConstituencySelect from './ConstituencySelect';

const ExplorerViz = ({ data, meta, handleReportBtn, scheme }) => {
  const [selectedIndicator, setSelectedIndicator] =
    useState('opening-balance');
  const [budgetTypes, setBudgetTypes] = useState([]);
  const [selectedBudgetType, setSelectedBudgetType] = useState('');
  const [compareItem, setCompareItem] = useState<any>({});
  const [selectedYear, setSelectedYear] = useState(['2018-19', '2019-20']);
  const [filteredData, setFilteredData] = useState([]);
  const [allStateData, setAllStateData] = useState([]);
  const [schemeData, setSchemeData] = useState(scheme.ac);
  const [allStates, setAllStates] = useState({});
  const [barData, setBarData] = useState([]);
  const [stackedBar, setBarStacked] = useState([]);

  useEffect(() => {
    handleNewVizData(selectedIndicator);
    setAllStates(schemeData.metadata.consList);
  }, [schemeData]);

  useEffect(() => {
    // creating available years array
    const fObj = Object.values(schemeData.data).find(
      (o: any) => o.slug.toLowerCase() === selectedIndicator.toLowerCase()
    );
    const stateData = fObj['state_Obj'][data.state];
    setAllStateData(fObj['state_Obj']);
    setFilteredData(stateData);
  }, [selectedIndicator]);

  useEffect(() => {
    if (Object.keys(filteredData).length) {
      // for compare section
      if (compareItem.state) {
        const barValues1 = [meta.constituency];
        const barValues2 = [compareItem.cons];

        const headerArr = ['Constituency'];
        Object.keys(filteredData).map((year) => {
          headerArr.push(year);
          barValues1.push(filteredData[year][meta.code]);
          barValues2.push(filteredData[year][compareItem.code]);
        });

        const barValues = [headerArr, barValues1, barValues2];

        setBarStacked(barValues);
      } else {
        const barValues1 = [meta.constituency];

        const headerArr = ['Constituency'];
        Object.keys(filteredData).map((year) => {
          headerArr.push(year);
          barValues1.push(filteredData[year][meta.code]);
        });

        const barValues = [headerArr, barValues1];

        // for report section
        // const barValues = [
        //   selectedYear.map((year) => filteredData[year][meta.code]),
        // ];
        setBarData(barValues);
      }
    }
  }, [selectedYear, filteredData, compareItem]);

  function newCompare(cons, state, code) {
    setCompareItem({
      state,
      code,
      cons,
    });
  }

  useEffect(() => {
    if (data.sabha == 'lok') {
      setSchemeData(scheme.pc);
    } else setSchemeData(scheme.ac);
  }, [data]);

  function handleNewVizData(val: any) {
    if (val) {
      setSelectedIndicator(val);
    }
  }

  function handleYearSelector(e) {
    const elm = e.target;

    const elmIndex = selectedYear.findIndex((e) => e === elm.id);
    const tempArr = selectedYear;

    // adding/removing from state array
    if (elmIndex > -1) {
      tempArr.splice(elmIndex, 1);
    } else {
      tempArr.push(elm.id);
    }
    setSelectedYear([...tempArr]);

    // for ui changes only
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

  // different heading based on report or compare mode
  const vizHeading =
    meta.type == 'report'
      ? 'Select indicator and do comparative analysis!'
      : 'Select a Vidhan Sabha Constituency to Compare:';

  return (
    <>
      {/* <IndicatorMobile
        indicators={data.indicators}
        newIndicator={handleNewVizData}
        selectedIndicator={selectedIndicator}
      /> */}
      <div id="explorerVizWrapper">
        <Toggler handleReportBtn={handleReportBtn} meta={meta} />

        <Wrapper>
          <Indicator
            newIndicator={handleNewVizData}
            selectedIndicator={selectedIndicator}
            schemeData={schemeData}
          />

          <VizWrapper>
            <VizHeader>
              <HeaderTitle>
                {meta.type == 'report' && <Info fill="#1D7548" />}
                <p>{vizHeading}</p>
              </HeaderTitle>
              {meta.type == 'compare' && (
                <ConstituencySelect
                  fallBack={`${meta.constituency} (${meta.state})`}
                  currentItem={compareItem}
                  allStates={allStates}
                  newCompare={newCompare}
                />
              )}
            </VizHeader>

            <VizGraph className="viz__graph" id="reportViz">
              {/* <YearSelector>
                {filteredData &&
                  Object.keys(filteredData).map((item, index) => (
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
              </YearSelector> */}
              {meta.type == 'report' ? (
                barData.length &&
                <GroupBarChart
                  yAxisLabel="Value (in crores)"
                  xAxisLabel="Constituency"
                  theme={['#4965B2', '#ED8686', '#69BC99']}
                  dataset={barData}
                  stack={false}
                  Title=""
                  subTitle=""
                  left="10%"
                  type="bar"
                  smooth={true}
                />
              ) : (
                stackedBar.length && (
                  <GroupBarChart
                    yAxisLabel="Value (in crores)"
                    xAxisLabel="Constituencies"
                    theme={['#4965B2', '#ED8686', '#69BC99']}
                    dataset={stackedBar}
                    stack={false}
                    Title=""
                    subTitle=""
                    left="10%"
                    type="bar"
                    smooth={true}
                  />
                )
              )}
            </VizGraph>

            <Source
              title={meta.constituency}
              currentViz="#reportViz"
              selectedBudgetType={selectedBudgetType}
              selectedIndicator={selectedIndicator}
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
`;

const HeaderTitle = styled.div`
  display: flex;
  gap: 8px;
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
