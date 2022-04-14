import { MapViz } from 'components/viz';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'utils/helper';

const ExplorerMap = ({ selectedSabha, state, selectedIndicator, mapData }) => {
  const [mapFile, setMapFile] = useState<any>({});
  const [mapValues, setMapvalues] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(undefined);

  async function getMapFile() {
    const mapFile = await fetch(
      `assets/maps/${selectedSabha}/${state}.json`
    ).then((res) => res.json());
    setMapFile(mapFile);
  }

  useEffect(() => {
    getMapFile();
  }, [selectedSabha, state]);

  useEffect(() => {
    if (mapFile.features) {
      const tempData = mapFile.features.map((item) => ({
        name: item.properties.name,
        value: Math.round(Math.random() * (600 - 20) + 20),
      }));
      setMapvalues(tempData);
    }
  }, [mapFile]);

  function handleSearch(query, obj) {
    let newObj = [];
    if (query.length > 0) {
      Object.keys(obj).forEach(() => {
        newObj = obj.filter((item) =>
          JSON.stringify(item, ['name'])
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      });
    }
    setSearchItems(newObj);
  }

  return (
    <Wrapper>
      <SearchWrapper>
        <input
          type="text"
          placeholder="Search here for constituency"
          onChange={(e) => debounce(handleSearch(e.target.value, mapValues))}
        />
        {searchItems.length > 0 && (
          <SearchResult>
            {searchItems.map((items, index) => (
              <li key={`searchItems-${index}`}>
                <button
                  id={items.name}
                  onClick={(e: any) => setSelectedItem(e.target.id)}
                >
                  {items.name}
                </button>
              </li>
            ))}
          </SearchResult>
        )}
      </SearchWrapper>

      <MapViz
        mapFile={mapFile}
        sabha={selectedSabha}
        selectedIndicator={selectedIndicator}
        data={mapValues}
      />
    </Wrapper>
  );
};

export default ExplorerMap;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const SearchWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  isolation: isolate;
  z-index: 10;

  > input {
    padding: 8px 8px 8px 36px;
    font-size: 0.875rem;
    color: var(--text-light-medium);
    border: var(--border-1);
    width: 100%;
    max-width: 276px;

    background-image: url("data:image/svg+xml,%0A%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.9162 9.6667H10.2579L10.0245 9.4417C11.0245 8.27503 11.5412 6.68337 11.2579 4.9917C10.8662 2.67503 8.93288 0.825033 6.59954 0.5417C3.07454 0.108366 0.107878 3.07503 0.541211 6.60003C0.824545 8.93337 2.67454 10.8667 4.99121 11.2584C6.68288 11.5417 8.27454 11.025 9.44121 10.025L9.66621 10.2584V10.9167L13.2079 14.4584C13.5495 14.8 14.1079 14.8 14.4495 14.4584C14.7912 14.1167 14.7912 13.5584 14.4495 13.2167L10.9162 9.6667ZM5.91621 9.6667C3.84121 9.6667 2.16621 7.9917 2.16621 5.9167C2.16621 3.8417 3.84121 2.1667 5.91621 2.1667C7.99121 2.1667 9.66621 3.8417 9.66621 5.9167C9.66621 7.9917 7.99121 9.6667 5.91621 9.6667Z' fill='%23666E6A'/%3E%3C/svg%3E");
    background-position: left 8px top 50%, 0px 0px;
    background-repeat: no-repeat, repeat;
  }
`;

const SearchResult = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-lighter);
  border: var(--border-1);
  box-shadow: var(--box-shadow-1);
  border-radius: 0px 0px 4px 4px;
  padding: 8px;
  max-height: 300px;
  overflow-y: auto;
  width: 100%;

  li {
    line-height: 22px;
    border-radius: 4px;

    button {
      padding: 8px;
      width: 100%;
      text-align: start;
      height: 100%;
      transition: background-color 150ms ease;

      &:hover {
        background-color: var(--color-grey-600);
      }
    }
  }
`;
