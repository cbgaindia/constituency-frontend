import Link from 'next/link';
import styled from 'styled-components';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@opub-cdl/design-system';
import { sortArrayOfObj } from 'utils/helper';

const StateList = ({ lok, vidhan }) => {
  const data = [
    {
      value: 'lok',
      name: 'Lok Sabha',
      list: sortArrayOfObj(lok, 'constName'),
    },
    {
      value: 'vidhan',
      name: 'Vidhan Sabha',
      list: sortArrayOfObj(vidhan, 'constName'),
    },
  ];

  return (
    <Wrapper>
      <span className="gradient-maple">Drilldown Further</span>
      <h2>Explore Constituencies</h2>
      <StyledTabs defaultValue="lok">
        <TabsList>
          {data.map((item) => (
            <StyledTrigger key={item.name} value={item.value}>
              {item.name}
            </StyledTrigger>
          ))}
        </TabsList>
        {data.map((item) => (
          <TabsContent key={item.name} value={item.value}>
            <ul>
              {item.list &&
                item.list.map((cons) => {
                  return (
                    <li key={cons.constCode}>
                      <Link href={cons.constName} passHref>
                        <ConsLink>{cons.constName}</ConsLink>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </TabsContent>
        ))}
      </StyledTabs>
    </Wrapper>
  );
};

export default StateList;

const Wrapper = styled.div`
  margin-top: 80px;

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
    margin-top: 8px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-top: 16px;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));
  }
`;

const ConsLink = styled.a`
  color: var(--color-violet-3);
  font-weight: var(--font-weight-medium);
  text-decoration-color: transparent;
  text-decoration-thickness: 2px;
  text-transform: capitalize;

  &:hover {
    text-decoration-color: inherit;
  }
`;

const StyledTabs = styled(Tabs)`
  margin-top: 20px;
`;

const StyledTrigger = styled(TabsTrigger)`
  flex: unset;
`;
