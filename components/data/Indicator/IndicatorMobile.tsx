import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Toggletip } from 'components/layouts';
import styled from 'styled-components';

Modal.setAppElement('#__next');

const IndicatorMobile = ({ indicators, newIndicator, meta }) => {
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('Budget Estimates mobile');
  const [selectedSort, setSelectedSort] = useState('Budget Estimates mobile');

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
        onRequestClose={handleSortClick}
        className="modal"
        overlayClassName="modal__backdrop"
        closeTimeoutMS={200}
        aria={{
          labelledby: 'modal-head',
        }}
        preventScroll={true}
        htmlOpenClassName="ReactModal__Html--open"
      >
        <div className="modal__header">
          <h1 id="modal-head">Change Indicator</h1>
        </div>
        <fieldset className="modal__body" id="modalSort-mobile">
          <legend className="sr-only">Select Indicator</legend>
          {indicators.map((elm, index) => {
            return (
              elm && (
                <label key={`sort-${index}`} htmlFor={`${elm} mobile`}>
                  <input
                    type="radio"
                    value={elm}
                    name="sort-group"
                    id={`${elm} mobile`}
                  />
                  {elm} <Toggletip data={meta[index]} />
                </label>
              )
            );
          })}
        </fieldset>
        <div className="indicator-mobile__footer">
          <button
            type="button"
            onClick={cancelSortChange}
            className="btn-secondary-invert"
          >
            Close
          </button>
          <button
            type="button"
            onClick={applySortChange}
            className="btn-secondary"
          >
            Apply
          </button>
        </div>
      </Modal>
    </>
  );
};

export default IndicatorMobile;

export const IndicatorMobileWrapper = styled.div`
  padding: 1rem 1.5rem;
  background-color: $bg-lightest;
  border-radius: 8px;
  filter: $drop-shadow;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include media.widerThan('sprout') {
    display: none;
  }

  .indicator-mobile__text {
    line-height: 130%;
    font-size: 1.25rem;
    font-weight: 500;

    @include media.narrowerThan('seedling') {
      font-size: 1rem;
    }
  }

  .indicator-mobile__buttons {
    button {
      border: 2px solid $color-sapphire;
      border-radius: 4px;
      color: $color-sapphire;
      font-weight: 500;
      vertical-align: middle;
      display: inline-flex;

      padding: 8px 16px;
      font-size: 0.8rem;
      line-height: 1.8;

      &:last-child {
        margin-left: 12px;
      }

      @include media.narrowerThan('seed') {
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

  .indicator-mobile__filter {
    display: grid;
    grid-template-columns: max-content 1fr;
    margin-top: 0.5rem;

    ul {
      width: 200px;
      margin-right: 1.25rem;

      li {
        margin-top: 0.5rem;

        &:first-of-type {
          margin-top: 1rem;
        }
      }

      a {
        width: 100%;
        padding: 9px 8px;
        display: block;
        text-decoration: none;
        text-transform: capitalize;
        border-radius: 4px;
        background-color: $grey-6;
        line-height: 137%;

        &[aria-selected='true'] {
          background-color: $bg-lightest;
          font-weight: 500;
        }
      }

      @include media.narrowerThan('seed') {
        width: 144px;
      }
    }
  }
  .indicator-mobile__footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 1rem;
    margin-top: 1rem;

    button {
      width: 49%;
    }
  }
`;
