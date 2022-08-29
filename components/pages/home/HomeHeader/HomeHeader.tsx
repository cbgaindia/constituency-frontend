import React from 'react';
import styled from 'styled-components';
import SchemeSelector from 'components/pages/shared/SchemeSelector';
import { HeaderControls } from 'components/pages/shared/SchemeSelector/SchemeSelector';
import { trending } from 'data/home';

const HomeHeader = ({ schemeData }) => {
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
        <SchemeSelector schemeData={schemeData} trending={trending} />
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

  ${HeaderControls} {
    max-width: 1020px;
    margin-top: 40px;
  }
`;
