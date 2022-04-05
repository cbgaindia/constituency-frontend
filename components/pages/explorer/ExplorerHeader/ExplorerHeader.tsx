import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Document, Drop } from 'components/icons';
import { tabbedInterface } from 'utils/explorer';

const data = {
  tabs: [
    {
      id: 'state-overflow',
      text: 'State Overview',
      icon: <Drop />,
    },
    {
      id: 'scheme-overflow',
      text: 'Scheme Overview',
      icon: <Document />,
    },
  ],

  items: [
    {
      id: 'state-overflow',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop ',
      summaryCards: [
        {
          text: 'Total Receipts',
          value: '₹ 4,20,672 Cr.',
        },
        {
          text: 'Total Expenditure',
          value: '₹ 5,50,271 Cr.',
        },
        {
          text: 'Fiscal Deficit',
          value: '₹ 21,73,990 Cr.',
        },
        {
          text: 'GSDP',
          value: '₹ 21,73,990 Cr.',
        },
      ],
    },
    {
      id: 'scheme-overflow',
      content:
        'Publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
      summaryCards: [
        {
          text: 'Total Receipts',
          value: '₹ 4,20,672 Cr.',
        },
        {
          text: 'Total Expenditure',
          value: '₹ 5,50,271 Cr.',
        },
        {
          text: 'Fiscal Deficit',
          value: '₹ 21,73,990 Cr.',
        },
        {
          text: 'GSDP',
          value: '₹ 21,73,990 Cr.',
        },
      ],
    },
  ],
};

const ExplorerHeader = () => {
  const TabbedRef = useRef(null);

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tablist = TabbedRef.current.querySelector('ul');
    const panels = TabbedRef.current.querySelectorAll('section');
    tabbedInterface(tablist, panels);
  });
  return (
    <>
      <Wrapper ref={TabbedRef}>
        <Tabs>
          {data.tabs.map((item, index) => (
            <li key={`ss-toggle-${index}`}>
              <a href={`#${item.id}`}>
                {item.icon}
                {item.text}
              </a>
            </li>
          ))}
        </Tabs>

        <Sections>
          {data.items.map((item, index) => (
            <section key={`ss-item-${index}`} id={item.id}>
              <p>{item.content}</p>
              <Summary>
                <div>
                  <h2>Summary</h2>
                  <span>Financial Year 2022-23</span>
                </div>
                <ul>
                  {item.summaryCards.map((itemCard, index) => (
                    <li key={`summary-${index}`}>
                      <div></div>
                      <strong>{itemCard.value}</strong>
                      <span>{itemCard.text}</span>
                    </li>
                  ))}
                </ul>
              </Summary>
            </section>
          ))}
        </Sections>
      </Wrapper>
    </>
  );
};

export default ExplorerHeader;

const Wrapper = styled.div`
  margin-top: 40px;
`;

const Tabs = styled.ul`
  display: flex;
  border-bottom: var(--border-1);

  a {
    text-decoration: none;
    padding: 4px 10px 18px 8px;
    display: flex;
    gap: 8px;
    color: var(--text-light-light);
    font-weight: 600;

    svg {
      fill: var(--color-grey-300);
    }

    &[aria-selected="true"] {
      color: var(--color-primary);
      border-bottom: 2px solid var(--color-primary);

      svg {
        fill: var(--color-amazon-300);;
      }
    }
  }
`;

const Sections = styled.div`
  margin-top: 20px;

  p {
    letter-spacing: 0.01em;
  }
`;

const Summary = styled.div`
  margin-top: 32px;

  > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;

    h2,
    span {
      font-weight: 600;
      font-size: 1rem;
    }

    h2 {
      border-right: 2px solid var(--text-light-disabled);
      padding-right: 8px;
      line-height: 1;

      @media screen and (max-width: 436px) {
        line-height: 1.7;
        border-right-color: transparent;

        border-bottom: 3px solid var(--text-light-disabled);
        padding-bottom: 12px;
      }
    }
  }

  ul {
    margin-top: 20px;
    display: flex;
    gap: 14px;
    flex-wrap: wrap;

    li {
      text-align: center;
      background-color: var(--color-background-lighter);
      padding: 20px 16px;
      border: var(--border-1);
      border-radius: 4px;
      filter: drop-shadow(var(--box-shadow-1));
      flex-basis: 214px;
      flex-grow: 1;
      position: relative;

      > div {
        width: 4px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: var(--gradient-maple);
      }
    }

    strong {
      font-weight: 900;
    }

    span {
      display: block;
      font-size: 0.75rem;
      color: var(--text-light-medium);
      line-height: 1.7;
      margin-top: 4px;
    }
  }
`;
