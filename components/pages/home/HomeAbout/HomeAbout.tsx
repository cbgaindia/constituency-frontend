import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import Image from 'next/image';

const HomeAbout = () => {
  return (
    <About>
      <div className="container">
        <Image
          src="/assets/images/placeholder.jpg"
          width={560}
          height={240}
          alt=""
          className="img-cover"
        />
        <div>
          <h2>About the platform</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            ut totam cupiditate iusto architecto mollitia fugiat esse nam.
            Beatae sequi, omnis maxime accusantium perferendis id nesciunt eum
            inventore amet dignissimos.
          </p>
          <Button kind="secondary-outline" size="sm">
            Know More About Us
          </Button>
        </div>
      </div>
    </About>
  );
};

export default HomeAbout;

const About = styled.section`
  background-color: #dfe6ed;
  padding: 48px 40px;

  > .container {
    display: flex;
    flex-wrap: wrap;
    gap: 42px;

    > div {
      flex-basis: 0;
      flex-grow: 999;
    }
  }

  p {
    margin-top: 12px;
  }

  button {
    margin-top: 16px;
  }

  .img-cover {
    flex-grow: 1;
  }
`;
