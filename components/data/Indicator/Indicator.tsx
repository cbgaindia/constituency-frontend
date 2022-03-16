import React, { useEffect } from 'react';
import { Toggletip } from 'components/layouts';
import styled from 'styled-components';

const Indicator = ({ data, newIndicator, meta }) => {
  useEffect(() => {
    (document.getElementById('Budget Estimates') as HTMLInputElement).checked =
      true;
  }, [data]);

  function handleIndicatorChange(e: any) {
    newIndicator(e.value);
  }

  return (
    <IndicatorWrapper className="indicator">
      <h3>Indicators</h3>
      <fieldset>
        <legend className="sr-only">Choose Indicator:</legend>
        {data &&
          data.map(
            (item, index) =>
              item && (
                <div key={`indicatorItem-${index}`}>
                  <input
                    onClick={(e) => handleIndicatorChange(e.target)}
                    type="radio"
                    name="indicators"
                    id={item}
                    value={item}
                  />
                  <label htmlFor={item}>
                    {item} <Toggletip data={meta[index]} />
                  </label>
                </div>
              )
          )}
      </fieldset>
    </IndicatorWrapper>
  );
};

export default Indicator;

export const IndicatorWrapper = styled.div`
  scrollbar-width: thin;
  background-color: #fff;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
  border: 1px solid hsl(300, 10%, 94%);
  border-radius: 4px;
  height: max-content;
  max-height: 776px;
  padding: 1.5rem;
  height: 100%;

  ::-webkit-scrollbar {
    width: 5px;
  }

  fieldset {
    > div {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    input {
      transform: scale(1.5);
      accent-color: #666d6e;

      &:checked + label {
        font-weight: bold;
      }
    }

    label {
      font-weight: 500;
      line-height: 175%;
      margin-bottom: -3px;
    }
  }

  @media (max-width: 980px) {
    display: none;
  }
`;
