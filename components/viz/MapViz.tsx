import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
} from 'echarts/components';
import { MapChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';

const MapViz = ({
  selectedIndicator,
  mapFile,
  sabha,
  data,
  newMapItem,
  // selectedItem,
}) => {
  const [mapOptions, setMapOptions] = useState({});

  useEffect(() => {
    if (Object.keys(mapFile).length > 0) {
      const map = JSON.stringify(mapFile);
      echarts.registerMap(sabha, map, {});

      const options = {
        backgroundColor: '#EBF0EE',
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
        },
        visualMap: {
          type: 'piecewise',
          left: '16px',
          bottom: '16px',
          backgroundColor: '#FFFFFF',
          pieces: [
            { min: 0, max: 100, label: '000 to 100' },
            { min: 100, max: 200, label: '100 to 200' },
            { min: 200, max: 300, label: '200 to 300' },
            { min: 300, max: 400, label: '300 to 400' },
            { min: 400, max: 500, label: '400 to 500' },
            { min: 500, max: 600, label: '500 to 600' },
          ],
          inRange: {
            color: [
              '#4ABEBE',
              '#41A8A8',
              '#368B8B',
              '#286767',
              '#1F5151',
              '#173B3B',
            ],
          },
          text: ['Units: ₹ Lakhs'],
          padding: 8,
          showLabel: true,
        },
        series: [
          {
            name: selectedIndicator ? selectedIndicator : 'Indicator',
            type: 'map',
            roam: true,
            map: sabha,
            zoom: 1.3,
            itemStyle: {
              borderColor: '#ffffff',
              borderWidth: 0.8,
            },
            emphasis: {
              label: {
                show: false,
              },
              itemStyle: {
                areaColor: '#0D331F',
              },
            },
            select: {
              label: {
                show: false,
                color: 'rgb(100,0,0)',
              },
              itemStyle: {
                color: 'rgba(255, 215, 0, 0.8)',
              },
            },
            scaleLimit: {
              min: 0.8,
              max: 3,
            },
            data: data,
          },
        ],
      };
      setMapOptions(options);
      // setDataLoaded(false);
    }
  }, [selectedIndicator, data, mapFile]);

  function handleClick(e) {
    // console.log(e);

    newMapItem(e.name);
  }

  const onEvents = { click: handleClick };

  echarts.use([
    TooltipComponent,
    VisualMapComponent,
    GeoComponent,
    MapChart,
    SVGRenderer,
  ]);

  return (
    Object.keys(mapOptions).length > 0 && (
      <ReactEChartsCore
        echarts={echarts}
        onEvents={onEvents}
        option={mapOptions}
        notMerge={true}
        lazyUpdate={true}
        style={{
          height: '100%',
        }}
      />
    )
  );
};
export default React.memo(MapViz);
