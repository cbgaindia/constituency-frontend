import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';

import { ExplorerDetailsViz, ExplorerHeader } from 'components/pages/explorer';
import SchemeSelector from 'components/pages/shared/SchemeSelector';
import {
  HeaderControls,
  SchemesMenu,
} from 'components/pages/shared/SchemeSelector/SchemeSelector';
import { dataTransform, stateDataFetch, stateSchemeFetch } from 'utils/fetch';
import { Seo } from 'components/common';
import dynamic from 'next/dynamic';

const ExplorerViz = dynamic(
  () => import('components/pages/explorer/ExplorerViz'),
  {
    ssr: false,
  }
);

type Props = {
  data: any;
  stateData: any;
  scheme: any;
  stateScheme: any;
  constDesc: any;
};

function verifyState(state) {
  if (
    [
      'Uttar Pradesh',
      'Chhattisgarh',
      'Bihar',
      'Odisha',
      'Maharashtra',
      'Jharkhand',
    ].some((e) => e.toLowerCase() === state.toLowerCase())
  )
    return true;
  else return false;
}

const Explorer: React.FC<Props> = ({
  data,
  scheme,
  stateData,
  stateScheme,
  constDesc,
}) => {
  const [showReport, setShowReport] = useState(false);
  const [meta, setMeta] = useState({});
  const [currentState, setCurrentState] = useState<any>();
  const [consDesc, setConsDesc] = useState<any>();
console.log(data);

  async function consDescFetch() {
    // const constDesc = await stateDataFetch('const_desc');
    const ac = constDesc[0];
    const pc = constDesc[1];
    const finalObj = {
      vidhan: {},
      lok: {},
    };

    // refactor into a function
    ac.forEach((item) => {
      if (!finalObj.vidhan[item.state_name]) {
        finalObj.vidhan[item.state_name] = {
          [item.constituency_code]: item['Final Description'],
        };
      } else {
        finalObj.vidhan[item.state_name][item.constituency_code] =
          item['Final Description'];
      }
    });
    pc.forEach((item) => {
      if (!finalObj.lok[item.state_name]) {
        finalObj.lok[item.state_name] = {
          [item.constituency_code]: item['Final Description'],
        };
      } else {
        finalObj.lok[item.state_name][item.constituency_code] =
          item['Final Description'];
      }
    });
    setConsDesc(finalObj);
  }

  useEffect(() => {
    consDescFetch();
    setCurrentState(
      stateData.find((o) => o.State.toLowerCase() == data.state.toLowerCase())
    );
  }, [stateData]);

  function handleReportBtn(bool, metaObj = {}) {
    setShowReport(bool);
    setMeta(metaObj);
  }

  const seo = {
    title: 'Explorer - Constituency Dashboard',
    description:
      'Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies',
  };
  return (
    <>
      <Seo seo={seo} />
      <Wrapper>
        <div className="container">
          <SchemeSelector
            suggestion={false}
            sabha={false}
            state={data.state}
            scheme={data.scheme}
            stateData={stateScheme}
          />

          {Object.keys(data).length !== 0 &&
          verifyState(data.state) &&
          currentState ? (
            <>
              <ExplorerHeader
                stateData={currentState}
                schemeDesc={
                  scheme[Object.keys(scheme)[0]].metadata['description']
                }
              />
              {!showReport && consDesc && (
                <ExplorerViz
                  data={data}
                  handleReportBtn={handleReportBtn}
                  scheme={scheme}
                  consDesc={consDesc}
                />
              )}

              {showReport && (
                <ExplorerDetailsViz
                  data={data}
                  meta={meta}
                  handleReportBtn={handleReportBtn}
                  scheme={scheme}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { state, scheme, sabha } = context.query;
  const schemeData = await dataTransform(context.query.scheme || '');
  const stateScheme = await stateSchemeFetch();
  const stateData = await stateDataFetch('State Info');
  const constDesc = await stateDataFetch('const_desc');
  let data: any = {};

  data.state = state || '';
  data.scheme = scheme || '';
  data.sabha = sabha || '';

  return {
    props: {
      data,
      scheme: schemeData,
      stateData: stateData[0],
      stateScheme,
      constDesc,
    },
  };
};

export default Explorer;

const Wrapper = styled.main`
  .indicator-mobile {
    margin-top: 2rem;

    @media (min-width: 980px) {
      display: none;
    }
  }

  .heading {
    margin-bottom: 0.5rem;
    font-weight: 900;
    font-size: 2.5rem;
  }

  ${HeaderControls} {
    margin-top: 40px;
    padding: 16px;
  }

  ${SchemesMenu} {
    margin-top: 0;
  }
`;
