import styled from 'styled-components';

const Total: React.FC<{ total: number; text?: string }> = ({
  total,
  text,
}) => {
  return (
    <TotalWrapper>
      {total.toLocaleString('en', { useGrouping: true })}{' '}
      {text ? text : 'results'}
    </TotalWrapper>
  );
};

export default Total;

export const TotalWrapper = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: var(--color-text);
`;
