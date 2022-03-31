import Image from 'next/image';
import styled from 'styled-components';

const Banner = ({ details }) => {
  return (
    <BannerWrapper
      className="banner"
      style={{ backgroundColor: details.color }}
    >
      <div className="banner__content">
        <h2 className="gradient-amazon">{details.heading}</h2>
        <div>{details.content}</div>
      </div>
      <figure>
        <Image src={details.image} width={608} height={208} alt="" />
      </figure>
    </BannerWrapper>
  );
};

export default Banner;

export const BannerWrapper = styled.section`
  isolation: isolate;
  padding: 40px 40px 48px;
  border-radius: 4px;
  position: relative;
  background-color: var(--color-background-lighter);
  filter: drop-shadow(var(--box-shadow-1));

  .banner__content {
    width: clamp(250px, 100%, 720px);
    z-index: 10;

    h2 {
      font-weight: 900;
      font-size: 1.5rem;
    }

    > div {
      margin-top: 16px;
    }
  }

  figure {
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;

    @media (max-width: 720px) {
      display: none;
    }
  }

  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    font-weight: 500;
  }

  a {
    text-decoration: none;
    font-weight: 600;
  }
`;
