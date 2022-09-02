import { useRouter } from 'next/router';
import AllSchemes from './AllSchemes';
import SchemeSelected from './SchemeSelected';

const Explorer = ({ data }) => {
  const { query } = useRouter();

  return query.scheme ? (
    <SchemeSelected scheme={query.scheme} />
  ) : (
    <AllSchemes data={data} />
  );
};

export { Explorer };
