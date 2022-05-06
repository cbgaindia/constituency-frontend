import React from 'react';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  GridComponent,
  DatasetComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';

import ReactEChartsCore from 'echarts-for-react/lib/core';

function seriesMaker(color, dataset, type, smooth, showSymbol, unit) {
  const SetSeries = dataset.map((data) => {
    return {
      data: data,
      type: type,
      itemStyle: {
        color: color,
      },
      smooth: smooth,
      showSymbol: showSymbol,
      emphasis: {
        focus: 'series',
      },
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: function () {
            return ''; //d.data;
          },
        },
      },
    };
  });
  return SetSeries;
}

interface SimpleBarLineChartProps {
  color: string;
  dataset: any;
  type: string;
  smooth: boolean;
  showSymbol: boolean;
  Title: string;
  subTitle: string;
  unit: string;
  years: any;
  stacked: boolean;
}

const SimpleBarLineChartViz: React.FC<SimpleBarLineChartProps> = ({
  color,
  dataset,
  type,
  smooth,
  showSymbol,
  Title,
  subTitle,
  years,
  unit,
  stacked,
}) => {
  years.sort((a, b) => {
    if (Number(a.split('-')[0]) > Number(b.split('-')[0])) return 1;
  });

  const series = seriesMaker(color, dataset, type, smooth, showSymbol, unit);
  const options = {
    legend: {
      top: '27%',
    },
    grid: {
      show: false,
      top: '30%',
      left: '8%',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        return `${Title.replaceAll('-', ' ')} - <br />
        ${params[0].name}: ${params[0].data} ${unit}<br />`;
      },
    },
    xAxis: {
      type: 'category',
      data: years.sort(),
      // name: dataset[2][0],
      axisLine: {
        symbol: ['none', 'arrow'],
      },
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'value',
      // name: dataset[2][1],
      axisLine: { onZero: false, show: true, symbol: ['none', 'arrow'] },
      nameLocation: 'middle',
      nameGap: 50,
      max: function (val) {
        return val.max <= 1 ? 1 : null;
      },
    },
    // title: {
    //   text: Title,
    //   left: 'center',
    //   subtext: subTitle,
    // },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     magicType: {show: true, type: ['line', 'bar']},
    //     restore : {show: true},
    //     saveAsImage: { show: true },
    //   },
    // },
    series: series,
  };
  echarts.use([
    BarChart,
    LineChart,
    CanvasRenderer,
    GridComponent,
    TitleComponent,
    DatasetComponent,
    LegendComponent,
    TooltipComponent,
  ]);

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={options}
      notMerge={true}
      lazyUpdate={true}
      style={{
        height: '100%',
      }}
    />
  );
};
export default SimpleBarLineChartViz;
