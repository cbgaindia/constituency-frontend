export default function Explorer({ ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={props.size ? props.size : '24px'}
      fill={props.fill}
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          d="M19 21h-6c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2ZM5 21h2c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2ZM9 7V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2Z"
          fill={props.fill}
        />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
