import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { groupListByAlphabets, sortArrayOfObj } from 'utils/helper';
import { LokSabha, VidhanSabha } from 'components/icons';
import SearchCons from './SearchCons';
import { Toolbar } from 'components/layouts';

const StateList = ({ data }) => {
  const [stateData, setStateData] = React.useState<any>([]);
  const [formattedData, setFormattedData] = React.useState<any>([]);
  const [lokData, setLokData] = React.useState<any>([]);
  const [vidhanData, setVidhanData] = React.useState<any>([]);
  const [selectedSabha, setSelectedSabha] = React.useState<any>('vidhan');

  React.useEffect(() => {
    // first sort the object, then group them by first character.

    const formattedVidhan = groupListByAlphabets(
      sortArrayOfObj(data.vidhan, 'constName'),
      'constName'
    );
    setVidhanData(formattedVidhan);

    const formattedLok = groupListByAlphabets(
      sortArrayOfObj(data.lok, 'constName'),
      'constName'
    );
    setLokData(formattedLok);

    setFormattedData({
      lok: formattedLok,
      vidhan: formattedVidhan,
    });
  }, [data]);

  function generateConsList(item) {
    return (
      <ConsList>
        <SearchCons
          data={formattedData[item.value]}
          onFilter={(arr) => onFilterChange(arr)}
        />

        {item.list &&
          item.list.map((group: any) => {
            return (
              <li key={group.char}>
                <span>{group.char}</span>
                <ul>
                  {group.children.map((cons) => (
                    <li key={cons.constCode + cons.constName}>
                      <Link
                        href={`/${data.state}/${item.value}/${cons.constName}`}
                        passHref
                      >
                        <ConsLink>{cons.constName}</ConsLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
      </ConsList>
    );
  }

  React.useEffect(() => {
    setStateData([
      {
        value: 'vidhan',
        name: 'Vidhan Sabha',
        altName: 'Parliament Constituency',
        icon: <VidhanSabha />,
        content: generateConsList({ value: 'vidhan', list: vidhanData }),
      },
      {
        value: 'lok',
        name: 'Lok Sabha',
        altName: 'Assembly Constituency',
        icon: <LokSabha />,
        content: generateConsList({ value: 'lok', list: lokData }),
      },
    ]);
  }, [lokData, vidhanData]);

  function onFilterChange(arr) {
    if (selectedSabha == 'lok') {
      setLokData(arr);
    } else setVidhanData(arr);
  }

  return (
    <Wrapper id="stateListWrapper">
      <h2>Explore Constituencies</h2>
      <Toolbar
        defaultValue="vidhan"
        fullScreenId="stateListWrapper"
        data={stateData}
        onValueChange={(e) => setSelectedSabha(e)}
      />
    </Wrapper>
  );
};

export default StateList;

const Wrapper = styled.div`
  margin-top: 32px;
  background-color: var(--color-background-light);

  > span {
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1.7;
  }

  > h2 {
    font-weight: 600;
    line-height: 1.24;
    font-size: 2rem;
    margin-bottom: 32px;
  }
`;

const ConsLink = styled.a`
  color: var(--color-amazon-100);
  font-weight: var(--font-weight-medium);
  text-decoration-color: transparent;
  text-decoration-thickness: 2px;
  text-transform: capitalize;

  &:hover {
    text-decoration-color: inherit;
    color: var(--color-amazon-300);
  }
`;

const ConsList = styled.ol`
  display: flex;
  flex-direction: column;
  /* max-width: 312px; */ //
  gap: 8px;
  margin-top: 16px;

  background-color: var(--color-background-lighter);
  padding: 16px;
  filter: var(--box-shadow-1);
  border-radius: 4px;

  height: 680px;
  overflow-y: scroll;

  span {
    font-weight: 700;
    margin-top: 16px;
    text-transform: capitalize;
    display: inline-block; //
  }

  > li:first-of-type {
    margin-top: 16px;
  }

  ul {
    display: flex;
    /* flex-direction: column; */ //
    /* gap: 4px; */ //
    gap: 20px; //
    flex-wrap: wrap; //
  }
`;
