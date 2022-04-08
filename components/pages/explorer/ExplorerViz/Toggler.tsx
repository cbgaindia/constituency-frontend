import React, { useRef } from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import { LokSabha, VidhanSabha } from 'components/icons';

const Toggler = ({ handleNewToggle, selectedSabha }) => {
  const sabhaRef = useRef(null);

  function handleSabhaClick(e) {
    const currentBtn = e.target;
    const selectedBtn = sabhaRef.current.querySelector(
      '[aria-pressed="true"]'
    ) as HTMLElement;

    if (currentBtn !== selectedBtn) {
      const value = currentBtn.dataset.value;
      handleNewToggle(value);
    }
  }

  return (
    <Wrapper ref={sabhaRef}>
      <SabhaToggle>
        <h2>
          <Button
            aria-pressed={selectedSabha === 'lok-sabha' ? 'true' : 'false'}
            data-value="lok-sabha"
            onClick={handleSabhaClick}
            icon={<LokSabha />}
            iconSide="left"
            kind="custom"
          >
            Lok Sabha
          </Button>
        </h2>

        <h2>
          <Button
            aria-pressed={selectedSabha === 'vidhan-sabha' ? 'true' : 'false'}
            data-value="vidhan-sabha"
            onClick={handleSabhaClick}
            icon={<VidhanSabha />}
            iconSide="left"
            kind="custom"
          >
            Vidhan Sabha
          </Button>
        </h2>
      </SabhaToggle>
      <div>
        <h2>
          <Button
            aria-pressed={
              selectedSabha === 'editorial-notes' ? 'true' : 'false'
            }
            data-value="editorial-notes"
            onClick={handleSabhaClick}
            kind="custom"
          >
            Scheme Editorial Notes
          </Button>
        </h2>
      </div>
    </Wrapper>
  );
};

export default Toggler;

const Wrapper = styled.div`
  background-color: var(--color-background-lighter);
  margin-top: 32px;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  button {
    font-weight: 600;
    padding: 20px 24px;
    color: var(--text-light-light);
    border-right: var(--border-2);

    &[data-value='editorial-notes'] {
      border-inline: var(--border-2);
    }

    svg {
      fill: var(--color-grey-300);
    }

    &[aria-pressed='true'] {
      color: var(--color-amazon-100);
      background-color: var(--color-amazon-00);

      svg {
        fill: var(--color-amazon-300);
      }
    }

    @media screen and (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
`;

const SabhaToggle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
