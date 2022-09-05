import React, { useId } from 'react';
import {
  MenuButton,
  MenuContent,
  MenuComp,
  MenuItem,
  MenuLabel,
} from './MenuComp';
import { IconDropdown } from 'components/icons';
import { DropdownMenu } from '@opub-cdl/design-system';

interface Props {
  /**
   * Options to display in the menu
   */
  options: {
    value: string;
    title: string;
  }[];

  /**
   * current value of menu, it will change on selection
   */
  value?: string;

  showLabel?: boolean;

  /**
   * Heading for the menu
   */
  heading?: string;

  className?: string;

  /**
   * return prop
   */
  handleChange: (event: string) => void;
}

const Menu = ({
  options,
  heading = 'Open Menu',
  handleChange,
  value,
  showLabel = true,
  ...props
}: Props) => {
  const menuLabelID = useId();

  return (
    <MenuComp showLabel={showLabel} {...props}>
      {heading && value && showLabel && (
        <MenuLabel id={menuLabelID}>{heading}</MenuLabel>
      )}
      <DropdownMenu modal={false}>
        <MenuButton aria-labelledby={menuLabelID}>
          {value ? value : heading}
          <IconDropdown width={32} fill="#888F8B" />
        </MenuButton>
        <MenuContent loop hideArrow sideOffset={2}>
          {options.length > 0 ? (
            options.map((item) => (
              <MenuItem
                data-value={item.value}
                onSelect={(e: any) => handleChange(e.target.dataset.value)}
                key={item.value}
              >
                <span>{item.title}</span>
              </MenuItem>
            ))
          ) : (
            <span>No Items</span>
          )}
        </MenuContent>
      </DropdownMenu>
    </MenuComp>
  );
};

export default Menu;
