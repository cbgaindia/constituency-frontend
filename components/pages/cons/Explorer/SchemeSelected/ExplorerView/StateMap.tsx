import React, { useEffect, useState } from 'react';
import { MapViz } from 'components/viz';
import styled from 'styled-components';
import {
  capitalize,
  getParameterCaseInsensitive,
  swrFetch,
} from 'utils/helper';
import { Menu } from 'components/actions';
import useEffectOnChange from 'utils/hooks';
import { Table } from 'components/data';
import { ConstituencyPage } from 'pages/[state]/[sabha]/[cons]';

const StateMap = ({ meta, schemeData, showTable, consList, schemeName }) => {
  const [mapValues, setMapvalues] = useState([]);
  const [mapIndicator, setMapIndicator] = useState(undefined);
  const { state, indicator } = meta;
  const [tableData, setTableData] = useState<any>();

  const { metaReducer } = React.useContext(ConstituencyPage);
  const { consData } = metaReducer.obj;

  const [year, setYear] = useState(meta.year);
  const [filteredData, setFilteredData] = useState(
    getParameterCaseInsensitive(schemeData, meta.state)[year]
  );

  const { data, isLoading } = swrFetch(
    `/assets/maps/${meta.sabha}/${meta.state}.json`
  );

  function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
  }

const twoDecimals = (num) => {
    return (Number)(num.toString().match(/^-?\d+(?:\.\d{0,2})?/));
  }

  // preparing indicator data for echarts component
  useEffect(() => {
    if (filteredData) {
      const stateData = Object.values(filteredData).map(Number);
      stateData.sort(function (a, b) {
        return a - b;
      });
      const uniq = [...new Set(stateData)];
      const length = uniq.length;
      const a = uniq[0];
      const e = uniq[length - 1];

      const diff = e - a;

      let div = diff / 4;
      let b = twoDecimals(a + div)
      let c = twoDecimals(b + div);
      let d = twoDecimals(c + div);

      let binLength = Math.floor(uniq.length / 4);
      const vizIndicators = binLength
        ? [
          {
            max: -999999999,
            label: `Data not available`,
            color: '#EBF0EE',
          },
          {
            min: a,
            max: b,
            label: `upto to ${b}`,
            color: '#4ABEBE',
          },
          {
            min: b,
            max: c,
            label: `${b} to ${c}`,
            color: '#368B8B',
          },
          {
            min: c,
            max: d,
            label: `${c} to ${d}`,
            color: '#286767',
          },
          // {
          //   min: uniq[3 * binLength + 1],
          //   max: uniq[binLength * 4],
          //   label: `${uniq[binLength * 3]} to ${uniq[binLength * 4]}`,
          //   color: '#1F5151',
          // },
          {
            min: d,
            max: e,
            label: `${d} and above`,
            color: '#173B3B',
          },
          // {
          //   min: uniq[4 * binLength + 1],
          //   max: uniq[uniq.length - 1],
          //   label: `${uniq[binLength * 4]} to ${uniq[uniq.length - 1]}`,
          //   color: ' #173B3B',
          // },
        ]
        : [
          {
            min: 0,
            max: 0,
            label: `data not found`,
            color: '#494D44',
          },
        ];
      setMapIndicator(vizIndicators);
    }
  }, [filteredData, data]);

  // changing map chart values on sabha change
  useEffectOnChange(() => {
    setFilteredData(getParameterCaseInsensitive(schemeData, meta.state)[year]);
  }, [year, schemeData]);

  useEffect(() => {
    setYear(meta.year)
  }, [meta.year])

  // changing map chart values on sabha change
  useEffect(() => {
    if (data && filteredData) {
      const tempData = Object.keys(filteredData).map((item: any) => ({
        name: item,
        value: filteredData[item] || 0,
        mapName: titleCase(consData[item].constituency_name),
      }));
      setMapvalues(tempData);
    }
  }, [data, filteredData, meta.sabha]);

  // setting tabular data
  useEffect(() => {
    if (meta.allYears && schemeData) {
      const tableHeader = [
        { Header: 'Constituency', accessor: 'constHeader' },
      ];

      // generate headers for all years (state view)
      meta.allYears.forEach((element) =>
        tableHeader.push({
          Header: `${indicator.replaceAll('-', ' ')} ${element.label}`,
          accessor: `${indicator}-${element.label}`,
        })
      );

      const rowData = [];
      if (schemeData[state] && schemeData[state][meta.year]) {
        Object.values(schemeData[state][meta.year]).forEach((item, index) => {
          const tempObj = {
            [tableHeader[0].accessor]:
              consList[capitalize(state)][index]?.constName,
          };

          Object.keys(schemeData[state]).forEach((item1, index1) => {
            tempObj[tableHeader[index1 + 1].accessor] =
              schemeData[state][item1][index + 1];
          });

          rowData.push(tempObj);
        });
      }

      const tableData = {
        header: tableHeader,
        rows: rowData,
      };

      setTableData(tableData);
    }
  }, [schemeData]);

  // const newMapItem = useCallback((e) => {
  //   if (e) {
  //     // overriding map highlight on constituency selection
  //     const myChart = echarts.getInstanceByDom(
  //       document.querySelector('#mapView .echarts-for-react')
  //     );
  //     if (myChart) {
  //       myChart.dispatchAction({
  //         type: 'select',
  //         name: e.name,
  //       });
  //     }
  //   }
  // }, []);

  return showTable ? (
    tableData ? (
      <Table
        header={tableData.header ? tableData.header : ['table not available']}
        rows={tableData.rows ? tableData.rows : []}
      />
    ) : (
      <p>Loading Table...</p>
    )
  ) : (
    <>
     <Title>
              {`${schemeName
                } . ${meta.indicator?.replace(
                  '-',
                  ' '
                )} ${`[${year}]`} . ${meta.state}`}
            </Title>
    
    <Wrapper>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        mapIndicator && (
          <>      
            {meta.allYears && (
              <YearSelector>
                <Menu
                  value={year}
                  showLabel={false}
                  options={meta.allYears}
                  heading="Financial Year:"
                  handleChange={(e) => setYear(e)}
                />
              </YearSelector>
            )}
            <MapViz
              mapFile={data}
              meta={meta}
              data={mapValues}
              vizIndicators={mapIndicator}
            // newMapItem={newMapItem}
            />
          </>
        )
      )}
    </Wrapper>
    </>
  );
};

export default React.memo(StateMap);

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const YearSelector = styled.div`
  position: absolute;
  top: 20px;
  right: 16px;
  z-index: 10;
`;

const Title = styled.div`
  border-radius: 2px;
  background-color: var(--color-background-light);
  border-bottom : 7px solid white;

  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.7;
  padding: 8px 16px;
  text-transform: capitalize;

  @media (max-width: 480px) {
    margin-inline: 4px;
    padding: 6px 12px;
  }
`;