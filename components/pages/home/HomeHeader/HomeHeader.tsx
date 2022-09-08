import React from 'react';
import styled from 'styled-components';
import { ConsSelector, HeaderControls } from 'components/pages/shared';
import { trending } from 'data/home';

const HomeHeader = ({ consData }) => {
  return (
    <Header>
      <div className="container">
        <h1>
          <span className="gradient-amazon">Explore</span>{' '}
          <span className="gradient-maple">
            Constituency-wise Fiscal Information
          </span>{' '}
          <span className="gradient-amazon">for Schemes</span>
        </h1>
        <SelectorWrapper>
          <ConsSelector consData={consData} trending={trending} />
        </SelectorWrapper>
      </div>
    </Header>
  );
};

export default HomeHeader;

const Header = styled.header`
  padding: 64px 0;
  min-height: calc(100vh - 182px);
  background-color: var(--color-background-light);
  background-image: url('/assets/images/background.svg');
  z-index: -1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    text-shadow: var(--box-shadow-1);
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 700;
  }
`;

const SelectorWrapper = styled.div`
  max-width: 1020px;
  margin-inline: auto;
  margin-top: 40px;
`;
