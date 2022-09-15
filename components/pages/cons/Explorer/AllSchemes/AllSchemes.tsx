import styled from 'styled-components';
import SchemeCard from './SchemeCard';

const AllSchemes = ({ schemeList }) => {
  return (
    <Wrapper>
      <h2>Which Scheme Do You Want To Explore?</h2>
      <ul>
        {schemeList.map((item) => (
          <SchemeCard data={item} key={item.scheme_slug} />
        ))}
      </ul>
    </Wrapper>
  );
};

export default AllSchemes;

const Wrapper = styled.div`
  margin-top: 40px;

  > h2 {
    font-weight: 700;
    line-height: 1.24;
    font-size: 2rem;
    margin-top: 8px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-top: 40px;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  }
`;
