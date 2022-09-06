import styled from 'styled-components';
import { Search } from 'components/data';

export const SchemeSearch = () => {
  return (
    <SearchWrapper>
      <Search
        onChange={(e) => {}}
        placeholder={'Search here...'}
        aria-label="Search"
      />
    </SearchWrapper>
  );
};
const SearchWrapper = styled.div`
  margin-top: 32px;
  padding: 12px;
  background-color: var(--color-background-lighter);
  border: var(--border-2);
  box-shadow: var(--box-shadow-1);
  border-radius: 4px;
`;
