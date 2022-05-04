import React from 'react';
import styled from 'styled-components';
import { Share } from 'components/actions';
import { DownloadViz } from 'components/data';

const Source = ({
  title,
  currentViz,
  selectedBudgetType,
  selectedIndicator,
}) => {
  return (
    <ExplorerSource>
      <SourceText>
        <strong>Data Source: </strong>
        <p>
          Union Budget documents (2016-17 to 2021-22) sourced from{' '}
          <a
            href="https://openbudgetsindia.org/"
            rel="noreferrer"
            target="_blank"
          >
            Open Budgets India
            <span className="sr-only"> :opens in new window</span>
          </a>
        </p>
      </SourceText>

      <SourceButtons>
        <Share buttonSize="sm" title="share viz" />
        <DownloadViz
          viz={currentViz}
          type={selectedBudgetType}
          indicator={selectedIndicator ? selectedIndicator : 'Opening Balance'}
          name={title}
        />
      </SourceButtons>
    </ExplorerSource>
  );
};

export default Source;

const ExplorerSource = styled.div`
  border-top: 1px solid #cdd1d1;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 2rem;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem 0;
  margin: 0 1.5rem;

  button,
  a {
    svg {
      width: 10px;
      margin-left: 8px;
    }
  }
`;

const SourceText = styled.div`
  flex-basis: 35%;
  flex-grow: 1;
  font-size: 14px;

  p {
    color: var(--text-light-medium);
    font-weight: var(--font-weight-medium);
    display: inline;
  }
`;

const SourceButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
