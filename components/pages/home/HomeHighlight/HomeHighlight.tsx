import React from 'react';
import styled from 'styled-components';

const content = [
  {
    text: 'Schemes',
    value: '25',
  },
  {
    text: 'States',
    value: '6',
  },
  {
    text: 'Indicators',
    value: '12',
  },
  {
    text: 'Contributors',
    value: '500',
  },
  {
    text: 'Active Users',
    value: '200,000',
  },
];

const HomeHighlight = () => {
  return (
    <HighlightWrapper>
      <h2 className="sr-only">Highlights</h2>
      <HighlightList className="container">
        {content.map((item, index) => (
          <li key={`highlights-${index}`}>
            <span className='gradient-amazon'>{item.value}</span>
            {item.text}
          </li>
        ))}
      </HighlightList>
    </HighlightWrapper>
  );
};

export default HomeHighlight;

const HighlightWrapper = styled.section`
  background-color: var(--color-background-lighter);
  padding-block: 80px;
`;

const HighlightList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: space-evenly;

  li {
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
  }

  span {
    display: block;
    font-weight: 900;
    font-size: 2rem;
    line-height: 1.24;
  }
`;
