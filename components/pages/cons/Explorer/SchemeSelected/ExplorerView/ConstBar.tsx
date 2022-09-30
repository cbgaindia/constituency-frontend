import React from 'react';
import { Combobox } from 'components/actions';
import styled from 'styled-components';
import { GroupBarChart } from 'components/viz';
import { getParameterCaseInsensitive } from 'utils/helper';

const ConstBar = ({ meta, schemeData }) => {
  const [isPending, startTransition] = React.useTransition();
  const [barData, setBarData] = React.useState([]);
  const [selectedCons, setSelectedCons] = React.useState([
    { state: meta.state, code: meta.cons, name: meta.cons_name },
  ]);
  const [selectedYears, setSelectedYears] = React.useState<any>([
    { value: meta.year, label: meta.year },
  ]);

  React.useEffect(() => {
    startTransition(() => {
      setSelectedYears([{ value: meta.year, label: meta.year }]);
    });
  }, [meta.year]);

  React.useLayoutEffect(() => {
    if (meta.cons && meta.state && meta.indicator) {
      generateBarChart(selectedYears, selectedCons);
    }
  }, [meta, selectedCons, selectedYears, schemeData]);

  function generateBarChart(years, constituencies) {
    const barChartHeader = ['Year'];

    //  years object to store the values in arrays
    const yearsObj = {};
    years.forEach((elm) => {
      yearsObj[elm.value] = [elm.value];
    });

    constituencies.forEach((elm) => {
      if (Object.values(schemeData).length) {
        const { state, code, name } = elm;
        barChartHeader.push(String(name));

        //  for each year, fill the constituency value
        Object.keys(yearsObj).length &&
          Object.keys(yearsObj).forEach((yearElm) => {
            const yearFiltered = getParameterCaseInsensitive(
              schemeData,
              state
            )[yearElm];
            if (yearFiltered) {
              const constValue = yearFiltered[code];
              yearsObj[yearElm].push(constValue);
            }
          });
      }
    });

    const barChartArr = [barChartHeader, ...Object.values(yearsObj)];
    startTransition(() => {
      setBarData(barChartArr);
    });
  }
  function handleConstChange(e) {
    startTransition(() => {
      const arr = e.map((obj) => ({
        state: obj.value.state,
        code: obj.value.code,
        name: obj.label,
      }));
      setSelectedCons(arr);
    });
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
        {meta.cons && (
          <Combobox
            options={constList}
            disableOptions={selectedCons.length >= 4}
            onChange={(e) => handleConstChange(e)}
            defaultValue={{
              value: { code: meta.cons, state: meta.state },
              label: meta.cons_name,
            }}
            isMulti
            isGrouped
            id="cons-selector"
            placeholder="Add more constituency to compare"
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
            placeholder="Select financial year"
          />
        )}
      </ComboWrapper>
      <>
        {!isPending ? (
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
