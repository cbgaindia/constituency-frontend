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
    value: 'up',
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

const SchemeSelector: React.FC<{
  sabha?: boolean;
  suggestion?: boolean;
  state?: string;
}> = ({ sabha = true, suggestion = true, state }) => {
  const [selectedState, setSelectedState] = useState<any>(
    state ? selectState(state) : noState
  );
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

  function selectState(val) {
    for (let i = 0; i < states.length; i++) {
      if (val.toLowerCase() === states[i].value) {
        return states[i];
      }
    }
    return noState;
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
    }
  }

  return (
    <HeaderControls>
      {sabha && (
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
      )}
      <SchemesMenu>
        <StateMenu
          className={`fill ${selectedState.value == null && 'not-selected'}`}
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
          className={`fill ${selectedScheme.value == null && 'not-selected'}`}
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
      </SchemesMenu>
      {suggestion && (
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
      )}
    </HeaderControls>
  );
};

export default SchemeSelector;

export const HeaderControls = styled.div`
  background-color: var(--color-white);
  padding: 16px 16px 12px;
  border-radius: 4px;
  margin: 0 auto;
`;

export const SchemesMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

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
