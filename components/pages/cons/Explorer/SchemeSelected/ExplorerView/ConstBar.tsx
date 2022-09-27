import React from 'react';
import { Combobox } from 'components/actions';
import styled from 'styled-components';
import { GroupBarChart } from 'components/viz';
import { getParameterCaseInsensitive } from 'utils/helper';

const ConstBar = ({ meta, filteredData }) => {
  const [barData, setBarData] = React.useState([]);
  const [selectedCons, setSelectedCons] = React.useState([
    { state: meta.state, code: meta.cons_code },
  ]);
  const [selectedYears, setSelectedYears] = React.useState<any>([
    { value: meta.year, label: meta.year },
  ]);

  React.useEffect(() => {
    setSelectedYears([{ value: meta.year, label: meta.year }]);
  }, [meta.year]);

  React.useEffect(() => {
    if (
      meta.cons_code &&
      meta.state &&
      selectedYears[0].value &&
      meta.indicator
    ) {
      getStateConstData(selectedYears, selectedCons);
    }
  }, [meta, selectedCons, selectedYears]);

  function getStateConstData(years, constituencies) {
    const barChartHeader = ['Year'];

    //  years object to store the values in arrays
    const yearsObj = {};
    years.forEach((elm) => {
      yearsObj[elm.value] = [elm.value];
    });

    constituencies.forEach((elm) => {
      const state_obj = Object.values(meta.schemeData.data).filter(
        (e: any) => e.slug == meta.indicator
      )[0]['state_Obj'];

      const { state, code } = elm;
      barChartHeader.push(String(code));

      //  for each year, fill the constituency value
      Object.keys(yearsObj).length &&
        Object.keys(yearsObj).forEach((yearElm) => {
          const constValue = getParameterCaseInsensitive(state_obj, state)[
            yearElm
          ][code];
          yearsObj[yearElm].push(constValue);
        });
    });

    const barChartArr = [barChartHeader, ...Object.values(yearsObj)];
    setBarData(barChartArr);
  }

  function handleConstChange(e) {
    const arr = e.map((obj) => ({
      state: obj.value.state,
      code: obj.value.code,
    }));
    setSelectedCons(arr);
  }

  // generate grouped constituency list based on state
  const constList = React.useMemo(() => {
    const consList = meta.schemeData.metadata
      ? meta.schemeData.metadata.consList
      : {};
    return Object.keys(consList).map((state) => ({
      label: state,
      options: consList[state].map((item) => ({
        value: { state: state.toLowerCase(), code: item.constCode },
        label: item.constName,
      })),
    }));
  }, [meta.schemeData]);

  return (
    <Wrapper>
      <ComboWrapper>
        {meta.cons_code && (
          <Combobox
            options={constList}
            disableOptions={selectedCons.length >= 4}
            onChange={(e) => handleConstChange(e)}
            defaultValue={{
              value: { code: meta.cons_code, state: meta.state },
              label: meta.cons_name,
            }}
            isMulti
            isGrouped
            id="cons-selector"
          />
        )}
        {meta.year && (
          <Combobox
            options={meta.allYears}
            onChange={(e: any) => setSelectedYears(e)}
            defaultValue={{ value: meta.year, label: meta.year }}
            isMulti
            isSearchable={false}
            id="year-selector"
          />
        )}
      </ComboWrapper>
      <>
        {barData ? (
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
        ) : (
          <p>Loading...</p>
        )}
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
  flex-wrap: wrap;
  gap: 12px;
  padding-inline: 16px;
  padding-top: 16px;

  #cons-selector {
    flex-grow: 1;
    flex-basis: 50%;

    @media (max-width: 480px) {
      width: 100%;
    }
  }

  #year-selector {
    flex-grow: 1;
  }
`;
