import React from 'react';
import { SearchInput } from 'components/data/Search/Search';

const SearchCons = ({ data, onFilter }) => {
  console.log(data);

  function handleSearch(query, list) {
    let newList = [];

    if (query.length > 0) {
      list?.forEach((obj) => {
        const filteredCons = obj.children.filter((item) =>
          item.constName.toLowerCase().includes(query.toLowerCase())
        );
        if (filteredCons.length) {
          newList.push({ char: obj.char, children: filteredCons });
        }
      });

      return newList;
    } else return data;
  }

  function handleChange(val) {
    onFilter(handleSearch(val, data));
  }

  return (
    <SearchInput
      type="search"
      name="q"
      id="searchInput"
      onChange={(e) => handleChange(e.target.value)}
      placeholder={'Search here...'}
      aria-label="Search"
      autoComplete="off"
    />
  );
};

export default SearchCons;
