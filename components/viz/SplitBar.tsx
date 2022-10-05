import React from 'react';
import styled from 'styled-components';

const SplitBar = ({ val }) => {
  function changeBar(val) {
    if (val >= 0) {
      const barVal = val > 100 ? 100 : val;
      chart1.current?.style.setProperty('transform', `translateX(100%)`);
      chart2.current?.style.setProperty(
        'transform',
        `translateX(${barVal - 100}%)`
      );
    } else {
      const barVal = val < -100 ? -100 : val;
      chart2.current?.style.setProperty('transform', `translateX(-100%)`);
      chart1.current?.style.setProperty(
        'transform',
        `translateX(${100 - Math.abs(barVal)}%)`
      );
    }
  }

  const chart1: any = React.useRef();
  const chart2: any = React.useRef();

  React.useEffect(() => {
    changeBar(val);
  }, [val]);

  return (
    <Wrapper>
      <Bar>
        <Chart ref={chart1} className="chart-1" />
      </Bar>
      <Bar>
        <Chart ref={chart2} className="chart-2" />
      </Bar>
    </Wrapper>
  );
};

export { SplitBar };

const Wrapper = styled.div`
  background-color: lightgray;
  width: 100%;
  height: 20px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
`;

const Bar = styled.div`
  background-color: var(--color-grey-600);
  overflow: hidden;
  position: relative;
  transform: translateZ(0px);
`;

const Chart = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1) 0s;

  &.chart-1 {
    background-color: var(--color-flamingo-100);
    transform: translateX(100%);
  }

  &.chart-2 {
    background-color: var(--color-teal-100);
    transform: translateX(-100%);
  }
`;
