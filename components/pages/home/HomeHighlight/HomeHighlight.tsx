import React from 'react';
import styled from 'styled-components';

const HomeHighlight = () => {
  return (
    <HighlightWrapper>
      <h2 className="sr-only">Highlights</h2>
      <HighlightList className="container">
        <li>
          <span>25+</span>Schemes
        </li>
        <li>
          <span>6+</span>States
        </li>
        <li>
          <span>12+</span>Indicators
        </li>
        <li>
          <span>500+</span>Contributors
        </li>
        <li>
          <span>200,000+</span>Active Users
        </li>
      </HighlightList>
    </HighlightWrapper>
  );
};

export default HomeHighlight;

const HighlightWrapper = styled.section`
  background-color: #c3cfd9;
  padding: 24px 48px;
`;

const HighlightList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;

  li {
    text-align: center;
    padding: 8px 16px;
  }

  span {
    display: block;
    font-weight: bold;
    margin-bottom: 4px;
  }
`;
