import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { tabbedInterface } from 'utils/helper';

import { Indicator, IndicatorMobile, Table } from 'components/data';
import { Menu } from 'components/actions';
import ExplorerMap from './ExplorerMap';
import { capitalize } from 'utils/helper';
import { Globe } from 'components/icons';
import { SourceWrapper } from 'components/pages/cons/Source';

const Source = dynamic(() => import('components/pages/cons/Source'), {
  ssr: false,
});

const ExplorerViz = ({ meta, schemeRaw, dispatch }) => {
  const [filtered, setFiltered] = useState([]);
  const [currentViz, setCurrentViz] = useState('#mapView');

  const [financialYears, setFinancialYears] = useState(undefined);

  const mapRef = useRef(null);

  const { state, scheme, indicator, unit, schemeData, year } = meta;
  const { sabha } = meta || 'lok';

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tablist = document.querySelector('.viz__tabs');
    const panels = document.querySelectorAll('.viz__graph');
    if (tablist && panels) tabbedInterface(tablist, panels);
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
  }, [filtered, scheme]);

  useEffect(() => {
    if (sabha == 'lok') {
      dispatch({
        schemeData: schemeRaw.pc,
      });
    } else
      dispatch({
        schemeData: schemeRaw.ac,
      });
  }, [sabha, schemeRaw]);

  useEffect(() => {
    handleNewIndicator(indicator || schemeData.metadata?.indicators[0]);
  }, [schemeData, schemeRaw]);

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
      name: `${state} - State view`,
      id: '#mapView',
      icon: <Globe />,
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
          />
        ) : (
          <p>No data</p>
        ),
      ref: mapRef,
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

            <VizWrapper id="mapViewContainer">
              <div
                className={
                  sabha === 'editorial-notes' ? 'inactive-viz' : undefined
                }
              >
                <VizHeader data-html2canvas-ignore>
                  <VizTabs className="viz__tabs">
                    {vizToggle.map((item, index) => (
                      <li key={`toggleItem-${index}`}>
                        <a href={item.id}>
                          {item.icon}
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </VizTabs>
                </VizHeader>

                <Title>
                  {`${schemeData.metadata?.name} . ${meta.indicator.replace(
                    '-',
                    ' '
                  )} ${
                    currentViz !== '#tableView' ? `(${meta.year})` : ''
                  } . ${meta.state}`}
                </Title>

                {vizItems.map((item, index) => (
                  <VizGraph
                    className="viz__graph"
                    key={`vizItem-${index}`}
                    id={item.id}
                  >
                    {financialYears && (
                      <YearSelector>
                        <Menu
                          value={meta.year}
                          showLabel={false}
                          options={financialYears}
                          heading="Financial Year:"
                          handleChange={(e) =>
                            dispatch({
                              year: e,
                            })
                          }
                        />
                      </YearSelector>
                    )}
                    {item.graph}
                  </VizGraph>
                ))}
              </div>

              <Source
                currentViz={currentViz}
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
};

export default React.memo(ExplorerViz);

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

export const VizHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  gap: 1.5rem;
`;

export const VizTabs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-height: 48px;

  li {
    min-width: 0;
  }

  a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    padding-bottom: 14px;
    padding-inline: 8px;
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
  margin: 0 24px 0;
  height: 580px;
  overflow-y: auto;
  position: relative;

  &#tableView {
    @media (max-width: 640px) {
      height: 750px;
    }
  }

  @media (max-width: 480px) {
    margin: 0 4px 32px;
  }
`;

const YearSelector = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
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

  &#mapVizInfo {
    font-weight: 400;
    margin: 8px 24px 0;
    text-transform: initial;
    margin-bottom: -8px;
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
      min-width: 24px;
    }
  }

  @media (max-width: 480px) {
    margin-inline: 4px;
    padding: 6px 12px;

    &#mapVizInfo {
      margin-inline: 4px;
    }
  }
`;
