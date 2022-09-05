import React from 'react';
import { Search } from 'components/data/Search';
import { handleArrOfObjSearch } from 'utils/helper';

const SearchCons = ({ data, onFilter }) => {
  // function handleSearch(query, list) {
  //   let newList = [];

  //   if (query.length > 0) {
  //     list?.forEach((obj) => {
  //       const filteredCons = obj.children.filter((item) =>
  //         item.constName.toLowerCase().includes(query.toLowerCase())
  //       );
  //       if (filteredCons.length) {
  //         newList.push({ char: obj.char, children: filteredCons });
  //       }
  //     });

  //     return newList;
  //   } else return data;
  // }

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
