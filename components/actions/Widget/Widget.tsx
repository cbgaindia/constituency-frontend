import React, { useState, useRef, useEffect, useId } from 'react';
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
   * callback function when widget is opened
   */
  onOpen?: () => void;

  /**
   * callback function when widget is closed
   */
  onClose?: () => void;

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
const Widget = ({
  buttonContent,
  title = 'widget',
  buttonStyle = 'custom',
  buttonSize = 'md',
  buttonClass,
  icon,
  children,
  closeWidget = false,
  onOpen,
  onClose,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const activatorRef = useRef(null);
  const dropdownListRef = useRef(null);
  const widgetID = useId();

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
    if (isOpen && onClose) onClose();
    if (!isOpen && onOpen) onOpen();
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
        // icon={icon}
        aria-controls={widgetID}
        aria-label={`Show ${title}`}
        data-text-for-show={`Show ${title}`}
        data-text-for-hide={`Hide ${title}`}
        onClick={clickHandler}
        className={buttonClass ? buttonClass : null}
        passRef={activatorRef}
      >
        <span>{buttonContent}</span>
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

  > ${ButtonComp} {
    text-align: start;

    background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' %3E%3Cpath d='M9.333 13.333 16 20l6.667-6.667H9.333Z' fill='%23ABB0AD' /%3E%3C/svg%3E");
    background-repeat: no-repeat, repeat;
    background-position: right 12px top 50%, 0 0;

    @media (max-width: 520px) {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &[aria-expanded='true'] {
      background-color: #ebfeff;
    }

    > span {
      display: block;
      max-width: 85%;
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
