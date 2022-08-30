import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Box,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@opub-cdl/design-system';
import {
  fullScreenMode,
  groupListByAlphabets,
  sortArrayOfObj,
} from 'utils/helper';
import { FullScreen, LokSabha, VidhanSabha } from 'components/icons';
import { Button } from 'components/actions';
import SearchCons from './SearchCons';

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

  React.useEffect(() => {
    setStateData([
      {
        value: 'vidhan',
        name: 'Vidhan Sabha',
        engName: 'Parliament Constituency',
        icon: <VidhanSabha />,
        list: vidhanData,
      },
      {
        value: 'lok',
        name: 'Lok Sabha',
        engName: 'Assembly Constituency',
        icon: <LokSabha />,
        list: lokData,
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
      <StyledTabs
        defaultValue="vidhan"
        onValueChange={(e) => setSelectedSabha(e)}
      >
        {stateData.length > 0 && (
          <>
            <StyledTabsList>
              <SabhaToggle>
                {stateData.map((item) => (
                  <TabsTrigger key={item.name} value={item.value}>
                    <Box>{item.icon}</Box>
                    <TabTriggerName>
                      {item.name}
                      <span>{item.engName}</span>
                    </TabTriggerName>
                  </TabsTrigger>
                ))}
              </SabhaToggle>
              <Button
                icon={<FullScreen fill="#1D7548" />}
                iconOnly={true}
                kind="custom"
                onClick={() => fullScreenMode('stateListWrapper')}
                id="fullScreen"
              >
                Full screen mode
              </Button>
            </StyledTabsList>
            {stateData.map((item) => (
              <TabsContent key={item.name} value={item.value}>
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
                                  href={`/${data.state}/${selectedSabha}/${cons.constName}`}
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
              </TabsContent>
            ))}
          </>
        )}
      </StyledTabs>
    </Wrapper>
  );
};

export default StateList;

const Wrapper = styled.div`
  margin-top: 32px;

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

const StyledTabs = styled(Tabs)`
  margin-top: 32px;
`;

export const StyledTabsList = styled(TabsList)`
  background-color: var(--color-background-lighter);
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  button {
    font-weight: 600;
    padding: 10px 20px;
    color: var(--text-light-medium);
    border-right: var(--border-2);
    gap: 12px;
    flex: unset;
    cursor: pointer;

    &[data-value='editorial-notes'] {
      border-inline: var(--border-2);
    }

    &[data-state='active'] {
      color: var(--color-amazon-300);
      background-color: var(--color-amazon-00);

      svg {
        fill: var(--color-amazon-300);
      }

      span {
        color: var(--color-amazon-200);
      }
    }

    @media screen and (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
`;

export const SabhaToggle = styled.div`
  display: flex;
  flex-wrap: wrap;

  button {
    align-items: flex-start;
    min-width: 190px;

    svg {
      max-width: 40px;
      max-height: 40px;
      margin-inline-end: 0;
      fill: var(--color-grey-300);
    }
  }
`;

export const TabTriggerName = styled.div`
  text-align: start;
  pointer-events: none;

  span {
    text-align: start;
    line-height: 1.7;
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--text-light-light);
    display: block;
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
  overflow-y: auto;

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
