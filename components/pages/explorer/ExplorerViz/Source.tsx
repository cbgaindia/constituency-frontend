import React from 'react';
import styled from 'styled-components';
import { Share } from 'components/actions';
import dynamic from 'next/dynamic';

const DownloadViz = dynamic(() => import('components/data/DownloadViz'), {
  ssr: false,
});

const Source: React.FC<{
  meta: any;
  currentViz: any;
  source: any;
  tableData?: string;
}> = ({ meta, currentViz, source, tableData }) => {
  return (
    <ExplorerSource>
      <SourceText>
        <strong>Data Source: </strong>
        <p>{source}</p>
      </SourceText>

      {meta.sabha !== 'editorial-notes' && (
        <SourceButtons data-html2canvas-ignore>
          <Share size="compact" title="share viz" />
          {typeof window !== 'undefined' && (
            <DownloadViz
              tableData={tableData ? tableData : {}}
              viz={currentViz}
              meta={meta}
            />
          )}
        </SourceButtons>
      )}
    </ExplorerSource>
  );
};

export default Source;

const ExplorerSource = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;

  @media (max-width: 480px) {
    padding: 6px 12px;
  }
`;

const SourceText = styled.div`
  /* flex-basis: 35%; */
  flex-grow: 1;
  flex-basis: 50%;
  max-width: 80%;

  font-size: 0.875rem;
  line-height: 1.7;

  strong {
    font-weight: 600;
  }

  p {
    font-weight: var(--font-weight-light);
    display: inline;
  }
`;

const SourceButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
