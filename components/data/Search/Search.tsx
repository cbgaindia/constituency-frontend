import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'components/actions';
import { Cross } from 'components/icons';
import styled from 'styled-components';

const Search: React.FC<{ text?: string; newSearch: any }> = ({
  text,
  newSearch,
}) => {
  const router = useRouter();
  const [q, setQ] = useState(router.query.q || '');

  const handleChange = (value) => {
    setQ(value);
  };

  function handleClear() {
    const input = document.getElementById('searchInput') as HTMLInputElement;
    input.value = '';
    input.focus();
    setQ('');
    newSearch('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    newSearch({
      query: 'q',
      value: q,
    });
  };
  return (
    <SearchWrapper onSubmit={handleSubmit} className="search">
      <Wrapper>
        <SearchInput
          type="search"
          name="q"
          value={q}
          id="searchInput"
          onChange={(e) => handleChange(e.target.value)}
          placeholder={text ? text : 'Try COVID, Hospital, Construction'}
          aria-label="Search"
        />
        <SearchClear
          type="button"
          title="Clear search field"
          onClick={handleClear}
          className="search__clear"
        >
          <span className="sr-only">Clear search field</span>
          <Cross width={24} height={24} fill="#076775" />
        </SearchClear>
      </Wrapper>
      <Button onClick={handleSubmit} className="search__submit">
        Submit <span className="sr-only">search</span>
      </Button>
    </SearchWrapper>
  );
};

export default Search;

export const SearchWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  position: relative;
  flex-grow: 1;

  .search__submit {
    padding: 9px 60px;
    transform: translateX(-5px);
    line-height: 134%;

    @media (max-width: 720px) {
      padding: 9px 24px;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const SearchInput = styled.input`
  border: 2px solid rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  background-color: var(--color-background-light);
  padding: 12px 8px 12px 50px;

  /* box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.08); */
  /* transition: background-color 150ms ease; */
  width: 100%;
  line-height: 1.5;
  font-weight: 600;
  color: var(--text-light-medium);

  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.5 14H14.71L14.43 13.73C15.63 12.33 16.25 10.42 15.91 8.39002C15.44 5.61002 13.12 3.39002 10.32 3.05002C6.09001 2.53002 2.53002 6.09001 3.05002 10.32C3.39002 13.12 5.61002 15.44 8.39002 15.91C10.42 16.25 12.33 15.63 13.73 14.43L14 14.71V15.5L18.25 19.75C18.66 20.16 19.33 20.16 19.74 19.75C20.15 19.34 20.15 18.67 19.74 18.26L15.5 14ZM9.50002 14C7.01002 14 5.00002 11.99 5.00002 9.50002C5.00002 7.01002 7.01002 5.00002 9.50002 5.00002C11.99 5.00002 14 7.01002 14 9.50002C14 11.99 11.99 14 9.50002 14Z' fill='%23888F8B'/%3E%3C/svg%3E");
  background-position: left 1rem top 50%, 0 0;
  background-repeat: no-repeat, repeat;

  &:not([value='']) {
    + .search__clear {
      display: block;
    }
  }
`;

export const SearchClear = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: none;

  button {
    cursor: pointer;
  }
`;
