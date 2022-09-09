import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

const GradientLokSabha = (props: Props) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.53282 23.3285C5.40898 22.0901 5.94171 20.8771 6.9374 20.1303L25.5402 6.17822C26.2638 5.63549 27.1671 5.38897 28.0661 5.48886L48.4056 7.7488C49.784 7.90195 50.9475 8.84256 51.386 10.1582L58.4012 31.2037C58.5758 31.7274 58.626 32.2845 58.5479 32.8309L56.3381 48.3C56.1336 49.7311 55.0831 50.8959 53.6806 51.2465L25.5259 58.2852C24.554 58.5282 23.5248 58.3499 22.6913 57.7942L9.39838 48.9323C8.51307 48.3421 7.93861 47.3864 7.83274 46.3277L5.53282 23.3285Z"
      fill="url(#paint0_linear_1045_4673)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1045_4673"
        x1={5.51514}
        y1={5.4671}
        x2={24.9883}
        y2={68.7321}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9B840" />
        <stop offset={0.994792} stopColor="#AA862E" />
      </linearGradient>
    </defs>
  </svg>
);

export { GradientLokSabha };
