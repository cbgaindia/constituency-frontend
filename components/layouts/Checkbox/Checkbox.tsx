import React from 'react';
import styled from 'styled-components';

const Checkbox = ({
  id,
  text,
  name,
  color = 'var(--color-grey-200)',
  tick = false,
  ...props
}) => {
  return (
    <CheckboxItem id={id} color={color} {...props}>
      <input type="checkbox" name={name} value={id} />
      {text}
    </CheckboxItem>
  );
};

export default Checkbox;

export const CheckboxItem = styled.label`
  display: grid;
  grid-template-columns: 1em auto;
  align-items: baseline;
  gap: 1em;
  color: var(--text-light-medium);
  cursor: pointer;

  input {
    /* Remove native radio style */
    appearance: none;
    background-color: #fff;
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;

    &::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em
        ${(props) => (props.color ? props.color : 'var(--color-grey-200)')};

      /* Windows High Contrast Mode */
      background-color: CanvasText;
    }

    &:checked::before {
      transform: scale(1);
    }

    &:focus-visible {
      outline: max(2px, 0.15em) solid currentColor;
      outline-offset: max(2px, 0.15em);
    }
  }
`;
