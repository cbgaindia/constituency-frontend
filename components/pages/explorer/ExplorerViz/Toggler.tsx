import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import fscreen from 'fscreen';
import { Button, Menu } from 'components/actions';
import { FullScreen, LokSabha, VidhanSabha } from 'components/icons';
import queryString from 'query-string';

const menuItems = {
  lok: {
    value: 'lok',
    title: 'Lok Sabha',
  },
  vidhan: {
    value: 'vidhan',
    title: 'Vidhan Sabha',
  },
  'editorial-notes': {
    value: 'editorial-notes',
    title: 'Scheme Editorial Notes',
  },
};

const Toggler = ({ handleNewToggle, sabha }) => {
  const [selectedMode, setSelectedMode] = useState('Lok Sabha');
  const sabhaRef = useRef(null);

  function changeMode(value) {
    const q = queryString.parse(location.search);
    q.sabha = value;
    window.history.replaceState(
      {
        sabha: value,
      },
      '',
      `/explorer?${queryString.stringify(q)}`
    );
    handleNewToggle(value);
  }

  function handleSabhaClick(e) {
    const currentBtn = e.target;
    const selectedBtn = sabhaRef.current.querySelector(
      '[aria-pressed="true"]'
    ) as HTMLElement;

    if (currentBtn !== selectedBtn) {
      const value = currentBtn.dataset.value;
      changeMode(value);
    }
  }

  function fullScreenMode() {
    if (fscreen.fullscreenElement !== null) {
      fscreen.exitFullscreen();
    } else {
      const vizWrapper = document.getElementById('explorerVizWrapper');
      if (vizWrapper) fscreen.requestFullscreen(vizWrapper);
    }
  }

  function handleDropdownChange(e) {
    setSelectedMode(menuItems[e].title);
    changeMode(e);
  }

  return (
    <>
      <Wrapper ref={sabhaRef}>
        {/* add a menu for mobile */}
        <SabhaToggle>
          <h2>
            <Button
              aria-pressed={sabha === 'lok' ? 'true' : 'false'}
              data-value="lok"
              onClick={handleSabhaClick}
              icon={<LokSabha />}
              iconSide="left"
              kind="custom"
            >
              <Name>
                Lok Sabha
                <span>Parliament Constituency</span>
              </Name>
            </Button>
          </h2>

          <h2>
            <Button
              aria-pressed={sabha === 'vidhan' ? 'true' : 'false'}
              data-value="vidhan"
              onClick={handleSabhaClick}
              icon={<VidhanSabha />}
              iconSide="left"
              kind="custom"
            >
              <Name>
                Vidhan Sabha
                <span>Assembly Constituency</span>
              </Name>
            </Button>
          </h2>
        </SabhaToggle>
        <RightSide>
          <h2>
            <Button
              aria-pressed={sabha === 'editorial-notes' ? 'true' : 'false'}
              data-value="editorial-notes"
              onClick={handleSabhaClick}
              kind="custom"
            >
              Scheme Editorial Notes
            </Button>
          </h2>
          <Button
            icon={<FullScreen fill="#1D7548" />}
            iconOnly={true}
            kind="custom"
            onClick={fullScreenMode}
            id="fullScreen"
          >
            Full screen mode
          </Button>
        </RightSide>
      </Wrapper>
      <VizMenu className="fill">
        <Menu
          value={selectedMode}
          options={Object.values(menuItems)}
          heading="Select Mode:"
          handleChange={(e) => handleDropdownChange(e)}
        />
      </VizMenu>
    </>
  );
};

export default Toggler;

const Wrapper = styled.div`
  background-color: var(--color-background-lighter);
  margin-top: 32px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  overflow-x: auto;

  button {
    font-weight: 600;
    height: 100%;
    padding: 20px 24px;
    color: var(--text-light-medium);
    border-right: var(--border-2);
    min-width: 160px;
    gap: 12px;

    &[data-value='editorial-notes'] {
      border-inline: var(--border-2);
    }

    &[aria-pressed='true'] {
      color: var(--color-amazon-300);
      background-color: var(--color-amazon-00);

      svg {
        fill: var(--color-amazon-300);
      }

      span {
        color: var(--color-amazon-200);
      }
    }

    @media screen and (max-width: 480px) {
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const SabhaToggle = styled.div`
  display: flex;

  button {
    flex-wrap: wrap;
    align-items: flex-start;

    svg {
      max-width: 40px;
      max-height: 40px;
      margin-inline-end: 0;
    }
  }
`;

const Name = styled.div`
  text-align: start;
  pointer-events: none;

  span {
    text-align: start;
    line-height: 1.7;
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--text-light-light);
    display: block;
  }
`;

const RightSide = styled.div`
  display: flex;
  #fullScreen {
    min-width: fit-content;
  }
`;

const VizMenu = styled.div`
  display: none;
  margin-top: 24px;

  @media screen and (max-width: 640px) {
    display: block;
  }

  &.fill {
    max-width: 100%;
  }
`;
