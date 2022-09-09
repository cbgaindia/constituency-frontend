import React from 'react';
import { useRouter } from 'next/router';
import { MapViz } from 'components/viz';
import { swrFetch } from 'utils/helper';
import styled from 'styled-components';

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
    <LoadingMap>Loading Map...</LoadingMap>
  ) : (
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
  );
};

export default ConsMapView;

const LoadingMap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
