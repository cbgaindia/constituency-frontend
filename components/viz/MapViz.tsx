import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
} from 'echarts/components';
import { MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';

const MapViz = ({
  selectedIndicator,
  mapFile,
  sabha,
  data,
  newMapItem,
  vizIndicators,
  // selectedItem,
}) => {
  const [mapOptions, setMapOptions] = useState({});
  useEffect(() => {
    if (Object.keys(mapFile).length > 0) {
      const map = mapFile;
      map.features.forEach(
        (obj) => (obj.properties['GEO_NO'] = String(obj.properties['GEO_NO']))
      );
      
      echarts.registerMap(sabha, map, {});

      const options = {
        backgroundColor: '#EBF0EE',
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {
            console.log(params);
            
            if (params.data)
              return `${params.data.mapName}: ${params.data.value}`;
            else return 'No data';
          },
        },
        visualMap: {
          type: 'piecewise',
          left: '16px',
          bottom: '16px',
          backgroundColor: '#FFFFFF',
          pieces: vizIndicators,
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
          text: ['Units: ₹ Crores'],
          padding: 8,
          showLabel: true,
        },
        series: [
          {
            name: selectedIndicator ? selectedIndicator : 'Indicator',
            type: 'map',
            roam: true,
            map: sabha,
            nameProperty: 'GEO_NO',
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
    }
  }, [selectedIndicator, data, mapFile]);

  function handleClick(e) {
    newMapItem(e.name);
  }

  const onEvents = { click: handleClick };

  echarts.use([
    TooltipComponent,
    VisualMapComponent,
    GeoComponent,
    MapChart,
    CanvasRenderer,
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
