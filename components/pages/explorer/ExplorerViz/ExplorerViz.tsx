import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { tabbedInterface } from 'utils/helper';

import { Indicator, IndicatorMobile, Table } from 'components/data';
import { Menu } from 'components/actions';
import Toggler from './Toggler';
import ExplorerMap from './ExplorerMap';
import { capitalize } from 'utils/helper';
import { Globe, TableIcon } from 'components/icons';

const Source = dynamic(() => import('./Source'), {
  ssr: false,
});

const ExplorerViz = ({ meta, schemeRaw, dispatch }) => {
  const [filtered, setFiltered] = useState([]);
  const [isTable, setIsTable] = useState(false);
  const [currentViz, setCurrentViz] = useState('#mapView');

  const [financialYears, setFinancialYears] = useState(undefined);
  const [tableData, setTableData] = useState<any>({});

  const mapRef = useRef(null);

  const { state, scheme, indicator, unit, schemeData, year } = meta;
  const { sabha } = meta || 'lok';

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tablist = document.querySelector('.viz__tabs');
    const panels = document.querySelectorAll('.viz__graph');
    tabbedInterface(tablist, panels);
  }, []);

  useEffect(() => {
    // fill up available financial years for state+sabha
    if (schemeData.data && filtered) {
      const years = Object.keys(
        Object.values(schemeData.data)[0]['state_Obj'][capitalize(state)]
      ).map((item) => ({
        value: item,
        title: item,
      }));
      setFinancialYears(years); // all years

      dispatch({
        year: year ? year : years[0].value,
      });
    }
  }, [filtered]);

  useEffect(() => {
    if (financialYears) {
      // setting tabular data
      const tableHeader = [
        { Header: 'Constituency', accessor: 'constHeader' },
      ];
      if (financialYears) {
        financialYears.forEach((element) =>
          tableHeader.push({
            Header: `${indicator.replaceAll('-', ' ')} ${element.title}`,
            accessor: `${indicator}-${element.title}`,
          })
        );
      }

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
  }, [financialYears, meta.year]);

  useEffect(() => {
    if (sabha == 'lok') {
      dispatch({
        schemeData: schemeRaw.pc,
      });
    } else
      dispatch({
        schemeData: schemeRaw.ac,
      });
  }, [sabha]);

  useEffect(() => {
    handleNewIndicator(indicator || schemeData.metadata?.indicators[0]);
  }, [schemeData]);

  function hideMenu(e) {
    setCurrentViz(e.target.getAttribute('href'));
    if (e.target.getAttribute('href') == '#tableView') setIsTable(true);
    else setIsTable(false);
  }

  function handleNewIndicator(val: any) {
    if (val) {
      // filter based on selected indicator for state + sabha
      if (schemeData.data) {
        const indicatorID = Object.keys(schemeData.data).find(
          (item) => schemeData.data[item].slug === val
        );

        const filtered =
          schemeData.data[indicatorID]['state_Obj'][capitalize(state)];
        dispatch({
          unit: schemeData.data[indicatorID].unit,
        });
        setFiltered(filtered);
      }

      dispatch({
        indicator: val,
      });
    }
  }

  function handleToggler(e) {
    dispatch({
      sabha: e,
    });
  }

  const vizToggle = [
    {
      name: 'Map View',
      id: '#mapView',
      icon: <Globe />,
    },
    {
      name: 'Table View',
      id: '#tableView',
      icon: <TableIcon />,
    },
  ];

  const vizItems = [
    {
      id: 'mapView',
      graph:
        (sabha == 'lok' || sabha == 'vidhan') && filtered ? (
          <ExplorerMap
            meta={{ sabha, state, indicator, unit }}
            schemeData={filtered[meta.year]}
            dispatch={dispatch}
          />
        ) : (
          <p>No data</p>
        ),
      ref: mapRef,
    },
    {
      id: 'tableView',
      graph: tableData.rows ? (
        <Table
          header={
            tableData.header ? tableData.header : ['table not available']
          }
          rows={tableData.rows ? tableData.rows : []}
        />
      ) : (
        <></>
      ),
    },
  ];

  return (
    <>
      <Toggler handleNewToggle={handleToggler} sabha={sabha} />
      {filtered ? (
        <>
          <IndicatorMobile
            indicators={schemeData.data}
            newIndicator={(e) => handleNewIndicator(e)}
            selectedIndicator={indicator}
          />

          <Wrapper
            className={
              sabha === 'editorial-notes' ? 'inactive-sidebar' : undefined
            }
          >
            {sabha !== 'editorial-notes' && (
              <Indicator
                newIndicator={(e) => handleNewIndicator(e)}
                selectedIndicator={indicator}
                schemeData={schemeData}
              />
            )}

            <VizWrapper>
              <div
                className={
                  sabha === 'editorial-notes' ? 'inactive-viz' : undefined
                }
              >
                <VizHeader>
                  <VizTabs className="viz__tabs">
                    {vizToggle.map((item, index) => (
                      <li key={`toggleItem-${index}`}>
                        <a href={item.id} onClick={(e) => hideMenu(e)}>
                          {item.icon}
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </VizTabs>
                  {financialYears && !isTable && (
                    <VizMenu className="fill">
                      <Menu
                        value={meta.year}
                        options={financialYears}
                        heading="Financial Year:"
                        handleChange={(e) =>
                          dispatch({
                            year: e,
                          })
                        }
                      />
                    </VizMenu>
                  )}
                </VizHeader>

                {vizItems.map((item, index) => (
                  <VizGraph
                    className="viz__graph"
                    key={`vizItem-${index}`}
                    id={item.id}
                  >
                    {item.graph}
                  </VizGraph>
                ))}
              </div>
              <SchemeNotes
                className={
                  sabha !== 'editorial-notes' ? 'inactive-viz' : undefined
                }
              >
                <p>{schemeData.metadata?.description}</p>
                <div>
                  {schemeData.data &&
                    Object.values(schemeData.data).map((item: any) => (
                      <NotesInidicator key={`indicator-${item.slug}`}>
                        <NotesTitle>
                          <h3>{item.name}</h3> ({item.unit})
                        </NotesTitle>
                        <p>{item.description}</p>
                        <IndicatorNotes>
                          <strong>Note:</strong> {item.note || 'NA'}
                        </IndicatorNotes>
                      </NotesInidicator>
                    ))}
                </div>
              </SchemeNotes>
              <Source
                currentViz={currentViz}
                meta={{
                  scheme,
                  state,
                  indicator: indicator ? indicator : 'Opening Balance',
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
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  gap: 1.5rem;
`;
const VizMenu = styled.div`
  &.fill {
    max-width: 280px;
  }
`;

export const VizTabs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  min-height: 48px;

  li {
    min-width: 0;
  }

  a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    padding-bottom: 12px;
    min-width: 120%;
    display: block;
    text-align: center;
    border-bottom: 2px solid transparent;
    font-weight: bold;
    color: hsla(0, 0%, 0%, 0.32);

    svg {
      margin-bottom: -6px;
      margin-right: 5px;
      fill: hsla(0, 0%, 0%, 0.32);
      pointer-events: none;

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
  }
`;

export const VizGraph = styled.div`
  margin: 0 2rem 2rem;
  height: 580px;
  overflow-y: auto;

  &#tableView {
    @media (max-width: 640px) {
      height: 750px;
    }
  }

  @media (max-width: 480px) {
    margin: 0 4px 2rem;
  }
`;

const SchemeNotes = styled.div`
  padding: 24px;
  max-height: 592px;
  overflow-y: auto;

  > p {
    border-left: 4px solid var(--color-amazon-100);
    padding-left: 18px;
    border-radius: 4px;
  }
`;

const NotesInidicator = styled.section`
  margin-top: 16px;
  background-color: var(--color-background-light);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    display: inline-block;
    font-weight: 600;
    font-size: 1rem;
    color: var(--text-light-high);
  }
`;

const NotesTitle = styled.span`
  font-weight: 400;
  color: var(--text-light-medium);
`;
const IndicatorNotes = styled.span`
  font-size: 0.75rem;
  line-height: 1.7;
`;

const NoData = styled.div`
  min-height: 300px;
  display: grid;
  place-content: center;
`
