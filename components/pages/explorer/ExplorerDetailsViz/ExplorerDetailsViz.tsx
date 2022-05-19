import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { Indicator, IndicatorMobile } from 'components/data';
import Source from '../ExplorerViz/Source';
import Toggler from './Toggler';
import { Info } from 'components/icons';
import { GroupBarChart } from 'components/viz';
import ConstituencySelect from './ConstituencySelect';

const ExplorerDetailsViz = ({ data, meta, handleReportBtn, scheme }) => {

  const [selectedIndicator, setSelectedIndicator] = useState(
    scheme.ac.data['indicator_01'].slug
  );
  const [compareItem, setCompareItem] = useState<any>({});
  const [filteredData, setFilteredData] = useState([]);
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

    if (fObj) {
      const stateData = fObj['state_Obj'][data.state];
      setFilteredData(stateData);
    }
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
  }, [filteredData, compareItem]);

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

  // different heading based on report or compare mode
  const vizHeading =
    meta.type == 'report'
      ? 'Select indicator and do comparative analysis!'
      : 'Select a Vidhan Sabha Constituency to Compare:';

  return (
    <>
      <div id="explorerVizWrapper">
        <Toggler handleReportBtn={handleReportBtn} meta={meta} />
        <IndicatorMobile
          indicators={schemeData.data}
          newIndicator={handleNewVizData}
          selectedIndicator={selectedIndicator}
        />
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
                barData.length && (
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
                )
              ) : !compareItem.state ? (
                <NoCompareItem>
                  <Info id="infoSvg" fill="#317EB9" height="112" width="112" />
                  <div>
                    <p>Choose any constituency to compare with</p>
                    <span>
                      {meta.constituency} - {meta.state} ({meta.sabha} Sabha
                      Constituency)
                    </span>
                  </div>
                </NoCompareItem>
              ) : (
                stackedBar.length && (
                  <GroupBarChart
                    yAxisLabel={`Value (in ${meta.unit})`}
                    xAxisLabel="Constituencies"
                    theme={['#4965B2', '#ED8686', '#69BC99']}
                    dataset={stackedBar}
                    stack={false}
                    Title=""
                    subTitle=""
                    left="60vw"
                    type="bar"
                    smooth={true}
                  />
                )
              )}
            </VizGraph>

            <Source
              meta={{
                scheme: data.scheme,
                state: meta.state,
                constituency: meta.constituency,
                indicator: selectedIndicator
                  ? selectedIndicator
                  : 'Opening Balance',
              }}
              currentViz={'#reportViz'}
              source={schemeData.metadata?.source}
            />
          </VizWrapper>
        </Wrapper>
      </div>
    </>
  );
};

export default ExplorerDetailsViz;

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

  svg {
    min-width: 24px;
  }
`;

export const VizGraph = styled.div`
  margin: 0 2rem 2rem;
  height: 500px;
  overflow-y: auto;
  overflow-x: auto;
  position: relative;

  #infoSvg path {
    transform: scale(5);
  }
`;

const NoCompareItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  padding: 0 8px;
  height: 100%;
  background-color: var(--color-background-light);

  p,
  span {
    font-weight: 700;
    color: var(--text-light-medium);
  }

  span {
    text-transform: capitalize;
  }
`;
