import styled from 'styled-components';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@opub-cdl/design-system';
import { IconArrowRight } from 'components/icons';

const StateTab = ({ data, sabha }) => {
  return (
    <Wrapper>
      <Tabs defaultValue={Object.keys(data)[0]} orientation="vertical">
        <TabsList>
          {Object.keys(data) &&
            Object.keys(data).map((item) => (
              <StyleTrigger value={item} key={item}>
                <span>
                  {item}
                  <IconArrowRight width={24} />
                </span>
              </StyleTrigger>
            ))}
        </TabsList>

        {Object.keys(data) &&
          Object.keys(data).map((item) => (
            <StyledContent value={item} key={item}>
              <ul>
                {data[item].map((cons) => (
                  <ConsLink
                    href={`/${item}/${sabha}/${cons.constName}`}
                    key={cons.constCode}
                  >
                    {cons.constName}
                  </ConsLink>
                ))}
              </ul>
            </StyledContent>
          ))}
      </Tabs>
    </Wrapper>
  );
};

export default StateTab;

const Wrapper = styled.div`
  margin-top: 16px;

  [role='tablist'] {
    flex-basis: 170px;
  }
`;

const StyleTrigger = styled(TabsTrigger)`
  width: 100% !important;

  > span {
    width: 100%;
    border-radius: 2px;
    padding: 8px 16px;
    color: var(--text-light-medium);

    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      fill: #abb0ad;
    }
  }

  &[data-state='active'] {
    > span {
      background-color: var(--color-background-lighter);
      font-weight: 600;
      color: var(--text-light-high);
      text-decoration: underline;

      svg {
        fill: #888f8b;
      }
    }
  }
`;

const StyledContent = styled(TabsContent)`
  ul {
    background-color: var(--color-background-lighter);
    width: 100%;
    padding: 16px;
    border-radius: 2px;
    height: 656px;
    height: clamp(300px, 90vh, 656px);
    overflow-y: scroll;
  }
`;

const ConsLink = styled.a`
  color: var(--color-amazon-100);
  font-weight: 600;
  text-decoration-color: transparent;
  text-decoration-thickness: 2px;
  text-transform: capitalize;
  display: block;
  margin-top: 4px;

  &:hover {
    text-decoration-color: inherit;
    color: var(--color-amazon-300);
  }
`;
