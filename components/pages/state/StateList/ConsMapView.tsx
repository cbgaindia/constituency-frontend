import { MapViz } from 'components/viz';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { swrFetch } from 'utils/helper';

function generateMapData(obj) {
  const mapObj = [...obj].map((item) => {
    return {
      mapName: item.constituency,
      value: '1',
      name: item.constituency_code,
    };
  });

  return mapObj;
}

const ConsMapView = ({ meta, consData }) => {
  const router = useRouter();
  const { data, isLoading } = swrFetch(
    `/assets/maps/${meta.sabha}/${meta.state}.json`
  );

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <Wrapper>
      <MapViz
        mapFile={data}
        meta={meta}
        data={generateMapData(consData[meta.sabha])}
        vizIndicators={[]}
        onlyLabel
        newMapItem={(e) => {
          e ? router.push(`${meta.state}/${meta.sabha}/${e.mapName}`) : null;
        }}
      />
    </Wrapper>
  );
};

export default ConsMapView;

const Wrapper = styled.div`
  flex-basis: 70%;
  /* flex-shrink: 1; */
  flex-grow: 1;
  background-color: var(--color-background-lighter);
  padding: 24px;
  border-radius: 4px;
  border: var(--border-2);
  filter: drop-shadow(var(--box-shadow-1));

  @media (max-width: 810px) {
    display: none;
  }
`;
