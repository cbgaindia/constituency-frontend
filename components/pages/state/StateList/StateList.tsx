import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { groupListByAlphabets, sortArrayOfObj } from 'utils/helper';
import { LokSabha, VidhanSabha } from 'components/icons';
import { Toolbar } from 'components/layouts';
import SearchCons from './SearchCons';

const ConsMapView = dynamic(() => import('./ConsMapView'), {
  ssr: false,
  loading: () => <LoadingMap>Loading Map...</LoadingMap>,
});

const StateList = ({ data }) => {
  const [stateData, setStateData] = React.useState<any>([]);
  const [formattedData, setFormattedData] = React.useState<any>([]);
  const [lokData, setLokData] = React.useState<any>([]);
  const [vidhanData, setVidhanData] = React.useState<any>([]);
  const [selectedSabha, setSelectedSabha] = React.useState<any>('vidhan');

  React.useEffect(() => {
    // first sort the object, then group them by first character.
    const formattedVidhan = groupListByAlphabets(
      sortArrayOfObj(data.vidhan, 'constituency'),
      'constituency'
    );
    setVidhanData(formattedVidhan);

    const formattedLok = groupListByAlphabets(
      sortArrayOfObj(data.lok, 'constituency'),
      'constituency'
    );
    setLokData(formattedLok);

    setFormattedData({
      lok: formattedLok,
      vidhan: formattedVidhan,
    });
  }, [data]);

  const generateConsList = React.useCallback(
    (item) => {
      return (
        <ConsWrapper>
          <MapWrapper>
            <ConsMapView
              consData={data}
              meta={{ sabha: selectedSabha, state: data.state }}
            />
          </MapWrapper>

          <ConsList>
            <SearchCons
              data={formattedData[item.value]}
              onFilter={(arr) => onFilterChange(arr)}
            />
            <ol>
              {item.list &&
                item.list.map((group: any) => {
                  return (
                    <li key={group.char}>
                      <span>{group.char}</span>
                      <ul>
                        {group.children.map((cons) => (
                          <li key={cons.constituency_code + cons.constituency}>
                            <Link
                              href={`/${data.state}/${item.value}/${cons.constituency}`}
                              passHref
                            >
                              <ConsLink>{cons.constituency}</ConsLink>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
            </ol>
          </ConsList>
        </ConsWrapper>
      );
    },
    [vidhanData, lokData, selectedSabha]
  );

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
  }, [lokData, vidhanData, selectedSabha]);

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
  min-height: 764px;

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

const MapWrapper = styled.div`
  flex-basis: 70%;
  flex-grow: 1;
  background-color: var(--color-background-lighter);
  padding: 24px;
  border-radius: 4px;
  border: var(--border-2);
  filter: drop-shadow(var(--box-shadow-1));

  @media (max-width: 810px) {
    display: none;
  }
`;

const ConsList = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 312px;
  min-width: 312px;
  flex-grow: 1;
  gap: 8px;

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
    display: inline-block;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-wrap: wrap;
  }
`;

const ConsWrapper = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 16px;
`;

const LoadingMap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
