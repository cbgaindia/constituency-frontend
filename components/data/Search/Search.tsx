import React from 'react';
import { Cross } from 'components/icons';
import styled from 'styled-components';

const Search: React.FC<{ placeholder?: string; onChange: any }> = ({
  placeholder,
  onChange,
}) => {
  const handleChange = (value) => {
    onChange(value);

    const clearBtn = document.getElementById('search__clear');
    if (value.length) {
      clearBtn.removeAttribute('hidden');
    } else {
      clearBtn.setAttribute('hidden', 'true');
    }
  };

  function handleClear() {
    const input = document.getElementById('searchInput') as HTMLInputElement;
    input.value = '';
    input.focus();
    onChange('');
  }

  return (
    <Wrapper className="search-input">
      <SearchInput
        type="search"
        name="q"
        id="searchInput"
        onChange={(e) => handleChange(e.target.value)}
        placeholder={
          placeholder ? placeholder : 'Try COVID, Hospital, Construction'
        }
        aria-label="Search"
      />
      <SearchClear
        type="button"
        title="Clear search field"
        onClick={handleClear}
        id="search__clear"
        hidden
      >
        <span className="sr-only">Clear search field</span>
        <Cross fill="#494D44" />
      </SearchClear>
    </Wrapper>
  );
};

export default React.memo(Search);

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const SearchInput = styled.input`
  -webkit-appearance: none;

  border: 2px solid rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  background-color: var(--color-background-light);
  padding: 12px 8px 12px 50px;

  width: 100%;
  line-height: 1.5;
  font-weight: 600;
  color: var(--text-light-medium);

  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.5 14H14.71L14.43 13.73C15.63 12.33 16.25 10.42 15.91 8.39002C15.44 5.61002 13.12 3.39002 10.32 3.05002C6.09001 2.53002 2.53002 6.09001 3.05002 10.32C3.39002 13.12 5.61002 15.44 8.39002 15.91C10.42 16.25 12.33 15.63 13.73 14.43L14 14.71V15.5L18.25 19.75C18.66 20.16 19.33 20.16 19.74 19.75C20.15 19.34 20.15 18.67 19.74 18.26L15.5 14ZM9.50002 14C7.01002 14 5.00002 11.99 5.00002 9.50002C5.00002 7.01002 7.01002 5.00002 9.50002 5.00002C11.99 5.00002 14 7.01002 14 9.50002C14 11.99 11.99 14 9.50002 14Z' fill='%23888F8B'/%3E%3C/svg%3E");
  background-position: left 1rem top 50%, 0 0;
  background-repeat: no-repeat, repeat;
`;

export const SearchClear = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);

  button {
    cursor: pointer;
  }
`;
