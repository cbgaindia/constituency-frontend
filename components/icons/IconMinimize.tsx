import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

const IconMinimize = (props: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width={props.width ? props.width : '24px'}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18 13H13H12H11H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11C11 11 11.45 11 12 11H13H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" />
  </svg>
);

export { IconMinimize };
