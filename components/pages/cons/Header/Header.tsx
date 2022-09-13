import dynamic from 'next/dynamic';
import Image from 'next/image';
import styled from 'styled-components';

const ConsSelectorModal = dynamic(() => import('./ConsSelectorModal'), {
  ssr: false,
});
const Share = dynamic(
  () => import('components/actions/Share/').then((module) => module.Share),
  {
    ssr: false,
  }
);

const Header = ({ queryData }) => {
  return (
    <Wrapper>
      <Meta>
        <Image
          src={`/assets/icons/${queryData.sabha}.svg`}
          alt=""
          width={80}
          height={80}
          className="cons__sabha-icon"
        />

        <ConsDetails>
          <SabhaName>{`${
            queryData.sabha === 'lok' ? 'Lok' : 'Vidhan'
          } Sabha contituency`}</SabhaName>
          <div>
            <h1 className="gradient-maple">{queryData.cons}</h1>
            <StateName>
              <span>{`(${queryData.state})`}</span>
              {/* <ConsSelectorModal />  */}
              {/* --changethis */}
            </StateName>
          </div>
        </ConsDetails>
      </Meta>
      <Share title={queryData.cons + ' page'} />
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const Meta = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  > span {
    @media (max-width: 460px) {
      display: none !important;
    }
  }
`;

const ConsDetails = styled.div`
  flex-direction: column;
  display: flex;

  > div {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 12px;

    h1,
    span {
      text-transform: capitalize;
      text-shadow: var(--box-shadow-1);
      font-weight: 700;
    }

    h1 {
      font-size: 2.5rem;
      line-height: 1.2;
    }

    span {
      color: var(--text-light-light);
      font-size: 1.5rem;
    }
  }
`;

const StateName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SabhaName = styled.span`
  text-transform: uppercase;
  text-shadow: var(--box-shadow-1);
  color: var(--text-light-light);
  letter-spacing: 0.04em;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.7;
`;
