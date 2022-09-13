import styled from 'styled-components';
import React from 'react';
import Image from 'next/image';
import { IconGeneralAdd } from 'components/icons/IconlAdd';
import { Combobox } from 'components/actions/Combobox';
import { Button } from 'components/actions/Button';

export const SchemeSearch = ({ meta, schemeList }) => {
  const schemes = React.useMemo(() => {
    if (schemeList) {
      const schemeArr = schemeList.map((scheme) => {
        return {
          value: scheme['scheme_slug'],
          label: scheme['scheme_name'],
        };
      });
      return schemeArr;
    }
  }, [schemeList]);

  return (
    <Wrapper>
      <SchemeWrapper>
        <Image
          src={'/assets/schemes/nhm.png'}
          width={48}
          height={48}
          layout="fixed"
          alt=""
          className="img-cover"
        />
        {meta.schemeData && (
          <Combobox
            options={schemes}
            isSearchable={false}
            isClearable
            placeholder="Select a scheme"
            defaultValue={{
              value: meta.scheme,
              label: meta.schemeData.metadata?.name,
            }}
            isLight
          />
        )}
      </SchemeWrapper>
      <EditorialWrapper>
        <EditorialHeader>
          <span>Scheme Editorial Notes</span>
          <Button
            icon={<IconGeneralAdd fill="#888F8B" />}
            iconOnly
            kind="custom"
          >
            Expand scheme Editorial notes
          </Button>
        </EditorialHeader>
      </EditorialWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 32px;
  padding: 24px;
  background-color: var(--color-background-lighter);
  border: var(--border-2);
  box-shadow: var(--box-shadow-1);
  border-radius: 4px;

  .react-select__single-value {
    font-size: 0.875rem;
    line-height: 1.7;
  }

  @media (max-width: 480px) {
    padding: 18px;
  }
`;

const SchemeWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  > span {
    min-width: 48px;
  }

  > div {
    flex-grow: 1;
  }

  @media (max-width: 580px) {
    flex-wrap: wrap;
  }
`;

const EditorialWrapper = styled.div`
  margin-top: 20px;
`;

const EditorialHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  > span {
    font-weight: 700;
  }

  > button {
    color: #888f8b;
  }
`;
