import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { tabbedInterface } from './tabbed.helper';

const Tabbed = ({ data }) => {
  const TabbedRef = useRef(null);

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tablist = TabbedRef.current.querySelector('ul');
    const panels = TabbedRef.current.querySelectorAll('section');
    tabbedInterface(tablist, panels);
  }, []);
  return (
    <TabbedWrapper ref={TabbedRef}>
      <ul>
        {data.tabs.map((item, index) => (
          <li key={`toggleItem-${index}`}>
            <a href={`#${item.id}`}>{item.name}</a>
          </li>
        ))}
      </ul>

      <div>
        {data.items.map((item, index) => (
          <section key={`vizItem-${index}`} className="viz__bar" id={item.id}>
            {item.content}
          </section>
        ))}
      </div>
    </TabbedWrapper>
  );
};

export default Tabbed;

export const TabbedWrapper = styled.div`
  * {
    color: inherit;
    margin: 0;
  }

  [role='tablist'] {
    padding: 0;

    a,
    li {
      display: inline-block;
    }

    a {
      text-decoration: none;
      padding: 0.5rem 1em;
    }

    [aria-selected] {
      border: 2px solid;
      background: #fff;
      border-bottom: 0;
      position: relative;
      top: 2px;
    }
  }

  [role='tabpanel'] {
    border: 2px solid;
    padding: 1.5rem;

    * + * {
      margin-top: 0.75rem;
    }
  }

  @media (max-width: 550px) {
    [role='tablist'] {
      li,
      a {
        display: block;
        position: static;
      }

      a {
        border: 2px solid #222 !important;
      }

      li + li a {
        border-top: 0 !important;
      }

      [aria-selected] {
        position: static;
      }
    }

    [role='tabpanel'] {
      border-top: 0;
    }
  }
`;
