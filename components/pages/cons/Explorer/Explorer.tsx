import { AllSchemes } from './AllSchemes';
import { SchemeSelected } from './SchemeSelected';

const Explorer = ({ schemeList, queryData }) => {
  return queryData.scheme ? (
    <SchemeSelected schemeList={schemeList} queryData={queryData} />
  ) : (
    <AllSchemes schemeList={schemeList} />
  );
};

export default Explorer;
