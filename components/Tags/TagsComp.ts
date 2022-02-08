import styled from 'styled-components';

const TagsComp = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 12px 0;
  gap: 0.5rem;

  li {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    line-height: 130%;
    color: hsla(0, 0%, 0%, 0.6);
    background-color: hsla(0, 0%, 0%, 0.08);
    padding: 4px 6px;
  }
`;

export default TagsComp;
