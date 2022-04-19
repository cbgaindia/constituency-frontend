import React from 'react';
import styled from 'styled-components';
import fscreen from 'fscreen';
import { Button } from 'components/actions';
import { ArrowTail, FullScreen } from 'components/icons';

const Toggler = ({ handleReportBtn, meta }) => {
  function fullScreenMode() {
    if (fscreen.fullscreenElement !== null) {
      fscreen.exitFullscreen();
    } else {
      const vizWrapper = document.getElementById('explorerVizWrapper');
      if (vizWrapper) fscreen.requestFullscreen(vizWrapper);
    }
  }

  return (
    <Wrapper>
      <LeftSide>
        <Button
          onClick={() => handleReportBtn(false)}
          icon={<ArrowTail />}
          iconSide="left"
          kind="custom"
        >
          Go Back
        </Button>

        <div>
          <h2>
            {meta.type == 'report' ? 'Report Card' : 'Comparator'} -{' '}
            {meta.constituency}
          </h2>
          <span>
            {meta.state} . {meta.sabha == 'lok' ? 'Lok' : 'Vidhan'} Sabha
            Constituency
          </span>
        </div>
      </LeftSide>
      <RightSide>
        <Button
          icon={<FullScreen fill="#1D7548" />}
          iconOnly={true}
          kind="custom"
          onClick={fullScreenMode}
        >
          Full screen mode
        </Button>
      </RightSide>
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
    height: 100%;
    padding: 20px 24px;
    color: var(--text-light-light);
    border-right: var(--border-2);

    &[data-value='editorial-notes'] {
      border-inline: var(--border-2);
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

const LeftSide = styled.div`
  display: flex;
  flex-wrap: wrap;

  > button {
    gap: 8px;
    font-weight: 600;
    color: var(--color-amazon-300);
    transition: background-color 150ms ease;

    svg {
      fill: var(--color-amazon-300);
    }

    &:hover {
      background-color: var(--color-amazon-00);
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;

    h2 {
      font-weight: 700;
      font-size: 1rem;
    }

    span {
      font-size: 0.75rem;
      line-height: 1.7;
      color: var(--text-light-medium);
    }
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-left: var(--border-2);
`;
