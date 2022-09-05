import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

const IconArrowRight = (props: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="#888F8B"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10.193 8.47334C9.93305 8.73334 9.93305 9.15334 10.193 9.41334L12.7797 12L10.193 14.5867C9.93305 14.8467 9.93305 15.2667 10.193 15.5267C10.453 15.7867 10.873 15.7867 11.133 15.5267L14.193 12.4667C14.453 12.2067 14.453 11.7867 14.193 11.5267L11.133 8.46667C10.8797 8.21334 10.453 8.21334 10.193 8.47334Z" />
  </svg>
);

export { IconArrowRight };
