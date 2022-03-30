import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Button, Menu } from 'components/actions';
import { MenuButton, MenuContent } from 'components/actions/Menu/MenuComp';
import { LokSabha, VidhanSabha } from 'components/icons';

const states = [
  {
    title: 'Rajasthan',
    value: 'rajasthan',
  },
  {
    title: 'Uttar Pradesh',
    value: 'uttar_pradesh',
  },
  {
    title: 'Odisha',
    value: 'odisha',
  },
  {
    title: 'Gujrat',
    value: 'gujrat',
  },
  {
    title: 'Kerela',
    value: 'kerela',
  },
  {
    title: 'Tamil Nadu',
    value: 'tamil_nadu',
  },
];

const schemes = [
  {
    title: 'Beti Bachao Beti Padhao (BBBP)',
    value: 'bbbp',
  },
  {
    title: 'Integrated Child Development Services (ICDS)',
    value: 'icds',
  },
  {
    title: 'Integrated Child Protection Scheme (ICPS)',
    value: 'icps',
  },
  {
    title:
      'Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS)',
    value: 'mgnregs',
  },
  {
    title: 'National Health Mission (NHM)',
    value: 'nhm',
  },
  {
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    value: 'pmkisan',
  },
];

const trending = [
  {
    text: 'Uttar Pradesh x Manrega',
    link: '#',
  },
  {
    text: 'Rajasthan x Beti Bachao Beti Padhao',
    link: '#',
  },
];

const noState = {
  title: 'Select a state...',
  value: null,
};
const noScheme = {
  title: 'Select a scheme...',
  value: null,
};

const HomeHeader = () => {
  const [selectedState, setSelectedState] = useState(noState);
  const [selectedScheme, setSelectedScheme] = useState(noScheme);
  const [selectedSabha, setSelectedSabha] = useState('Lok Sabha');

  const sabhaRef = useRef(null);

  function handleMenuChange(val, array) {
    const setState = array === states ? setSelectedState : setSelectedScheme;

    for (let i = 0; i < array.length; i++) {
      if (val === array[i].value) {
        setState(array[i]);
        return;
      }
    }
    setState(array[0]);
  }

  function handleSabhaClick(e) {
    const btn = e.target;
    const value = btn.dataset.value;
    setSelectedSabha(value);

    const selectedBtn = sabhaRef.current.querySelector(
      '[aria-pressed="true"]'
    ) as HTMLElement;

    if (btn !== selectedBtn) {
      selectedBtn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-pressed', 'true');
    }
  }

  function handleSubmitClick() {
    if (selectedState.value == null || selectedScheme.value == null) {
      alert('Select state and scheme');
    } else {
      const obj = {
        state: selectedState.value,
        scheme: selectedScheme.value,
        sabha: selectedSabha,
      };
      console.log(obj);
    }
  }

  return (
    <Header>
      <div className="container">
        <h1>
          <span className="gradient-amazon">Explore</span>{' '}
          <span className="gradient-maple">
            Constituency-wise Fiscal Information
          </span>{' '}
          <span className="gradient-amazon">for schemes</span>
        </h1>
        <HeaderControls>
          <HeaderToggle ref={sabhaRef}>
            <Button
              aria-pressed="true"
              data-value="lok-sabha"
              onClick={handleSabhaClick}
              icon={<LokSabha />}
              iconSide="left"
              kind="custom"
            >
              Lok Sabha
            </Button>
            <Button
              aria-pressed="false"
              data-value="vidhan-sabha"
              onClick={handleSabhaClick}
              icon={<VidhanSabha />}
              iconSide="left"
              kind="custom"
            >
              Vidhan Sabha
            </Button>
          </HeaderToggle>
          <SchemeSelector>
            <StateMenu
              className={`fill ${
                selectedState.value == null && 'not-selected'
              }`}
            >
              <Menu
                options={states}
                handleChange={(e) => handleMenuChange(e, states)}
                heading="Select State"
                value={selectedState.title}
                showLabel={false}
              />
            </StateMenu>
            <SchemeMenu
              className={`fill ${
                selectedScheme.value == null && 'not-selected'
              }`}
            >
              <Menu
                options={schemes}
                handleChange={(e) => handleMenuChange(e, schemes)}
                heading="Select any Scheme"
                value={selectedScheme.title}
                showLabel={false}
              />
            </SchemeMenu>
            <Button kind="primary" onClick={handleSubmitClick}>
              Explore
            </Button>
          </SchemeSelector>
          <Trending>
            <span>Trending Search:</span>
            <div>
              {trending.map((item, index) => (
                <a key={`trending-${index}`} href={item.link}>
                  {item.text}
                </a>
              ))}
            </div>
          </Trending>
        </HeaderControls>
      </div>
    </Header>
  );
};

export default HomeHeader;

const Header = styled.header`
  padding: 64px 0;
  min-height: calc(100vh - 182px);
  background-color: var(--color-background-light);
  background-image: url('/assets/images/background.svg');
  z-index: -1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    text-shadow: var(--box-shadow-1);
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 600;
  }
`;

const HeaderControls = styled.div`
  background-color: var(--color-white);
  padding: 16px 16px 12px;
  border-radius: 4px;

  max-width: 1020px;
  margin: 0 auto;
  margin-top: 40px;
`;

const SchemeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

  .fill {
    flex-grow: 1;

    button {
      width: 100%;
    }

    ${MenuContent} {
      width: 100%;
    }
  }

  .not-selected {
    ${MenuButton} {
      color: var(--text-light-light);
    }
  }

  ${MenuButton} {
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    font-weight: 600;
    color: var(--text-light-medium);
  }

  @media screen and (max-width: 720px) {
    flex-wrap: wrap;
  }
`;

const HeaderToggle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  border-bottom: var(--border-2);

  button {
    font-weight: 600;
    padding-bottom: 10px;
    border-bottom: 2px solid transparent;
    padding-inline: 8px;
    border-radius: 0;
    color: var(--text-light-light);

    svg {
      fill: var(--color-grey-300);
    }

    &[aria-pressed='true'] {
      color: var(--color-amazon-100);
      border-bottom-color: var(--color-amazon-100);

      svg {
        fill: var(--color-amazon-300);
      }
    }
  }
`;

const StateMenu = styled.div`
  flex-basis: 208px;
`;

const SchemeMenu = styled.div`
  flex-basis: 637px;
`;

const Trending = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 12px;
  flex-wrap: wrap;

  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.7;

  > div {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  a {
    color: var(--color-amazon-100);
  }
`;
