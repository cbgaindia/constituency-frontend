import React from 'react';
import styled from 'styled-components';

const SplitBar = ({ val }) => {
  function changeBar(val) {
    if(val==0){
      chart.current?.style.setProperty(
        'transform',
        `translateX(-100%)`
      );
    }
    else{
      const barVal = val > 100 ? 100 : val;
      
     // chart.current?.style.setProperty('transform', `translateX(100%)`);
      {
        val > 0  
         ? chart.current?.style.setProperty('background-color', `var(--color-teal-100)`) 
         : chart.current?.style.setProperty('background-color', `var(--color-flamingo-100)`)
      }
      chart.current?.style.setProperty(
        'transform',
        `translateX(${Math.abs(barVal) - 100}%)`
      );
    }
  //    else {
  //     const barVal = val < -100 ? -100 : val;
  //  //   chart.current?.style.setProperty('transform', `translateX(100%)`);
  //     chart.current?.style.setProperty(
  //       'transform',
  //       `translateX(${100 - Math.abs(barVal)}%)`
  //     );
  //   }
  }
 
  const chart: any = React.useRef();
 // const chart: any = React.useRef();

  React.useEffect(() => {
    changeBar(val);
  }, [val]);

  return (
    <Wrapper>
      {/* <Bar>
        <Chart ref={chart} className="chart-1" />
      </Bar> */}
      <Bar>
          <Chart ref={chart} className="chart" />
       
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
  //grid-template-columns: 1fr 1fr;
  //gap: 4px;
`;

const Bar = styled.div`
  background-color: var(--color-grey-600);
  overflow: hidden;
  position: relative;
  //transform: translateZ(0px);
`;

const Chart = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1) 0s;

  /* &.chart-1 {
    background-color: var(--color-flamingo-100);
    transform: translateX(100%);
  } */

  /* &.chart {
    background-color: var(--color-teal-100);
     transform: translateX(100%); 
  } */
`;
