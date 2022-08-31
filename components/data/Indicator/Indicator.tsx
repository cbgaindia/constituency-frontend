import Radio from 'components/layouts/Radio';
import { RadioItem } from 'components/layouts/Radio/Radio';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

type Props = {
  newIndicator: any;
  selectedIndicator: any;
  schemeData: any;
  titleAs?: 'h2' | 'h3' | 'h4' | 'span' | 'p';
};

const Indicator = ({
  newIndicator,
  selectedIndicator,
  schemeData,
  titleAs = 'h4',
}: Props) => {
  const indicatorRef = useRef(null);
  useEffect(() => {
    if (selectedIndicator)
      indicatorRef.current.querySelector(
        `[value="${selectedIndicator}"]`
      ).checked = true;
  }, [selectedIndicator]);

  function handleIndicatorChange(e: any) {
    e.stopPropagation();
    const elm = e.target;
    newIndicator(elm.id || elm.value);
  }

  return (
    <IndicatorWrapper className="indicator">
      <IndicatorTitle as={titleAs}>Indicators</IndicatorTitle>
      <fieldset ref={indicatorRef}>
        <legend className="sr-only">Choose Indicator:</legend>
        {schemeData.data &&
          Object.values(schemeData.data).map(
            (item: any) =>
              item && (
                <Radio
                  onClick={handleIndicatorChange}
                  color="var(--color-amazon-300)"
                  data-selected={
                    selectedIndicator == item.slug ? 'true' : 'false'
                  }
                  id={item.slug}
                  text={
                    <>
                      {item.name}
                      <Info>
                        <p>{item.description}</p>
                      </Info>
                    </>
                  }
                  name="indicators"
                  key={`indicatorItem-${item.slug}`}
                />
              )
          )}
      </fieldset>
    </IndicatorWrapper>
  );
};

export default Indicator;

const Info = styled.div`
  display: none;
  font-weight: 400;
  line-height: 1.7;
  font-size: 0.75rem;
  color: var(--text-light-medium);
  grid-column: 2/3;
  pointer-events: none;
`;

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

  ${RadioItem} {
    line-height: 1.7;
    margin-top: 8px;
    color: var(--text-light-high);
    letter-spacing: 0.01em;
    padding: 8px;

    &[data-selected='true'] {
      font-weight: 600;
      background-color: var(--color-grey-600);
    }

    input {
      pointer-events: none;
    }

    input:checked {
      + ${Info} {
        display: block;
      }
    }
  }

  @media (max-width: 980px) {
    display: none;
  }
`;

const IndicatorTitle = styled.h4`
  font-weight: 700;
  border-bottom: var(--border-2);
  padding-bottom: 16px;
`;
