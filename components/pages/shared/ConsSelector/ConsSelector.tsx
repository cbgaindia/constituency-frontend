import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import { LokSabha, VidhanSabha } from 'components/icons';
import { useRouter } from 'next/router';
import ConstituencyWidget from './ConstituencyWidget';

const ConsSelector: React.FC<{
  consData: any;
  trending?: any;
}> = ({ consData, trending }) => {
  const router = useRouter();
  const sabhaRef = useRef(null);

  const [selectedSabha, setSelectedSabha] = useState(
    router.query.sabha ? router.query.sabha : 'lok'
  );
  const [selectedItem, setSelectedItem] = useState(null);

  function handleSabhaChange(sabha) {
    if (sabha === 'lok') {
      return consData?.lok;
    }
    return consData?.vidhan;
  }

  function handleSabhaClick(e) {
    const btn = e.target;
    const value = btn.dataset.value;

    setSelectedSabha(value);
    setSelectedItem(null);
    const selectedBtn = sabhaRef.current.querySelector(
      '[aria-pressed="true"]'
    ) as HTMLElement;

    if (btn !== selectedBtn) {
      selectedBtn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-pressed', 'true');
    }
  }

  function handleConsSelect(consName: any, consCode, stateName) {
    if (typeof consName === 'string') {
      setSelectedItem({
        cons: consName,
        code: consCode,
        state: stateName,
      });
    } else {
      setSelectedItem(null);
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
        <ConstituencyWidget
          fallBack={`Search for ${
            selectedSabha === 'lok' ? 'Lok' : 'Vidhan'
          } Sabha Constituency here...`}
          allStates={handleSabhaChange(selectedSabha)}
          newCompare={handleConsSelect}
          currentItem={selectedItem?.cons}
        />
        <Button
          kind="primary"
          href={
            selectedItem
              ? `/${selectedItem.state}/${selectedSabha}/${selectedItem.cons}`
              : null
          }
          onClick={
            selectedItem?.cons == null
              ? () => alert('Select a constituency')
              : null
          }
        >
          Explore
        </Button>
      </ConsMenu>
      {trending && (
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

export default ConsSelector;

export const HeaderControls = styled.div`
  background-color: var(--color-white);
  padding: 16px;
  border-radius: 4px;
  margin: 0 auto;
`;

export const ConsMenu = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 720px) {
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
