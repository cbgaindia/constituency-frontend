import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button, Menu } from 'components/actions';
import { MenuButton, MenuContent } from 'components/actions/Menu/MenuComp';
import { LokSabha, VidhanSabha } from 'components/icons';
import { useRouter } from 'next/router';
import { MenuWrapper } from 'components/actions/Menu';

const noState = {
  title: 'Select a state...',
  value: null,
};
const noScheme = {
  title: 'Select a scheme...',
  value: null,
};

function defaultState(item) {
  return {
    value: item,
    title: item,
  };
}

function defaultScheme(item) {
  return {
    value: item,
    title: 'Loading...',
  };
}

const SchemeSelector: React.FC<{
  sabha?: boolean;
  suggestion?: boolean;
  trending?: any;
  state?: string;
  scheme?: any;
  stateData?: any;
}> = ({
  sabha = true,
  suggestion = true,
  state,
  scheme,
  trending,
  stateData,
}) => {
  const router = useRouter();

  const [selectedState, setSelectedState] = useState<any>(
    state ? defaultState(state) : noState
  );
  const [selectedScheme, setSelectedScheme] = useState(
    scheme ? defaultScheme(scheme) : noScheme
  );
  const [selectedSabha, setSelectedSabha] = useState(
    router.query.sabha ? router.query.sabha : 'lok'
  );
  const [availableStates, setAvailableStates] = useState<any>([]);
  const [availableSchemes, setAvailableSchemes] = useState<any>([]);
  const sabhaRef = useRef(null);

  useEffect(() => {
    const availableStates = Object.keys(stateData).map((item) => ({
      value: item,
      title: item,
    }));

    // sort
    availableStates.sort((a, b) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );

    if (!state) {
      setSelectedState([0]);
    }
    setAvailableStates(availableStates);
  }, []);
  console.log(scheme, selectedScheme);

  useEffect(() => {
    if (stateData[selectedState.value]) {
      const tempSchemes = stateData[selectedState.value].map((item) => ({
        value: item.scheme_slug,
        title: item.scheme_name,
      }));

      // sort
      tempSchemes.sort((a, b) =>
        a.value > b.value ? 1 : b.value > a.value ? -1 : 0
      );

      setSelectedScheme(tempSchemes[0]);
      setAvailableSchemes(tempSchemes);
    }
  }, [selectedState, stateData]);

  function handleMenuChange(val, array) {
    const setState =
      array === availableStates ? setSelectedState : setSelectedScheme;

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

  return (
    <HeaderControls>
      {sabha && (
        <HeaderToggle ref={sabhaRef}>
          <Button
            aria-pressed="true"
            data-value="lok"
            onClick={handleSabhaClick}
            icon={<LokSabha />}
            iconSide="left"
            kind="custom"
          >
            Lok Sabha
          </Button>
          <Button
            aria-pressed="false"
            data-value="vidhan"
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
            options={availableStates}
            handleChange={(e) => handleMenuChange(e, availableStates)}
            heading="Select State"
            value={selectedState.title}
            showLabel={false}
          />
        </StateMenu>
        <SchemeMenu
          className={`fill ${selectedScheme.value == null && 'not-selected'}`}
        >
          <Menu
            options={availableSchemes}
            handleChange={(e) => handleMenuChange(e, availableSchemes)}
            heading="Select any Scheme"
            value={selectedScheme.title}
            showLabel={false}
          />
        </SchemeMenu>
        <Button
          kind="primary"
          href={`/explorer?scheme=${selectedScheme.value || 'mdm'}&state=${
            selectedState.value || 'Bihar'
          }&sabha=${router.query.sabha ? router.query.sabha : selectedSabha}`}
        >
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

  ${MenuWrapper} {
    button {
      text-transform: capitalize;
    }
  }
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
