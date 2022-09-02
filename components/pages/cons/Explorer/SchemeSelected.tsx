import { Search } from 'components/data';
import { ExplorerViz } from 'components/pages/explorer';
import styled from 'styled-components';

const SchemeSelected = ({ scheme }) => {
  return (
    <>
      <SearchWrapper>
        <Search
          onChange={(e) => {}}
          placeholder={'Search here...'}
          aria-label="Search"
        />
      </SearchWrapper>

      <ExplorerWrapper>
        {/* <ExplorerViz schemeRaw={scheme} meta={state} dispatch={dispatch} /> */}
      </ExplorerWrapper>
    </>
  );
};

export default SchemeSelected;

const SearchWrapper = styled.div`
  margin-top: 32px;
  padding: 12px;
  background-color: var(--color-background-lighter);
  border: var(--border-2);
  box-shadow: var(--box-shadow-1);
  border-radius: 4px;
`;

const ExplorerWrapper = styled.div`
  margin-top: 32px;
`;
