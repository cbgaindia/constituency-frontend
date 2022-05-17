import React from 'react';
import Head from 'next/head';
import { PartnerCard, TeamCard } from 'components/pages/about';
import { HeaderWrapper } from 'components/layouts/Header';
import styled from 'styled-components';
import { Seo } from 'components/common';

const About = () => {
  const headerData = {
    title: 'About Open Budgets India',
    content: [
      'The platform, Open Budgets India, has resulted from collective efforts by many organisations and individuals. Increasingly, people across the country are keen to understand and participate meaningfully in discussions on government budgets. But, the limited availability of relevant and accessible information on budgets in India at different levels has been a hindrance in this regard.',
      'In this context, our endeavour is to strengthen the discourse and demand for availability of all budget information in the public domain in a timely and accessible manner, at all levels of government in the country.  The Open Budgets India platform is a comprehensive and user-friendly open data portal that can facilitate free, easy and timely access to relevant data on government budgets in India.',
    ],
  };

  const partners = [
    {
      name: 'Centre for Budget Governance and Accountability',
      title: 'Lead Partner',
      img: '/assets/images/cbga_logo.png',
      desc: [
        "CBGA is an independent non-profit organisation enhancing transparency and accountability in governance through rigorous analysis of policies and budgets, and fostering people's participation in public policy processes by demystifying them.",
        'Envisioned by a group of civil society leaders and academicians, CBGA was started in 2002 as a programme of National Centre for Advocacy Studies (NCAS). It was set up as an independent organisation in 2005 with the mandate to promote transparent, accountable and participatory governance, and a people-centred perspective in preparation and implementation of budgets in India.',
      ],
      email: 'info@cbgaindia.org',
      github: 'https://github.com/cbgaindia',
      linkedin:
        'https://www.linkedin.com/company/centre-for-budget-and-governance-accountability-cbga-/',
      twitter: 'https://twitter.com/CBGAIndia',
    },
    {
      name: 'CivicDataLab',
      title: 'Technology Partner',
      img: '/assets/images/cdl.png',
      desc: [
        'We are a research lab working at the intersection of data, tech, design and social science to strengthen the course of civic engagements in India.',
        'We work to harness the potential of open knowledge movements and better enable citizens to engage in matters of public reform.',
        'We aim to grow data and tech literacy of governments, non-profits, think-tanks, media houses, universities, and more to enable data-driven decision making at scale.',
      ],
      email: 'info@civicdatalab.in',
      github: 'github.com/civicDataLab/',
      linkedin: 'https://www.linkedin.com/company/civicdatalab/',
      twitter: 'twitter.com/civicDatalab/',
      class: 'partners--dark-img',
    },
  ];

  const team = [
    {
      name: 'Gaurav Godhwani',
      title: 'Lead',
      image: '/images/contributors/gaurav.jpg',
      github: 'https://github.com/gggodhwani',
      linkedin: 'https://www.linkedin.com/in/gggodhwani',
      twitter: 'https://twitter.com/gggodhwani',
    },
    {
      name: 'Kabeer',
      title: 'Project Lead',
      image: '/images/contributors/kabeer.jpg',
      github: 'https://github.com/Kabeer3',
      linkedin: 'https://www.linkedin.com/in/kabeer-arora-69827661/',
      twitter: 'https://twitter.com/kabeer3391',
    },
    {
      name: 'Shreya Agrawal',
      title: 'Data Engineer',
      image: '/images/contributors/shreya.jpg',
      github: 'https://github.com/shreyaagrawal0809',
      linkedin: 'https://github.com/shreyaagrawal0809',
      twitter: 'https://twitter.com/shreya_0809',
    },
    {
      name: 'Abhinav',
      title: 'Backend Engineer',
      image: '/images/contributors/abhinav.jpg',
      github: 'https://github.com/Abhi2102',
    },
    {
      name: 'Shoaib Ahmed',
      title: 'Frontend Engineer',
      image: '/images/contributors/shoaib.jpg',
      github: 'https://github.com/pixeledcode',
      linkedin: 'https://www.linkedin.com/in/pixeledcode',
      twitter: 'https://twitter.com/PixeledCode',
    },
  ];

  const seo = {
    title: 'About - Constituency Dashboard',
    description: 'Co-created by CBGA and CivicDataLab',
  };

  return (
    <div>
      <Seo seo={seo} />

      <HeaderWrapper>
        <div className="container">
          <h2>{headerData.title}</h2>
          <AboutPara>
            {headerData.content.map((item, index) => (
              <p key={`header-content-${index}`}>{item}</p>
            ))}
          </AboutPara>
        </div>
      </HeaderWrapper>

      <AboutPage className="container">
        <h3 className="partners__heading">Partners</h3>
        <ul className="partners">
          {partners.map((item, key) => {
            return (
              <li key={`partners-${key}`}>
                <PartnerCard card={item} />
              </li>
            );
          })}
        </ul>
        {/* <section className="about__team">
          <h3>
            <span /> members
          </h3>
          <p>Meet the doers &amp; builders</p>

          <ul>
            {team.map((item, key) => {
              return (
                <li key={`team-${key}`}>
                  <TeamCard card={item} />
                </li>
              );
            })}
          </ul>
        </section> */}
      </AboutPage>
    </div>
  );
};

export default About;

const AboutPara = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AboutPage = styled.main`
  .partners__heading {
    margin-top: 1.5rem;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 130%;
    color: #000;
  }

  .partners {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    justify-content: space-between;
    align-items: stretch;
    gap: 30px;

    li {
      flex-basis: 48%;
      flex-grow: 1;

      > div {
        display: grid;
        height: 100%;
        grid-template-rows: max-content 1fr max-content;
      }
    }
  }

  .about__team {
    margin-top: 4rem;

    h3 {
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 130%;
      color: rgba(0, 0, 0, 0.32);

      span {
        background: #4965b2;
        border-radius: 2px;
        width: 3rem;
        display: inline-block;
        height: 3px;
        margin-right: 0.5rem;
      }
    }

    p {
      font-size: 2.5rem;
      line-height: 130%;
      margin-top: 10px;
    }

    ul {
      margin-top: 3rem;
      background-color: #fff;
      border-radius: 12px;
      border: 1px solid #f1eef1;
      padding: 0 6rem 5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      @media (max-width: 1145px) {
        padding: 0;
        gap: 35px;
      }
    }

    li {
      display: flex;
      flex-basis: 33.3%;
      @media (max-width: 720px) {
        flex-basis: 38%;
      }
      justify-content: center;
    }
  }
`;
