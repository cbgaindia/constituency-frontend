import React from 'react';

import {
  Box,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@opub-cdl/design-system';
import styled from 'styled-components';
import { Button } from 'components/actions';
import { FullScreen } from 'components/icons';
import { fullScreenMode } from 'utils/helper';

type Props = {
  data: any;
  fullScreenId?: string;
  onValueChange?: (e) => void;
  defaultValue?: string;
};

const Toolbar = ({
  data,
  onValueChange,
  fullScreenId,
  defaultValue,
}: Props) => {
  return (
    <Tabs
      defaultValue={defaultValue ? defaultValue : data[0].value}
      onValueChange={onValueChange ? (e) => onValueChange(e) : null}
    >
      {data.length > 0 && (
        <>
          <StyledTabsList>
            <SabhaToggle>
              {data.map((item) => (
                <TabsTrigger key={item.name} value={item.value}>
                  {item.icon && <Box>{item.icon}</Box>}
                  <TabTriggerName>
                    {item.name}
                    {item.altName && <span>{item.altName}</span>}
                  </TabTriggerName>
                </TabsTrigger>
              ))}
            </SabhaToggle>
            {fullScreenId && (
              <Button
                icon={<FullScreen fill="#1D7548" />}
                iconOnly={true}
                kind="custom"
                onClick={() => fullScreenMode(fullScreenId)}
                id="fullScreen"
              >
                Full screen mode
              </Button>
            )}
          </StyledTabsList>
          {data.map((item) => (
            <TabsContent key={item.name} value={item.value}>
              {item.content}
            </TabsContent>
          ))}
        </>
      )}
    </Tabs>
  );
};

export default Toolbar;

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
