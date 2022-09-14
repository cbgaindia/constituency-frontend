export default function Info({ ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width={props.width ? props.width : '24px'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C6.475 2 2 6.475 2 12s4.475 10 10 10 10-4.475 10-10S17.525 2 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />
    </svg>
  );
}
