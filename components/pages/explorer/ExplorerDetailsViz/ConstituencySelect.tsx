import { Button, Widget } from 'components/actions';
import ButtonWrapper from 'components/actions/Button/ButtonComp';
import { WidgetContent } from 'components/actions/Widget/Widget';
import { Arrow, ArrowDown, ArrowTail } from 'components/icons';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { sectionCollapse } from 'utils/helper';

const items = [
  {
    state: 'Rajasthan',
    cons: ['item1', 'item2', 'item3'],
  },
  {
    state: 'Uttar Pradesh',
    cons: ['item2', 'item3', 'item4'],
  },
  {
    state: 'Odisha',
    cons: ['item4', 'item5', 'item6'],
  },
];

const ConstituencySelect = () => {
  const selectorRef = useRef(null);
  return (
    <Wrapper className="fill">
      <Widget
        icon={<ArrowDown />}
        buttonContent="constituency search"
        title="share menu"
        buttonStyle="custom"
      >
        <ConsList>
          <input
            id="searchInput"
            type="text"
            placeholder="Search here for constituency"
          />
          <StateList ref={selectorRef}>
            {items.map((item: any, index) => (
              <>
                <Button
                  kind="custom"
                  key={`selector-${index}`}
                  aria-expanded="false"
                  icon={<ArrowDown />}
                  onClick={(e) => sectionCollapse(e, selectorRef)}
                >
                  <span>{item.state}</span>
                </Button>
                <ul hidden>
                  {item.cons.map((cons, index1) => (
                    <li key={`cons-${index1}`}>{cons}</li>
                  ))}
                </ul>
              </>
            ))}
          </StateList>
        </ConsList>
      </Widget>
    </Wrapper>
  );
};

export default ConstituencySelect;

const Wrapper = styled.div`
  button {
    font-weight: 600;
    padding: 8px 8px 8px 12px;
    border: var(--border-1);
    border-radius: 2px;
    justify-content: space-between;
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
  ${ButtonWrapper} {
    margin-top: 8px;
    background-color: var(--color-grey-600);
    border-radius: 2px;
    border: none;

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
    padding: 0 12px 8px 8px;

    li {
      margin-top: 8px;
      line-height: 1.7;
      font-size: 0.875rem;

      &:first-child {
        margin-top: 0;
        padding-top: 8px;
        border-top: var(--border-1);
      }
    }
  }
`;
