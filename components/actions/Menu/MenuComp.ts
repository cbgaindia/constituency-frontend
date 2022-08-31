import styled from 'styled-components';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@opub-cdl/design-system';

interface MenuProps {
  /**
   * show or hide label of menu
   */
  readonly showLabel?: boolean;
}

export const MenuComp = styled.div<MenuProps>`
  display: grid;
  grid-template-columns: ${(props: any) =>
    props.showLabel == true ? 'minmax(0, auto) 1fr' : '1fr'};
  align-items: center;
`;

export const MenuLabel = styled.span`
  font-weight: var(--font-weight-medium);
  font-size: 14px;
`;

export const MenuButton = styled(DropdownMenuTrigger)`
  padding: 8px;
  border: var(--border-1);
  border-radius: 2px;

  background-color: var(--color-background-lighter);
  color: var(--text-light-light);

  font-weight: 600;
  line-height: 1.5;
  text-align: start;

  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    transition: transform 150ms ease;
  }

  &[aria-expanded='true'] svg {
    transform: rotate(-180deg);
  }
`;

export const MenuContent = styled(DropdownMenuContent)`
  background-color: var(--color-background-lighter);
  border: var(--border-1);
  box-shadow: var(--box-shadow-1);
  border-radius: 4px;
  padding: 8px;

  display: flex;
  flex-direction: column;

  max-height: 300px;
  overflow-y: auto;
`;

export const MenuItem = styled(DropdownMenuItem)`
  span {
    min-width: 80px;

    line-height: 22px;
    border-radius: 4px;
    transition: background-color 150ms ease;

    padding: 8px;
    text-align: start;
    display: inline-block;

    &:hover,
    &:focus-visible {
      background-color: var(--color-grey-600);
    }
  }
`;
