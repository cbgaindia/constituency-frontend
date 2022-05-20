import React from 'react';
import styled from 'styled-components';
import { Share } from 'components/actions';
import dynamic from 'next/dynamic';

const DownloadViz = dynamic(() => import('components/data/DownloadViz'), {
  ssr: false,
});

const Source = ({ meta, currentViz, source }) => {
  return (
    <ExplorerSource>
      <SourceText>
        <strong>Data Source: </strong>
        <p>{source}</p>
      </SourceText>

      <SourceButtons>
        <Share buttonSize="sm" title="share viz" />
        {typeof window !== 'undefined' && (
          <DownloadViz viz={currentViz} meta={meta} />
        )}
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
`;

const SourceText = styled.div`
  flex-basis: 35%;
  flex-grow: 1;
  font-size: 14px;
  flex-basis: 60%;

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

  > div > button {
    svg {
      width: 10px;
      margin-left: 8px;
    }
  }
`;
