import React from 'react';
import styled from 'styled-components';
import ConsSelector from './ConsSelector';
import { lokTrending, vidhanTrending } from 'data/home';

const HomeHeader = ({ constList }) => {
  return (
    <Header>
      <div className="container">
        <h1 className="gradient-amazon">
          Explore Constituency-wise Fiscal Information for Schemes
        </h1>
        <SelectorWrapper>
          <ConsSelector
            consData={constList?.lok}
            trending={lokTrending}
            sabha="lok"
          />
          <ConsSelector
            consData={constList?.vidhan}
            trending={vidhanTrending}
            sabha="vidhan"
          />
        </SelectorWrapper>
      </div>
    </Header>
  );
};

export default HomeHeader;

const Header = styled.header`
  background-color: var(--color-background-light);
  background-image: url('/assets/images/background.svg');
  z-index: -1;
  padding-top: 92px;
  padding-bottom: 144px;

  h1 {
    text-align: center;
    text-shadow: var(--box-shadow-1);
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 700;
  }
`;

const SelectorWrapper = styled.div`
  margin-top: 56px;
  gap: 40px;
  display: flex;
  flex-wrap: wrap;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(450px, 100%), 1fr));
`;
