import React from 'react';
import styled from 'styled-components';

const Skiplink = () => (
  <>
    <TopElement id="top-of-site-pixel-anchor" tabIndex={-1}>
      &nbsp;
    </TopElement>
    <Wrapper href="#maincontent">Skip to content</Wrapper>
  </>
);

export default Skiplink;

const Wrapper = styled.a`
  background: #4b4797;
  color: white;
  /* height: 30px; */
  z-index: 10;
  left: 50%;
  padding: 8px;
  position: absolute;
  transform: translateY(-150%);
  transition: transform 0.3s;
  line-height: 1.5;

  &:focus {
    transform: translateY(0%);
  }
`;

const TopElement = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  top: -100px;
  left: 0;
`;
