import { useRouter } from 'next/router';
import { AllSchemes } from './AllSchemes';
import { SchemeSelected } from './SchemeSelected';

const Explorer = ({ schemeList, queryData }) => {
  const { query } = useRouter();

  return query.scheme ? (
    <SchemeSelected
      schemeList={schemeList}
      queryData={queryData}
      schemeSlug={query.scheme}
    />
  ) : (
    <AllSchemes schemeList={schemeList} />
  );
};

export default Explorer;
