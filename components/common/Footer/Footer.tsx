import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import * as data from './footer_data';

const Footer = () => (
  <Wrapper>
    <Main>
      <div className="container">
        <Logo
          rel="noopener noreferrer"
          href="https://openbudgetsindia.org/en/"
        >
          <Image
            src="/assets/icons/obi_footer_square_logo.svg"
            alt="Open budgets India Footer"
            layout="intrinsic"
            width={234}
            height={138}
          />
        </Logo>

        <Links>
          <LinkSection>
            <p>{data.Dashboards.name}</p>
            {data.Dashboards.links.map((link, index) => (
              <a
                key={`footer_link-1.${index}`}
                className="link footer_link"
                rel="noopener noreferrer"
                href={link.value}
              >
                {link.title}
              </a>
            ))}
          </LinkSection>

          <LinkSection>
            <p>{data.Budget_Datasets.name}</p>
            {data.Budget_Datasets.links.map((link, index) => (
              <a
                key={`footer_link-2.${index}`}
                className="link footer_link"
                rel="noopener noreferrer"
                href={link.value}
              >
                {link.title}
              </a>
            ))}
          </LinkSection>

          <LinkSection>
            <p>{data.OBI_Platform.name}</p>
            {data.OBI_Platform.links.map((link, index) => (
              <a
                key={`footer_link-3.${index}`}
                className="link footer_link"
                rel="noopener noreferrer"
                href={link.value}
              >
                {link.title}
              </a>
            ))}
          </LinkSection>
        </Links>
      </div>
    </Main>

    <Attribute>
      <AttrContainer className="container">
        <AttrLinks>
          {data.Attr_Links.links.map((link, index) => (
            <a
              key={`attr_link-${index}`}
              rel="noopener noreferrer"
              href={link.value}
              className="link footer_link"
            >
              {link.title}
            </a>
          ))}
        </AttrLinks>

        <div>
          {data.Attr_Logos.links.map((link, index) => (
            <a
              key={`attr_logo-${index}`}
              rel="nofollow noopener noreferrer"
              href={link.value}
              className="link footer_link"
            >
              <Image
                src={link.src}
                alt={link.alt}
                layout="fixed"
                width={link.dimensions[0]}
                height={link.dimensions[1]}
              />
            </a>
          ))}
        </div>

        <div>
          {data.Attr_Social.links.map((link, index) => (
            <a
              key={`attr_social-${index}`}
              rel="nofollow noopener noreferrer"
              href={link.value}
              className="link footer_link"
            >
              <Image
                src={link.src}
                alt={link.alt}
                layout="fixed"
                width={23}
                height={23}
              />
            </a>
          ))}
        </div>
      </AttrContainer>
    </Attribute>
  </Wrapper>
);

export default Footer;

const Wrapper = styled.footer`
  background-color: var(--nav-bg);
  color: var(--text-dark-high);

  a {
    text-decoration: underline;
  }

  @media (max-width: 720px) {
    .container {
      justify-content: space-evenly;
      padding: 16px 0;
    }
  }
`;

const Main = styled.div`
  > .container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 40px 1rem;

    @media (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }
`;

const Logo = styled.a`
  margin-right: 1rem;
  height: max-content;

  img {
    width: 13rem;
  }

  @media (max-width: 720px) {
    width: max-content;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, max-content);

    margin-bottom: 2rem;
    justify-content: space-evenly;
  }

  @media (max-width: 480px) {
    margin: 0 auto;
    grid-template-columns: 1fr;
  }
`;

const LinkSection = styled.section`
  p {
    color: white;
    font-size: 1rem;
    font-weight: 600;
  }

  a {
    color: white;

    display: block;
    margin-top: 1rem;
  }

  @media (max-width: 720px) {
    &:first-child {
      grid-area: 1 / 1 / 3 / 2;
    }
    &:nth-child(2),
    &:nth-child(3) {
      justify-self: end;
      width: 210px;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-self: center;

    &:nth-child(2),
    &:nth-child(3) {
      justify-self: center;
      margin-top: 32px;
      width: 100%;
    }
  }
`;

const Attribute = styled.div`
  background-color: var(--color-background-dark);
`;

const AttrContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding: 0 1rem;
  width: 100%;

  > div {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  @media (max-width: 720px) {
    justify-content: space-evenly;
    padding: 16px 0;
  }
`;

const AttrLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 720px) {
    flex-basis: 100%;
    margin-bottom: 32px;
    justify-content: space-evenly;
  }
`;
