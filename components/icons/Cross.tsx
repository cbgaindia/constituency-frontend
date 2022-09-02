export default function Cross({ ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={props.size ? props.size : '24px'}
      fill="#000"
      {...props}
    >
      <path d="M16.2 7.807a.664.664 0 0 0-.94 0L12 11.06 8.74 7.8a.664.664 0 1 0-.94.94L11.06 12 7.8 15.26a.664.664 0 1 0 .94.94L12 12.94l3.26 3.26a.664.664 0 1 0 .94-.94L12.94 12l3.26-3.26a.668.668 0 0 0 0-.933Z" />
    </svg>
  );
}
