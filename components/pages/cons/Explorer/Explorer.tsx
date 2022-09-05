import { useRouter } from 'next/router';
import { AllSchemes } from './AllSchemes';
import { SchemeSelected } from './SchemeSelected';

const Explorer = ({ data, queryData }) => {
  const { query } = useRouter();

  return query.scheme ? (
    <SchemeSelected queryData={queryData} schemeName={query.scheme} />
  ) : (
    <AllSchemes data={data} />
  );
};

export { Explorer };
