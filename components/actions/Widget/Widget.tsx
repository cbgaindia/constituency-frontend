import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'components/actions';
import styled from 'styled-components';
import ButtonComp from '../Button/ButtonComp';

interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * Button Content
   */
  buttonContent: string;

  /**
   * Button Content
   */
  buttonSize?: 'sm' | 'md';

  /**
   * Button Content
   */
  icon: React.ReactElement;

  /**
   * Button title
   */
  title?: string;

  /**
   * custom class for button
   */
  buttonClass?: string;

  /**
   * closeWidget from parent
   */
  closeWidget?: boolean;

  /**
   * Button style
   */
  buttonStyle?:
    | 'primary'
    | 'secondary'
    | 'primary-outline'
    | 'secondary-outline'
    | 'custom';
}
const widgetID = uuidv4();

const Widget = ({
  buttonContent,
  title = 'widget',
  buttonStyle = 'custom',
  buttonSize = 'md',
  buttonClass,
  icon,
  children,
  closeWidget = false,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const activatorRef = useRef(null);
  const dropdownListRef = useRef(null);

  const wrapKeyHandler = (event) => {
    if (event.key === 'Escape' && isOpen) {
      // escape key
      setIsOpen(false);
      activatorRef.current.focus();
    }
  };

  useEffect(() => {
    if (closeWidget) {
      setIsOpen(false);
      activatorRef.current.focus();
    }
  }, [closeWidget]);

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const clickOutsideHandler = (event) => {
    if (
      dropdownListRef.current.contains(event.target) ||
      activatorRef.current.contains(event.target)
    ) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mouseup', clickOutsideHandler);
      dropdownListRef.current.querySelector(':not([disabled])').focus();
    } else {
      document.removeEventListener('mouseup', clickOutsideHandler);
    }

    return () => {
      document.removeEventListener('mouseup', clickOutsideHandler);
    };
  }, [isOpen]);

  return (
    <WidgetComp onKeyUp={wrapKeyHandler} {...props}>
      <Button
        kind={buttonStyle}
        size={buttonSize}
        aria-expanded="false"
        icon={icon}
        aria-controls={widgetID}
        aria-label={`Show ${title}`}
        data-text-for-show={`Show ${title}`}
        data-text-for-hide={`Hide ${title}`}
        onClick={clickHandler}
        className={buttonClass ? buttonClass : null}
        passRef={activatorRef}
      >
        {buttonContent}
      </Button>
      {
        <WidgetContent
          className={`${isOpen ? 'widget__active' : ''}`}
          id={widgetID}
          ref={dropdownListRef}
          tabIndex={-1}
        >
          {children}
        </WidgetContent>
      }
    </WidgetComp>
  );
};
export default Widget;

export const WidgetComp = styled.div`
  position: relative;
  height: 100%;

  ${ButtonComp} {
    &[aria-expanded='true'] {
      background-color: #ebfeff;
    }
  }
`;

export const WidgetContent = styled.div`
  position: absolute;
  top: 3.5rem;
  display: none;
  isolation: isolate;
  z-index: 20;

  &.widget__active {
    display: block;
  }
`;
