import React from 'react';
import { useRouter } from 'next/router';
import { MapViz } from 'components/viz';
import { swrFetch } from 'utils/helper';
import styled from 'styled-components';
import { IconMinimize, Info } from 'components/icons';
import { IconGeneralAdd } from 'components/icons/IconlAdd';
import { ZoomButtons } from 'components/pages/cons/Explorer/SchemeSelected/ExplorerView/StateMap';

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
  const [val, setVal] = React.useState(1);
  const router = useRouter();
  const { data, isLoading } = swrFetch(
    `/assets/maps/${meta.sabha}/${meta.state}.json`
  );

  return isLoading ? (
    <LoadingDiv>Loading Map...</LoadingDiv>
  ) : (
    <>
      <Wrapper>
        <ZoomButtons style={{ top: '40px', left: '40px' }}>
          <button
            aria-label="Increase Zoom"
            title="Increase Zoom"
            onClick={() => {
              setVal(Math.min(val + 0.1, 3));
            }}
          >
            <IconGeneralAdd fill="var(--color-grey-300)" />
          </button>
          <button
            aria-label="Decrease Zoom"
            title="Increase Zoom"
            onClick={() => {
              setVal(Math.max(val - 0.1, 1));
            }}
          >
            <IconMinimize fill="var(--color-grey-300)" />
          </button>
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
