import styled from 'styled-components';
import { Card } from './Card';

const CardsList = ({ data }) => {
  return (
    <Wrapper>
      {data.map((item) => (
        <Card key={item.slug} data={item} />
      ))}
    </Wrapper>
  );
};

export { CardsList };

const Wrapper = styled.ul`
  margin-top: 24px;
  display: flex;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;

  > li {
    padding: 7px;
  }

  a {
    text-decoration-color: transparent;
    transition: text-decoration-color 150ms ease;

    &:hover,
    &:focus-visible {
      text-decoration-color: inherit;
    }
  }
`;
