import styled from 'styled-components';

interface MenuProps {
  /**
   * should the menu open to top
   */
  readonly top?: true | false;

  /**
   * should the menu stick to left or right
   */
  readonly position?: 'left' | 'right';

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
  color: var(--text-light-medium);
  font-size: 14px;
`;

export const Wrapper = styled.div`
  position: relative;
  height: 100%;

  button {
    color: var(--text-light-high);
  }
`;

export const MenuButton = styled.button`
  background-color: var(--color-background-lighter);
  border: var(--border-1);
  border-radius: 4px;
  box-shadow: var(--box-shadow-inset);
  padding: 11px 12px;
  line-height: 1.5;
  position: relative;
  text-align: start;

  > span {
    width: 97%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  > div {
    background-color: var(--color-background-lighter);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    line-height: 0;
  }

  svg {
    transition: transform 150ms ease;
  }

  &[aria-expanded='true'] svg {
    transform: rotate(-180deg);
  }
`;

export const MenuContent = styled.ul<MenuProps>`
  position: absolute;
  isolation: isolate;
  margin-top: -1px;
  z-index: 20;
  left: ${(props: any) => (props.position == 'left' ? 0 : null)};
  right: ${(props: any) => (props.position == 'right' ? 0 : null)};
  bottom: ${(props: any) => (props.top == true ? '100%' : null)};

  background-color: var(--color-background-lighter);
  border: var(--border-1);
  box-shadow: var(--box-shadow-1);
  border-radius: ${(props: any) => (props.top == true ? '4px 4px 0 0' : '0 0 4px 4px')};
  padding: 8px;

  max-height: 300px;
  overflow-y: auto;
  width: 100%;
`;

export const MenuItem = styled.li`
  line-height: 22px;
  border-radius: 4px;
  transition: background-color 150ms ease;

  button {
    padding: 8px;
    width: 100%;
    text-align: start;
    height: 100%;

    &:hover,
    &:focus-visible {
      background-color: var(--color-grey-600);
    }
  }
`;
