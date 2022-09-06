import React from 'react';
import { Combobox } from 'components/actions';
import styled from 'styled-components';

const ConstBar = ({ meta }) => {
  const states = [
    {
      label: 'Mizoram',
      options: [
        { value: 'Sikkim', label: 'Sikkim' },
        { value: 'Meghalaya', label: 'Meghalaya' },
      ],
    },
    {
      label: 'Meghalaya',
      options: [
        { value: 'Sikkim', label: 'Sikkim' },
        { value: 'Meghalaya', label: 'Meghalaya' },
      ],
    },
    { value: meta.constituency, label: meta.constituency },
  ];

  return (
    <Wrapper>
      <ComboWrapper>
        {meta.constituency && (
          <Combobox
            options={states}
            defaultValue={{
              value: meta.constituency,
              label: meta.constituency,
            }}
            isMulti
            groupedOptions
            id="cons-selector"
            // menuIsOpen={true}
          />
        )}
        {meta.year && (
          <Combobox
            options={meta.allYears}
            defaultValue={{ value: meta.year, label: meta.year }}
            isMulti
            isSearchable={false}
            id="year-selector"
          />
        )}
      </ComboWrapper>
    </Wrapper>
  );
};
export default ConstBar;

const Wrapper = styled.div`
  background-color: var(--color-background-light);
  height: 100%;
`;

const ComboWrapper = styled.div`
  display: flex;
  gap: 12px;
  padding-inline: 16px;
  padding-top: 16px;

  #cons-selector {
    flex-basis: 60%;
    flex-grow: 1;

    input {
      outline: none !important;
    }
  }

  #year-selector {
    flex-basis: 40%;
    flex-grow: 1;
  }
`;
