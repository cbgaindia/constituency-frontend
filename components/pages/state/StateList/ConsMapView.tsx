import React from 'react';
import { useRouter } from 'next/router';
import { MapViz } from 'components/viz';
import { swrFetch } from 'utils/helper';
import styled from 'styled-components';
import { Info } from 'components/icons';

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

function generateMapData(obj) {
  const mapObj = [...obj].map((item) => {
    return {
      mapName: titleCase(item.constituency),
      value: '1',
      name: item.constituency_code,
    };
  });

  return mapObj;
}

const ConsMapView = ({ meta, consData }) => {
  const [val, setVal] = React.useState(1)
  const router = useRouter();
  const { data, isLoading } = swrFetch(
    `/assets/maps/${meta.sabha}/${meta.state}.json`
  );

  return isLoading ? (
    <LoadingDiv>Loading Map...</LoadingDiv>
  ) : (
    <>
      <Wrapper>
        <ZoomButtons>
          <button onClick={() => { setVal(Math.min(val + 0.1, 3)) }}>+</button>
          <button onClick={() => { setVal(Math.max(val - 0.1, 1)) }}>-</button>
        </ZoomButtons>
        <MapViz
          mapFile={data}
          meta={meta}
          data={generateMapData(consData[meta.sabha])}
          vizIndicators={[]}
          onlyLabel
          newMapItem={(e) => {
            e ? router.push(`${meta.state}/${meta.sabha}/${e.name}`) : null;
          }}
          val={val}
        />
      </Wrapper>

      <MapNote>
        <Info fill="#D7AA3B" />
        Click on any constituency to explore more about it.
      </MapNote>
    </>
  );
};

export default ConsMapView;

const Wrapper = styled.div`
  height: 100%;
`;

export const LoadingDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background-light);
`;

const MapNote = styled.aside`
  border-radius: 2px;
  font-size: 0.75rem;
  line-height: 1.7;
  padding: 8px 16px;
  text-transform: capitalize;
  background-color: var(--color-background-light);

  display: flex;
  align-items: center;
  gap: 8px;
`;

const ZoomButtons = styled.div`
  position: absolute;
  left: 38px;
  top: 40px;     
  isolation: isolate;
  z-index: 10;

  @media (max-width: 480px) {
    margin: 0 auto;
  }
  button {
      padding: 4px;
      margin-bottom:6px;
      width: 100%;
      text-align: center;
      font-size:20px;
      height: 100%;
      transition: background-color 150ms ease;
      border: 2px solid white;
      &:hover {
        background-color: var(--color-grey-600);
      }
  }
`