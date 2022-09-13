import React, { MutableRefObject, ReactElement } from 'react';
import ButtonWrapper from './ButtonComp';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Is this primary button or secondary?
   */
  kind?:
    | 'primary'
    | 'secondary'
    | 'primary-outline'
    | 'secondary-outline'
    | 'custom';
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md';
  /**
   * overwrite background color
   */
  bg?: string;

  /**
   * use it to pass ref from useRef hook
   */
  passRef?: MutableRefObject<any>;

  /**
   * whether to take full width
   */
  fluid?: boolean;
}

type LinkProps =
  | { href?: false; rel?: never; target?: never }
  | { href?: string; rel?: 'noreferrer'; target?: '_blank' };

type IconProps =
  | { icon?: false; iconSide?: never }
  | {
      icon?: ReactElement;
      iconSide?: 'left' | 'right';
      children?: React.ReactNode;
    };

type IconOnlyProps =
  | { iconOnly?: false }
  | {
      iconOnly?: true;
      icon: ReactElement;
      iconSide?: never;
    };

type Props = ButtonProps & IconProps & LinkProps & IconOnlyProps;

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef<
  React.ElementRef<typeof ButtonWrapper>,
  Props
>(
  ({
    kind = 'primary',
    size = 'md',
    children,
    icon,
    iconOnly,
    bg,
    href,
    iconSide = icon ? 'right' : null,
    fluid = false,
    ...props
  }: Props) => (
    <ButtonWrapper
      as={href ? 'a' : null}
      href={href ? href : null}
      buttonType={kind}
      ref={props.passRef}
      {...props}
    >
      {icon && iconSide == 'left' && icon}
      {iconOnly ? <span className="sr-only">{children}</span> : children}
      {icon && iconSide == 'right' && icon}
    </ButtonWrapper>
  )
);
