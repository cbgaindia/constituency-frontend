import React, { useEffect, useState, useRef } from 'react';
import {
  FilterComp,
  FilterButton,
  FilterHeading,
  FilterContent,
  FilterSearch,
  FilterSelected,
} from './FilterComp';
import { Cross } from 'components/icons';
import { truncate } from 'lodash';
import Chevron from 'components/icons/Chevron';
import { filterChange, selectedFilterClass } from './filter.helper';
import { sectionCollapse, simplifyNaming } from 'utils/helper';

const dataObj = {};
const filterSearch = {};

const Filter: React.FC<{
  data: any;
  newFilters: any;
  fq: any;
  simpleNames?: any;
}> = ({ data, newFilters, fq, simpleNames }) => {
  const [filterResult, setFilterResult] = useState({});
  const filterRef = useRef(null);

  useEffect(() => {
    Object.keys(data).forEach((val) => {
      dataObj[val] = [];
      filterSearch[val] = data[val].items;
    });
    setFilterResult({ ...filterSearch });

    // if filter query available on page load, add class to relevant buttons
    selectedFilterClass(fq, dataObj);
  }, []);

  function handleFilterSearch(val: string, id: string) {
    const searchFilter = data[id].items.filter((item: any) =>
      JSON.stringify(item).toLowerCase().includes(val.toLowerCase())
    );
    filterSearch[id] = searchFilter;

    setFilterResult({ ...filterSearch });
    setTimeout(() => {
      dataObj[id].forEach((item) => {
        const activeBtn = document.getElementById(item);
        activeBtn && activeBtn.setAttribute('aria-pressed', 'true');
      });
    }, 100);
  }

  function handleFilterChange(e: any) {
    const finalFilter = filterChange(e, dataObj);
    newFilters({
      query: 'fq',
      value: finalFilter,
    });
  }

  return (
    <FilterComp className="filters" ref={filterRef}>
      <h3 className="heading">Filters</h3>
      {Object.keys(data).map((filter: any, index: number) => (
        <React.Fragment key={`filters-${index}`}>
          <FilterHeading
            aria-expanded="false"
            onClick={(e) => sectionCollapse(e, filterRef)}
          >
            {simpleNames
              ? simplifyNaming(data[filter].title, simpleNames)
              : data[filter].title}
            <Chevron />
          </FilterHeading>

          <FilterContent hidden>
            <FilterSearch
              type="text"
              placeholder={`search ${
                simpleNames
                  ? simplifyNaming(data[filter].title, simpleNames)
                  : data[filter].title
              }`}
              onChange={(e) => handleFilterSearch(e.target.value, filter)}
            />
            {filterResult[filter] &&
              filterResult[filter].map((item: any) => (
                <FilterButton
                  key={item.name}
                  data-type={data[filter].title}
                  id={item.name}
                  onClick={handleFilterChange}
                  type="button"
                  aria-pressed="false"
                >
                  {`${item.display_name} (${item.count})`}
                </FilterButton>
              ))}
          </FilterContent>
          <FilterSelected>
            {dataObj[filter] &&
              dataObj[filter].map((item: string) => (
                <li key={item}>
                  <button
                    data-type={filter}
                    data-id={item}
                    onClick={handleFilterChange}
                  >
                    {truncate(item.replace(/_/g, ' '), { length: 30 })}{' '}
                    <Cross width={24} height={24} />
                  </button>
                </li>
              ))}
          </FilterSelected>
        </React.Fragment>
      ))}
    </FilterComp>
  );
};

export default Filter;
