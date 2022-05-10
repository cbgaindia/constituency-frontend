import React from 'react';
import styled from 'styled-components';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { Button } from 'components/actions';
import { HomeTitle } from 'styles/Global';
import { about } from 'data/home';

const HomeAbout = () => {
  return (
    <About>
      <div className="container">
        <VideoWrapper>
          <LiteYouTubeEmbed
            id={about.video}
            title="Budget Forum | Open Budgets India"
            params="disablekb=1"
            noCookie
          />
        </VideoWrapper>
        <ContentWrapper>
          <HomeTitle className="gradient-maple">Introduction</HomeTitle>
          <h2>About the platform</h2>
          <p>{about.desc}</p>
          {/* <Button kind="secondary" size="sm" href="#">
            Know More
          </Button> */}
        </ContentWrapper>
      </div>
    </About>
  );
};

export default HomeAbout;

const About = styled.section`
  background-color: var(--color-background-lighter);

  > .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 64px;
    padding-block: 104px;
  }

  .yt-lite {
    border-radius: 4px;

    &::before {
      display: none;
    }
  }

  .lty-playbtn {
    background-color: transparent !important;
    background-image: url('/assets/images/play.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 120px;
    height: 120px;

    @media screen and (max-width: 480px) {
      width: 80px;
      height: 80px;
    }

    &::before {
      display: none;
    }
  }
`;

const VideoWrapper = styled.div`
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: 40%;

  border-radius: 4px;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  line-height: 0;
  flex-basis: 512px;

  h2 {
    margin-top: 8px;
    font-weight: 600;
    line-height: 1.24;
    font-size: 2rem;
  }

  p {
    margin-top: 16px;
    letter-spacing: 0.01em;
    font-weight: 400;
    line-height: 1.5;
  }

  a {
    margin-top: 20px;
  }
`;
