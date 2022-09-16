import React, { useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import { Indicator, IndicatorMobile } from 'components/data/Indicator';
import { capitalize } from 'utils/helper';
import { Globe, IconGeneralTrends, IconToggleOn } from 'components/icons';
import { SourceWrapper } from 'components/pages/cons/Source';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@opub-cdl/design-system';
import { IconToggleOff } from 'components/icons/IconToggleOff';
import { LoadingDiv } from 'components/pages/state/StateList/ConsMapView';

const ConstBar = dynamic(() => import('./ConstBar'), {
  ssr: false,
  loading: () => <LoadingDiv>Loading Bar Chart...</LoadingDiv>,
});

const StateMap = dynamic(() => import('./StateMap'), {
  ssr: false,
  loading: () => <LoadingDiv>Loading Map...</LoadingDiv>,
});

const Table = dynamic(() => import('components/data/Table'), {
  ssr: false,
  loading: () => <LoadingDiv>Loading Table...</LoadingDiv>,
});

const Source = dynamic(() => import('components/pages/cons/Source'), {
  ssr: false,
});

const ExplorerView = ({ meta, schemeRaw, dispatch }) => {
  const [filtered, setFiltered] = useState([]);
  const [currentTab, setCurrentTab] = useState('consView');
  const [tableData, setTableData] = useState<any>({});
  const [showTable, setShowTable] = useState<any>(false);

  const { state, scheme, indicator, schemeData } = meta;
  const { sabha } = meta || 'lok';

  useLayoutEffect(() => {
    handleNewIndicator(indicator || schemeData.metadata?.indicators[0]);
  }, [schemeData, schemeRaw]);

  useEffect(() => {
    if (meta.allYears && filtered) {
      // setting tabular data
      const tableHeader = [
        { Header: 'Constituency', accessor: 'constHeader' },
      ];

      meta.allYears.forEach((element) =>
        tableHeader.push({
          Header: `${indicator.replaceAll('-', ' ')} ${element.label}`,
          accessor: `${indicator}-${element.label}`,
        })
      );

      const rowData = [];
      if (filtered[meta.year]) {
        Object.values(filtered[meta.year]).forEach((item, index) => {
          const tempObj = {
            [tableHeader[0].accessor]:
              schemeData.metadata.consList[capitalize(state)][index]
                ?.constName,
          };

          Object.keys(filtered).map(
            (item1, index1) =>
              (tempObj[tableHeader[index1 + 1].accessor] =
                filtered[item1][index + 1])
          );
          rowData.push(tempObj);
        });
      }

      const tableData = {
        header: tableHeader,
        rows: rowData,
      };
      setTableData(tableData);
    }
  }, [filtered]);

  function handleNewIndicator(val: any) {
    if (val) {
      // filter based on selected indicator for state + sabha
      if (schemeData.data) {
        const indicatorID = Object.keys(schemeData.data).find(
          (item) => schemeData.data[item].slug === val
        );
        if (schemeData.data[indicatorID]) {
          const filtered =
            schemeData.data[indicatorID]['state_Obj'][capitalize(state)];
          dispatch({
            unit: schemeData.data[indicatorID].unit,
            indicator: val,
          });
          setFiltered(filtered);
        }
      } else {
        dispatch({
          indicator: val,
        });
      }
    }
  }

  const vizToggle = [
    {
      name: `Constituency Data Explorer`,
      id: 'consView',
      icon: <IconGeneralTrends width={24} />,
    },
    {
      name: `${state} - State view`,
      id: 'mapView',
      icon: <Globe />,
    },
  ];

  const vizItems = [
    {
      id: 'consView',
      graph: filtered ? (
        showTable ? (
          <Table
            header={
              tableData.header ? tableData.header : ['table not available']
            }
            rows={tableData.rows ? tableData.rows : []}
          />
        ) : (
          <ConstBar filteredData={filtered} meta={meta} />
        )
      ) : (
        <p>No data</p>
      ),
    },
    {
      id: 'mapView',
      graph: filtered ? (
        showTable ? (
          <Table
            header={
              tableData.header ? tableData.header : ['table not available']
            }
            rows={tableData.rows ? tableData.rows : []}
          />
        ) : (
          <StateMap meta={meta} schemeData={filtered} />
        )
      ) : (
        <p>No data</p>
      ),
    },
  ];

  return (
    <>
      {filtered ? (
        <>
          <IndicatorMobile
            indicators={schemeData.data}
            newIndicator={(e) => handleNewIndicator(e)}
            selectedIndicator={indicator}
          />

          <Wrapper>
            <Indicator
              newIndicator={(e) => handleNewIndicator(e)}
              selectedIndicator={indicator}
              schemeData={schemeData}
            />

            <VizWrapper id="mapViewContainer">
              <div>
                <Tabs
                  defaultValue={currentTab}
                  onValueChange={(e) => setCurrentTab(e)}
                >
                  <VizHeader data-html2canvas-ignore>
                    <div>
                      {vizToggle.map((item, index) => (
                        <VizTabs value={item.id} key={`toggleItem-${index}`}>
                          {item.icon}
                          {item.name}
                        </VizTabs>
                      ))}
                    </div>

                    <TableTab
                      aria-selected={showTable}
                      onClick={() => setShowTable(!showTable)}
                    >
                      Table View
                      {showTable ? (
                        <IconToggleOn fill="#888F8B" />
                      ) : (
                        <IconToggleOff fill="#888F8B" />
                      )}
                    </TableTab>
                  </VizHeader>

                  <Title>
                    {`${schemeData.metadata?.name} . ${meta.indicator.replace(
                      '-',
                      ' '
                    )} ${`(${meta.year})`} . ${meta.state}`}
                  </Title>

                  {vizItems.map((item, index) => (
                    <VizGraph key={`vizItem-${index}`} value={item.id}>
                      {item.graph}
                    </VizGraph>
                  ))}
                </Tabs>
              </div>

              <Source
                currentViz={'#mapView'}
                meta={{
                  scheme,
                  state,
                  indicator: indicator ? indicator : 'Opening Balance',
                  sabha,
                }}
                source={schemeData.metadata?.source}
              />
            </VizWrapper>
          </Wrapper>
        </>
      ) : (
        <NoData>No data</NoData>
      )}
    </>
  );
  1;
};

export default React.memo(ExplorerView);

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

  ${SourceWrapper} {
    margin-top: 16px;
    margin-inline: 24px;
    padding: 16px 0 24px;
    border-top: var(--border-2);

    @media (max-width: 480px) {
      margin-inline: 4px;
      padding: 12px;
    }
  }
`;

export const VizHeader = styled(TabsList)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  padding: 16px 24px;
  padding-bottom: 0;
  margin-bottom: 16px;
  gap: 8px;
  border-bottom: var(--border-2);

  > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    flex-grow: 1;

    @media (max-width: 600px) {
      flex-direction: column;
      width: 100%;
      align-items: flex-start;
    }
  }
`;

export const VizTabs = styled(TabsTrigger)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 14px;
  text-align: center;
  border-bottom: 2px solid transparent;
  font-weight: bold;
  color: hsla(0, 0%, 0%, 0.32);
  text-transform: capitalize;

  max-width: 265px;

  svg {
    margin-right: 5px;
    fill: hsla(0, 0%, 0%, 0.32);
    pointer-events: none;
    min-width: 24px;

    &.svg-stroke {
      stroke: hsla(0, 0%, 0%, 0.32);
    }
  }

  &[aria-selected='true'] {
    color: var(--color-amazon-100);
    border-bottom: 2px solid var(--color-amazon-100);

    svg {
      fill: var(--color-amazon-300);

      &.svg-stroke {
        stroke: var(--color-amazon-300);
      }
    }
  }
`;

export const TableTab = styled.button`
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 140px;
  display: flex;
  gap: 8px;
  padding-bottom: 8px;
  align-items: center;
  font-weight: 600;
  justify-content: flex-start;
  color: var(--text-light-medium);

  svg {
    min-width: 24px;
  }

  &[aria-selected='true'] {
    svg {
      fill: var(--color-amazon-300);
    }
  }
`;

export const VizGraph = styled(TabsContent)`
  margin: 0 24px 0;
  height: 580px;
  overflow-y: auto;
  position: relative;

  @media (max-width: 480px) {
    margin: 0 4px 32px;
  }
`;

const NoData = styled.div`
  min-height: 300px;
  display: grid;
  place-content: center;
`;

const Title = styled.div`
  border-radius: 2px;
  background-color: var(--color-background-light);
  margin-bottom: 8px;
  margin-inline: 24px;

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
