import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Document, Drop } from 'components/icons';
import { tabbedInterface } from 'utils/helper';
import { Summary } from 'components/pages/state/Header/Header';

const ExplorerHeader = ({ stateData, schemeDesc }) => {
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
        content: stateData.Description,
      },
      {
        id: 'scheme-overflow',
        content: schemeDesc,
      },
    ],
  };

  const summaryCards = [
    {
      text: 'Total Receipts',
      value: `₹ ${stateData['Total Receipts']} Cr.`,
    },
    {
      text: 'Total Expenditure',
      value: `₹ ${stateData['Total Expenditure']} Cr.`,
    },
    {
      text: 'Fiscal Deficit',
      value: `₹ ${stateData['Fiscal Deficit']} Cr.`,
    },
    {
      text: 'GSDP (in current prices)',
      value: `₹ ${stateData['GSDP']} Cr.`,
    },
  ];

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
          {data.items.map((item) => (
            <section key={item.id} id={item.id}>
              <p>{item.content}</p>
            </section>
          ))}
        </Sections>

        <Summary>
          <div>
            <h2>State Budget 2022-23 Highlights</h2>
          </div>
          <ul>
            {summaryCards.map((item, index) => (
              <li key={`summary-${index}`}>
                <div></div>
                <strong>{item.value}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </Summary>
      </Wrapper>
    </>
  );
};

export default ExplorerHeader;

const Wrapper = styled.div`
  margin-top: 40px;
  padding-bottom: 40px;
  border-bottom: var(--border-1);
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

    &[aria-selected='true'] {
      color: var(--color-primary);
      border-bottom: 2px solid var(--color-primary);

      svg {
        fill: var(--color-amazon-300);
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

// const Summary = styled.div`
//   margin-top: 32px;

//   > div {
//     display: flex;
//     align-items: center;
//     flex-wrap: wrap;
//     gap: 8px;

//     .fill {
//       max-width: 250px;
//     }

//     ${MenuLabel} {
//       font-weight: 600;
//       font-size: 1rem;
//       color: var(--text-light-high);
//     }

//     h2 {
//       font-weight: 600;
//       font-size: 1rem;
//       border-right: 2px solid var(--text-light-disabled);
//       padding-right: 8px;
//       line-height: 1;

//       @media screen and (max-width: 436px) {
//         line-height: 1.7;
//         border-right-color: transparent;

//         border-bottom: 3px solid var(--text-light-disabled);
//         padding-bottom: 12px;
//       }
//     }
//   }
// `;

const SummaryCard = styled.ul`
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
`;
