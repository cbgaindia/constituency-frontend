import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ConsInfo, Header } from 'components/pages/cons';
import { stateDataFetch } from 'utils/fetch';
import { Seo } from 'components/common';
import {
  Box,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@opub-cdl/design-system';
import styled from 'styled-components';
import {
  StyledTabsList,
  SabhaToggle,
  TabTriggerName,
} from 'components/pages/state/StateList/StateList';
import { Button } from 'components/actions';
import { FullScreen, VidhanSabha } from 'components/icons';
import { fullScreenMode } from 'utils/helper';

type Props = {
  query: any;
  schemeData: any;
  stateData: any;
};

const ConsPage: React.FC<Props> = ({ query, stateData }) => {
  const [currentState, setCurrentState] = useState<any>();
  const [queryData, setQueryData] = useState<any>();

  useEffect(() => {
    function upperCase(str) {
      return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }
    const { state, sabha, cons } = query;
    setQueryData({ state: upperCase(state), sabha, cons: upperCase(cons) });
  }, [query]);

  useEffect(() => {
    // get meta data of current state
    setCurrentState(
      stateData.find(
        (o) => o.State.toLowerCase() == queryData?.state.toLowerCase()
      )
    );
  }, [queryData]);

  const seo = {
    title: `${queryData?.cons} . ${queryData?.state} - Constituency Dashboard`,
    description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${queryData?.state}`,
  };

  if (!['vidhan', 'lok'].includes(queryData?.sabha))
    return <p>Incorrect URL!</p>;
  return (
    <>
      <Seo seo={seo} />
      {currentState ? (
        <>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="container">
            <Header queryData={queryData} />
            <StyledTabs
              defaultValue="overview"
              // onValueChange={(e) => setSelectedSabha(e)}
            >
              <StyledTabsList>
                <SabhaToggle>
                  <TabsTrigger value="overview">
                    <Box>{<VidhanSabha />}</Box>
                    <TabTriggerName>
                      Overview <span>Key Highights of Constituency</span>
                    </TabTriggerName>
                  </TabsTrigger>
                  <TabsTrigger value="Explorer">
                    <Box>{<VidhanSabha />}</Box>
                    <TabTriggerName>
                      Explorer <span>Scheme Data of Constituency</span>
                    </TabTriggerName>
                  </TabsTrigger>
                </SabhaToggle>
                <Button
                  icon={<FullScreen fill="#1D7548" />}
                  iconOnly={true}
                  kind="custom"
                  onClick={() => fullScreenMode('stateListWrapper')}
                  id="fullScreen"
                >
                  Full screen mode
                </Button>
              </StyledTabsList>
              <TabsContent value="overview">
                <ConsInfo
                  data={currentState}
                  queryData={queryData}
                  share={false}
                />
              </TabsContent>
            </StyledTabs>
          </main>
        </>
      ) : (
        <>Wrong URL</>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const queryValue = query || {};
  const [stateData] = await Promise.all([stateDataFetch('State Info')]);

  return {
    props: {
      query: queryValue,
      stateData: stateData[0],
    },
  };
};

export default ConsPage;

const StyledTabs = styled(Tabs)`
  margin-top: 32px;
`;
