import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Widget } from 'components/actions';
import ButtonWrapper from 'components/actions/Button/ButtonComp';
import { WidgetContent } from 'components/actions/Widget/Widget';
import { ArrowDown, Cross } from 'components/icons';
import { sectionCollapse } from 'utils/helper';

function handleSearch(query, obj) {
  let newObj = [];
  if (query.length > 0) {
    Object.keys(obj).forEach((key) => {
      // searching constituency from each state
      const filteredCons = obj[key].filter((item) =>
        item.constName.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredCons.length) {
        newObj[key] = filteredCons;
      }
    });

    return newObj;
  } else return obj;
}

const ConstituencySelect = ({
  newCompare,
  currentItem,
  fallBack,
  allStates,
}) => {
  const [states, setStates] = useState({});
  const [closeWidget, setCloseWidget] = useState(false);

  useEffect(() => {
    document
      .getElementById('compareSelector')
      .addEventListener('click', () => {
        setCloseWidget(false);
      });
  }, []);

  useEffect(() => {
    setStates(allStates);
  }, [allStates]);

  function handleCompareSearch(e) {
    const val = e.target.value;
    const searchedVal = handleSearch(val, allStates);
    setStates(searchedVal);
  }

  function handleNewCompare(e) {
    setCloseWidget(true);
    newCompare(e.target.id, e.target.dataset.state, e.target.dataset.code);
  }

  const selectorRef = useRef(null);
  return (
    <Wrapper id="compareSelector" className="fill">
      {currentItem.cons && (
        <Button onClick={() => newCompare()}  icon={<Cross />} iconOnly={true} kind="custom">
          remove selected constituency
        </Button>
      )}

      <Widget
        icon={<ArrowDown />}
        buttonContent={
          currentItem.cons
            ? `${currentItem.cons} (${currentItem.state})`
            : fallBack
        }
        title="constituency menu"
        buttonStyle="custom"
        buttonClass={currentItem.cons ? 'selected' : undefined}
        closeWidget={closeWidget}
      >
        <ConsList>
          <input
            id="searchInput"
            type="text"
            placeholder="Search here for constituency"
            onChange={handleCompareSearch}
          />
          <StateList ref={selectorRef}>
            {Object.keys(states).length &&
              Object.keys(states).map((item: any, index) => (
                <React.Fragment key={item}>
                  <Button
                    kind="custom"
                    key={`${item}-selector-${index}`}
                    aria-expanded="false"
                    icon={<ArrowDown />}
                    onClick={(e) => sectionCollapse(e, selectorRef)}
                  >
                    <div>
                      {item} <span>({Object.keys(states[item]).length})</span>
                    </div>
                  </Button>
                  <ul hidden>
                    {states[item].map((cons, index1) => (
                      <li key={`cons-${index1}`}>
                        <Button
                          onClick={handleNewCompare}
                          kind="custom"
                          data-state={item}
                          data-code={cons.constCode}
                          id={cons.constName}
                        >
                          {cons.constName}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              ))}
          </StateList>
        </ConsList>
      </Widget>
    </Wrapper>
  );
};

export default ConstituencySelect;

const Wrapper = styled.div`
  position: relative;

  > div button {
    font-weight: 600;
    padding: 8px 8px 8px 12px;
    border: var(--border-1);
    border-radius: 2px;
    justify-content: space-between;
    color: var(--text-light-light);

    &.selected {
      color: var(--text-light-high);
    }
  }

  > button {
    position: absolute;
    color: var(--text-light-light);
    right: 32px;
    width: 32px;
    z-index: 100;
    padding: 0;
    top: 5px;
  }

  ${WidgetContent} {
    top: auto;
    width: 100%;

    input {
      padding: 8px 8px 8px 36px;
      font-size: 0.875rem;
      color: var(--text-light-medium);
      border: var(--border-1);
      width: 100%;

      background-image: url("data:image/svg+xml,%0A%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.9162 9.6667H10.2579L10.0245 9.4417C11.0245 8.27503 11.5412 6.68337 11.2579 4.9917C10.8662 2.67503 8.93288 0.825033 6.59954 0.5417C3.07454 0.108366 0.107878 3.07503 0.541211 6.60003C0.824545 8.93337 2.67454 10.8667 4.99121 11.2584C6.68288 11.5417 8.27454 11.025 9.44121 10.025L9.66621 10.2584V10.9167L13.2079 14.4584C13.5495 14.8 14.1079 14.8 14.4495 14.4584C14.7912 14.1167 14.7912 13.5584 14.4495 13.2167L10.9162 9.6667ZM5.91621 9.6667C3.84121 9.6667 2.16621 7.9917 2.16621 5.9167C2.16621 3.8417 3.84121 2.1667 5.91621 2.1667C7.99121 2.1667 9.66621 3.8417 9.66621 5.9167C9.66621 7.9917 7.99121 9.6667 5.91621 9.6667Z' fill='%23666E6A'/%3E%3C/svg%3E");
      background-position: left 8px top 50%, 0px 0px;
      background-repeat: no-repeat, repeat;
    }
  }
`;

const ConsList = styled.div`
  background-color: var(--color-background-lighter);
  padding: 12px;
  border-radius: 0px 0px 2px 2px;
  border: var(--border-1);

  width: 100%;
  top: 0;
`;

const StateList = styled.div`
  max-height: 310px;
  overflow-y: auto;

  ${ButtonWrapper} {
    margin-top: 8px;
    background-color: var(--color-grey-600);
    color: var(--text-light-high);
    border-radius: 2px;
    border: none;
    line-height: 1.7;

    div {
      pointer-events: none;
    }

    span {
      color: var(--text-light-light);
    }

    svg {
      transition: transform 200ms ease;
    }

    &[aria-expanded='true'] {
      background-color: var(--color-grey-600);

      svg {
        transform: rotate(-180deg);
      }
    }
  }

  ul {
    background-color: var(--color-grey-600);
    padding-bottom: 8px;
    max-height: 468px;
    overflow-y: auto;

    li {
      margin-top: 8px;
      line-height: 1.7;
      font-size: 0.875rem;

      &:first-child {
        margin-top: 0;
        border-top: var(--border-1);
      }
    }

    button {
      font-size: 0.875rem;
      padding: 0;
      font-weight: 400;
      padding-inline: 12px 8px;
      transition: background-color 200ms ease;

      &:hover {
        background-color: var(--color-grey-500);
      }
    }
  }
`;
