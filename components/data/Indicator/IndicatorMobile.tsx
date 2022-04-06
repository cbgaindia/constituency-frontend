import React, { useState, useEffect } from 'react';
import { Toggletip } from 'components/layouts';
import styled from 'styled-components';
import { Button, Modal } from 'components/actions';

const IndicatorMobile = ({ indicators, newIndicator, meta }) => {
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('Budget Estimates mobile');
  const [selectedSort, setSelectedSort] = useState('Budget Estimates mobile');

  function DataAlterFooter({ cancel, apply }) {
    return (
      <Footer>
        <Button kind="secondary-outline" onClick={cancel} fluid={true}>
          Close
        </Button>
        <Button kind="secondary" onClick={apply} fluid={true}>
          Apply
        </Button>
      </Footer>
    );
  }

  useEffect(() => {
    setTimeout(() => {
      if (document.querySelector('#modalSort-mobile')) {
        document
          .querySelector('#modalSort-mobile')
          .addEventListener('change', (e: any) => {
            setSelectedSort(e.target.id);
          });
      }

      const selectSort = document.getElementById(
        currentSort as string
      ) as HTMLInputElement;

      if (selectSort) selectSort.checked = true;
    }, 50);
    return () => {
      if (document.querySelector('#modalSort-mobile'))
        document
          .querySelector('#modalSort-mobile')
          .removeEventListener('change', (e: any) => {
            setSelectedSort(e.target.value);
          });
    };
  }, [sortIsOpen]);

  function handleSortClick() {
    setSortIsOpen(!sortIsOpen);
  }

  function applySortChange() {
    setCurrentSort(selectedSort);
    newIndicator(
      (document.getElementById(selectedSort) as HTMLInputElement).value
    );
    handleSortClick();
  }

  function cancelSortChange() {
    setSelectedSort(currentSort);
    handleSortClick();
  }
  return (
    <>
      <IndicatorMobileWrapper className="indicator-mobile">
        <span className="indicator-mobile__text">Alter Indicators</span>
        <div className="indicator-mobile__buttons">
          <button type="button" onClick={handleSortClick}>
            <div className="indicator-mobile__svg">
              <svg
                width="19"
                height="12"
                viewBox="0 0 19 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 12.0001H5.5C6.05 12.0001 6.5 11.5501 6.5 11.0001C6.5 10.4501 6.05 10.0001 5.5 10.0001H1.5C0.95 10.0001 0.5 10.4501 0.5 11.0001C0.5 11.5501 0.95 12.0001 1.5 12.0001ZM0.5 1.00006C0.5 1.55006 0.95 2.00006 1.5 2.00006H17.5C18.05 2.00006 18.5 1.55006 18.5 1.00006C18.5 0.450061 18.05 6.10352e-05 17.5 6.10352e-05H1.5C0.95 6.10352e-05 0.5 0.450061 0.5 1.00006ZM1.5 7.00006H11.5C12.05 7.00006 12.5 6.55006 12.5 6.00006C12.5 5.45006 12.05 5.00006 11.5 5.00006H1.5C0.95 5.00006 0.5 5.45006 0.5 6.00006C0.5 6.55006 0.95 7.00006 1.5 7.00006Z"
                  fill="#4965B2"
                />
              </svg>
            </div>
            Indicators
          </button>
        </div>
      </IndicatorMobileWrapper>

      {/* Sort Modal */}
      <Modal
        isOpen={sortIsOpen}
        label="sort modal"
        modalHandler={handleSortClick}
      >
        <Header>
            <h1 id="modal-head">Sort Datasets</h1>
          </Header>
          <Wrapper>
            <Fieldset id="modalSort">
              <legend className="sr-only">Select Indicator</legend>
              {indicators.map((elm, index) => {
                return (
                  <label key={`sort-${index}`} htmlFor={`${elm} mobile`}>
                    <input
                      type="radio"
                      value={elm}
                      name="sort-group"
                      id={`${elm} mobile`}
                    />
                    {elm} <Toggletip data={meta[index]} />
                  </label>
                );
              })}
            </Fieldset>
            <DataAlterFooter
              cancel={cancelSortChange}
              apply={applySortChange}
            />
          </Wrapper>
      </Modal>
    </>
  );
};

export default IndicatorMobile;

export const Header = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-grey-600);
  border-radius: 12px 12px 0px 0px;
  padding-inline: 24px;
  padding-block: 24px 20px;
  border-bottom: var(--separator-5-2);

  @media (max-width: 540px) {
    padding-inline: 16px;
  }

  h1 {
    font-weight: var(--font-weight-medium);
    font-size: 20px;
    line-height: 26px;
    margin: 0;
  }

  button {
    color: var(--color-secondary);
    text-decoration-line: underline;
    text-transform: capitalize;
  }
`;

export const Wrapper = styled.div`
  padding-inline: 24px;
  background-color: var(--color-background-lighter);

  @media (max-width: 540px) {
    padding-inline: 16px;
  }
`;

export const Fieldset = styled.fieldset`
  padding-top: 0;
  height: 40vh;
  padding: 0;

  input {
    margin-right: 12px;
    accent-color: var(--color-primary);

    &[type='radio'] {
      padding: 6px 0;
      transform: scale(1.5);
    }
  }

  &#modalSort {
    overflow-y: auto;

    label {
      padding-left: 3px;
    }
  }

  [role='tabpanel'] {
    overflow-y: auto;
    max-height: 39vh;
  }

  label {
    display: flex;
    margin-top: 20px;
    align-items: center;
    font-weight: 500;
    line-height: 140%;
  }
`;

export const Footer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-top: var(--separator-5-2);

  button {
    width: 100%;
  }

  @media (max-width: 540px) {
    padding: 8px 0;
  }
`;

export const IndicatorMobileWrapper = styled.div`
  padding: 1rem 1.5rem;
  background-color: var(--color-background-lighter);
  border-radius: 8px;
  filter: drop-shadow(var(--box-shadow-1));
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 720px) {
    display: none;
  }

  .indicator-mobile__text {
    line-height: 130%;
    font-size: 1.25rem;
    font-weight: 500;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  .indicator-mobile__buttons {
    button {
      border: 2px solid var(--color-secondary);
      border-radius: 4px;
      color: var(--color-secondary);
      font-weight: 500;
      vertical-align: middle;
      display: inline-flex;

      padding: 8px 16px;
      font-size: 0.8rem;
      line-height: 1.8;

      &:last-child {
        margin-left: 12px;
      }

      @media (max-width: 480px) {
        font-size: 0;
        border: none;
        padding: 8px 8px;
      }
    }
  }

  .indicator-mobile__svg {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
  }
`;
