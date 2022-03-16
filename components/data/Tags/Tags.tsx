import styled from 'styled-components';

const Tags = ({ data }) => {
  return (
    <TagsWrapper>
      {data.map((item, index) => (
        <li key={`explorer-${index}`}>{item}</li>
      ))}
    </TagsWrapper>
  );
};

export default Tags;

export const TagsWrapper = styled.ul`
display: flex;
flex-wrap: wrap;
margin: 16px 0;
gap: 0.5rem;

li {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  line-height: 130%;
  color: var(--text-light-medium);
  background-color: var(--text-light-disabled);
  padding: 4px 8px;
}
`;