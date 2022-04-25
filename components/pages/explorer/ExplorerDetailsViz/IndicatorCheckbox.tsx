import Checkbox from 'components/layouts/Checkbox';
import { CheckboxItem } from 'components/layouts/Checkbox/Checkbox';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const IndicatorCheckbox = ({ data, newIndicator, selectedIndicator }) => {
  const [currentIndicators, setCurrentIndicators] = useState([
    selectedIndicator,
  ]);

  const indicatorRef = useRef(null);
  useEffect(() => {
    currentIndicators.forEach((item) => {
      if (document.getElementById(item)) {
        (
          document.getElementById(item).firstElementChild as HTMLInputElement
        ).checked = true;
      }
    });
  }, []);

  function handleIndicatorChange(e: any) {
    e.stopPropagation();
    const elm = e.target;
    setCurrentIndicators([...currentIndicators, e.value]);

    if (document.getElementById(elm.value)) {
      const isSelected = document
        .getElementById(elm.value)
        .getAttribute('data-selected');

      document
        .getElementById(elm.value)
        .setAttribute(
          'data-selected',
          isSelected == 'true' ? 'false' : 'true'
        );
    }
    newIndicator(elm.value);

    const checkedIndicators = [];
    indicatorRef.current.querySelectorAll('input').forEach((item) => {
      if (item.checked) checkedIndicators.push(item.value);
    });
  }

  return (
    <IndicatorWrapper className="indicator">
      <h3>Indicators</h3>
      <fieldset ref={indicatorRef}>
        <legend className="sr-only">Choose Indicator:</legend>
        {data &&
          data.map(
            (item, index) =>
              item && (
                <Checkbox
                  onClick={handleIndicatorChange}
                  color="var(--color-amazon-300)"
                  data-id={item}
                  data-selected={
                    currentIndicators.includes(item) ? 'true' : 'false'
                  }
                  id={item}
                  text={item}
                  name="indicators"
                  key={`indicatorItem-${index}`}
                />
              )
          )}
      </fieldset>
    </IndicatorWrapper>
  );
};

export default IndicatorCheckbox;

export const IndicatorWrapper = styled.div`
  background-color: var(--color-background-lighter);
  filter: drop-shadow(var(--box-shadow-1));
  border: var(--border-2);
  border-radius: 4px;
  height: max-content;
  padding: 24px;
  height: 100%;

  fieldset {
    overflow-y: auto;
    max-height: 616px;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
      width: 5px;
    }
  }

  ${CheckboxItem} {
    margin-top: 1rem;
    color: var(--text-light-high);
    letter-spacing: 0.01em;
    padding: 8px;
    transition: background-color 250ms ease;

    &[data-selected='true'] {
      font-weight: 600;
      background-color: var(--color-grey-600);
    }

    input {
      pointer-events: none;
    }
  }

  @media (max-width: 980px) {
    display: none;
  }
`;
