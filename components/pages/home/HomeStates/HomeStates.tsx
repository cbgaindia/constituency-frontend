import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { HomeTitle } from 'styles/GlobalStyles';

const states = [
  {
    img: '/assets/states/bihar.jpg',
    title: 'Bihar',
    link: 'bihar',
  },
  {
    img: '/assets/states/chhattisgarh.jpg',
    title: 'Chhattisgarh',
    link: 'chhattisgarh',
  },
  {
    img: '/assets/states/jharkhand.jpg',
    title: 'Jharkhand',
    link: 'jharkhand',
  },
  {
    img: '/assets/states/maharashtra.jpg',
    title: 'Maharashtra',
    link: 'maharashtra',
  },
  {
    img: '/assets/states/odisha.jpg',
    title: 'Odisha',
    link: 'odisha',
  },
  {
    img: '/assets/states/uttar pradesh.jpg',
    title: 'Uttar Pradesh',
    link: 'uttar pradesh',
  },
];

const HomeStates = () => {
  return (
    <Wrapper>
      <div className="container">
        <HomeTitle className="gradient-maple">State Entry Point</HomeTitle>
        <h2>Navigate to your Constituency via State</h2>
        <StateList>
          {states.map((item, index) => (
            <li key={`state-${index}`}>
              <Link href={`/${item.link}`}>
                <a>
                  <Image
                    src={item.img}
                    width={160}
                    height={160}
                    alt=""
                    className="img-cover"
                  />
                  <h3>{item.title}</h3>
                </a>
              </Link>
            </li>
          ))}
        </StateList>
      </div>
    </Wrapper>
  );
};

export default HomeStates;

const Wrapper = styled.section`
  .container {
    padding-top: 80px;
  }

  h2 {
    margin-top: 8px;
    font-weight: 600;
    line-height: 1.24;
    font-size: 2rem;
  }
`;

const StateList = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 40px;
  padding-bottom: 16px;

  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  li {
    min-width: 176px;
    scroll-snap-align: start;
  }

  a {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    text-decoration-color: transparent;
    background-color: var(--color-background-lighter);
    filter: drop-shadow(var(--box-shadow-1));
    border-radius: 4px;
  }

  h3 {
    text-align: center;
    font-weight: 700;
  }
`;
