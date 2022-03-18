import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const states = [
  {
    img: '/assets/images/placeholder.jpg',
    title: 'Rajasthan',
    link: '#',
  },
  {
    img: '/assets/images/placeholder.jpg',
    title: 'Uttar Pradesh',
    link: '#',
  },
  {
    img: '/assets/images/placeholder.jpg',
    title: 'Odisha',
    link: '#',
  },
  {
    img: '/assets/images/placeholder.jpg',
    title: 'Gujrat',
    link: '#',
  },
  {
    img: '/assets/images/placeholder.jpg',
    title: 'Kerala',
    link: '#',
  },
  {
    img: '/assets/images/placeholder.jpg',
    title: 'Tamilnadu',
    link: '#',
  },
];

const HomeStates = () => {
  return (
    <Wrapper>
      <div className="container">
        <h2>Explore Schemes Expenditures for the following States</h2>
        <StateList>
          {states.map((item, index) => (
            <li key={`state-${index}`}>
              <a href={item.link}>
                <Image
                  src={item.img}
                  width={144}
                  height={144}
                  alt=""
                  className="img-cover"
                />
                <h3>{item.title}</h3>
              </a>
            </li>
          ))}
        </StateList>
      </div>
    </Wrapper>
  );
};

export default HomeStates;

const Wrapper = styled.section`
  background-color: #f7f9fa;

  .container {
    padding-top: 48px;
    padding-bottom: 144px;
  }
`;

const StateList = styled.ul`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));

  margin-top: 32px;

  a {
    display: flex;
    flex-direction: column;
    text-decoration-color: transparent;
  }

  h3 {
    padding: 8px;
    text-align: center;
    font-size: 14px;
    background-color: white;
    line-height: 1.5;
  }
`;
