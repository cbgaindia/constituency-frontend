import React from 'react';
import { Search } from 'components/data/Search';
import { handleArrOfObjSearch } from 'utils/helper';

const SearchCons = ({ data, onFilter }) => {
  function handleChange(val) {
    onFilter(handleArrOfObjSearch(val, data));
  }

  return (
    <Search
      onChange={(e) => handleChange(e)}
      placeholder={'Search here...'}
      aria-label="Search"
    />
  );
};

export default SearchCons;
