import * as echarts from 'echarts/core';
import { MapViz } from 'components/viz';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { swrFetch } from 'utils/helper';

const ExplorerMap = ({ meta, schemeData }) => {
  // console.log(meta);

  const [mapValues, setMapvalues] = useState([]);
  const [mapIndicator, setMapIndicator] = useState(undefined);

  const { data, isLoading } = swrFetch(
    `/assets/maps/${meta.sabha}/${meta.state}.json`
  );

  // preparing data for echarts component
  useEffect(() => {
    if (schemeData) {
      const stateData = Object.values(schemeData).map(Number);
      stateData.sort(function (a, b) {
        return a - b;
      });
      const uniq = [...new Set(stateData)];
      const binLength = Math.floor(uniq.length / 6);
      const vizIndicators = binLength
        ? [
            {
              min: uniq[0],
              max: uniq[0 + binLength],
              label: `${uniq[0]} to ${uniq[0 + binLength]}`,
              color: '#173B3B',
            },
            {
              min: uniq[binLength + 1],
              max: uniq[binLength * 2],
              label: `${uniq[binLength + 1]} to ${uniq[binLength * 2]}`,
              color: '#1F5151',
            },
            {
              min: uniq[2 * binLength + 1],
              max: uniq[binLength * 3],
              label: `${uniq[2 * binLength + 1]} to ${uniq[binLength * 3]}`,
              color: '#286767',
            },
            {
              min: uniq[3 * binLength + 1],
              max: uniq[binLength * 4],
              label: `${uniq[3 * binLength + 1]} to ${uniq[binLength * 4]}`,
              color: '#368B8B',
            },
            {
              min: uniq[4 * binLength + 1],
              max: uniq[binLength * 5],
              label: `${uniq[4 * binLength + 1]} to ${uniq[binLength * 5]}`,
              color: '#41A8A8',
            },
            {
              min: uniq[5 * binLength + 1],
              max: uniq[uniq.length - 1],
              label: `${uniq[5 * binLength + 1]} to ${uniq[binLength * 6]}`,
              color: '#4ABEBE',
            },
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
  }, [schemeData, data]);

  // changing map chart values on sabha change
  useEffect(() => {
    if (data && schemeData) {
      const tempData = Object.keys(schemeData).map((item: any) => ({
        name: item,
        value: schemeData[item] || 0,
        mapName: data.features.filter((obj) => {
          return obj?.properties['GEO_NO'] === item;
        })[0]?.properties['GEO_NAME'],
      }));

      setMapvalues(tempData);
    }
  }, [data, schemeData, meta.sabha]);

  const newMapItem = useCallback((e) => {
    if (e) {
      // overriding map highlight on constituency selection
      const myChart = echarts.getInstanceByDom(
        document.querySelector('#mapView .echarts-for-react')
      );
      if (myChart) {
        myChart.dispatchAction({
          type: 'select',
          name: e.name,
        });
      }
    }
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        mapIndicator && (
          <MapViz
            mapFile={data}
            meta={meta}
            data={mapValues}
            vizIndicators={mapIndicator}
            newMapItem={newMapItem}
          />
        )
      )}
    </Wrapper>
  );
};

export default React.memo(ExplorerMap);

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
