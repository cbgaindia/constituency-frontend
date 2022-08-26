import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import { LokSabha, VidhanSabha } from 'components/icons';
import { useRouter } from 'next/router';
import ConstituencySelect from 'components/pages/explorer/ExplorerDetailsViz/ConstituencySelect';

const SchemeSelector: React.FC<{
  schemeData: any;
}> = ({ schemeData }) => {
  const router = useRouter();
  const sabhaRef = useRef(null);

  const [selectedSabha, setSelectedSabha] = useState(
    router.query.sabha ? router.query.sabha : 'lok'
  );
  const [selectedCons, setSelectedCons] = useState(null);

  function handleSabhaChange(sabha) {
    if (sabha === 'lok') {
      return schemeData?.pc.metadata.consList;
    }
    return schemeData?.ac.metadata.consList;
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

  function handleConsSelect(consName: any) {
    if (typeof consName === 'string') {
      setSelectedCons(consName);
    } else {
      setSelectedCons(null);
    }
  }

  return (
    <HeaderControls>
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

      <ConsMenu>
        <ConstituencySelect
          fallBack={`Select a constituency`}
          allStates={handleSabhaChange(selectedSabha)}
          newCompare={handleConsSelect}
          currentItem={selectedCons}
        />
        <Button
          kind="primary"
          href={selectedCons ? `/cons/${selectedCons}` : null}
          onClick={
            selectedCons == null ? () => alert('Select a constituency') : null
          }
        >
          Explore
        </Button>
      </ConsMenu>
    </HeaderControls>
  );
};

export default SchemeSelector;

export const HeaderControls = styled.div`
  background-color: var(--color-white);
  padding: 16px;
  border-radius: 4px;
  margin: 0 auto;
`;

export const ConsMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

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
      max-width: 40px;
      max-height: 40px;
      transform: scale(0.8);
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
