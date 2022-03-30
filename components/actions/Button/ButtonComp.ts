import styled from 'styled-components';

interface ButtonProps {
  readonly buttonType?: string;
  readonly size?: string;
  readonly bg?: string;
  readonly iconSide?: string;
  readonly iconOnly?: boolean;
  readonly fluid?: boolean;
}

function bgColor(type: string, bg: string) {
  if (type == 'custom') {
    return 'null';
  } else if (bg) {
    return bg;
  } else {
    switch (type) {
      case 'primary':
        return 'var(--color-primary)';
      case 'secondary':
        return 'var(--color-maple-200)';
      default:
        return 'transparent';
    }
  }
}

function color(type: string) {
  if (type == 'custom') {
    return 'null';
  }
  if (type == 'primary' || type == 'secondary') return 'var(--text-dark-high)';
  else if (type == 'primary-outline') return 'var(--color-primary)';
  else return 'var(--color-maple-200)';
}

function border(type: string) {
  if (type == 'custom') {
    return 'null';
  }
  if (type == 'primary' || type == 'secondary') return 'none';
  else if (type == 'primary-outline')
    return `2px solid ${'var(--color-primary)'}`;
  else return `2px solid ${'var(--color-maple-200)'}`;
}

function buttonSize(size: string, type: string) {
  if (type == 'custom') {
    return 'null';
  }
  if (type == 'primary-outline' || type == 'secondary-outline') {
    if (size == 'sm') return '6px 10px';
    else return '10px 22px';
  } else {
    if (size == 'sm') return '8px 12px';
    else return '12px 24px';
  }
}

function buttonFont(size: string) {
  if (size == 'sm') return '12px';
  else return '1rem';
}

// change inline padding incase of icon
function iconPadding(iconSide, size, iconOnly) {
  if (iconOnly) {
    return 'padding: 8px;';
  }

  if (iconSide) {
    if (size == 'sm') {
      if (iconSide == 'left') return 'padding-left: 8px;';
      else return 'padding-right: 8px;';
    }
    if (iconSide == 'left') return 'padding-left: 20px;';
    else return 'padding-right: 20px;';
  }
}

const ButtonWrapper = styled.button<ButtonProps>`
  font-size: ${(props: any) => buttonFont(props.size)};
  line-height: 1.5;
  font-weight: 600;
  display: flex;
  align-items: center;
  width: ${(props: any) => (props.fluid == true ? '100%' : 'fit-content')};
  justify-content: ${(props: any) => (props.fluid == true ? 'center' : null)};
  cursor: pointer;

  background-color: ${(props: any) => bgColor(props.buttonType, props.bg)};
  color: ${(props: any) => color(props.buttonType)};
  padding: ${(props: any) => buttonSize(props.size, props.buttonType)};
  border: ${(props: any) => border(props.buttonType)};
  border-radius: 2px;
  text-decoration: none;

  ${(props: any) => iconPadding(props.iconSide, props.size, props.iconOnly)}

  svg {
    max-width: ${(props: any) =>
      props.size == 'sm' ? '18px' : props.iconOnly ? '32px' : '24px'};
    max-height: ${(props: any) =>
      props.size == 'sm' ? '18px' : props.iconOnly ? '32px' : '24px'};
    fill: currentColor;
    pointer-events: none;

    ${(props: any) =>
      !props.iconOnly
        ? props.iconSide == 'left'
          ? 'margin-inline-end: 0.5em'
          : 'margin-inline-start: 0.5em'
        : null}
  }
`;

export default ButtonWrapper;
