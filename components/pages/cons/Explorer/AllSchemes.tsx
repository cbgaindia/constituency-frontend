import styled from 'styled-components';
import SchemeCard from './SchemeCard';

const AllSchemes = ({ data, state }) => {
  return (
    <Wrapper>
      <h2>Start exploring some featured scheme</h2>
      <ul>
        {data.map((item) => (
          <SchemeCard item={item} state={state} key={item.scheme_slug} />
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
