import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { HomeTitle } from 'styles/Global';

const states = [
  {
    img: '/assets/states/bihar.svg',
    title: 'Bihar',
    link: '#',
  },
  {
    img: '/assets/states/chhattisgarh.svg',
    title: 'Chhattisgarh',
    link: '#',
  },
  {
    img: '/assets/states/jharkhand.svg',
    title: 'Jharkhand',
    link: '#',
  },
  {
    img: '/assets/states/maharashtra.svg',
    title: 'Maharashtra',
    link: '#',
  },
  {
    img: '/assets/states/odisha.svg',
    title: 'Odisha',
    link: '#',
  },
  {
    img: '/assets/states/up.svg',
    title: 'Uttar Pradesh',
    link: '#',
  },
];

const HomeStates = () => {
  return (
    <Wrapper>
      <div className="container">
        <HomeTitle className="gradient-maple">Drilldown further</HomeTitle>
        <h2>Explore Schemes Expenditures for the following States</h2>
        <StateList>
          {states.map((item, index) => (
            <li key={`state-${index}`}>
              <Link href={item.link}>
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
    text-decoration-color: transparent;
    background-color: var(--color-background-lighter);
    padding: 8px;
    filter: drop-shadow(var(--box-shadow-1));
    border-radius: 4px;
  }

  h3 {
    margin-top: 8px;
    text-align: center;
    font-weight: 600;
  }
`;
