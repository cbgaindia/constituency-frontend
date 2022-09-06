import React from 'react';
import Select, { components } from 'react-select';
import styled from 'styled-components';

const handleHeaderClick = (id) => {
  const node = document.querySelector(`#${id}`);
  const collapseNode = node.parentElement.nextElementSibling;

  const classesNode = node.classList;
  if (classesNode.contains('react-select__group-active')) {
    node.classList.remove('react-select__group-active');
  } else {
    node.classList.add('react-select__group-active');
  }

  const classes = collapseNode.classList;
  if (classes.contains('collapsed')) {
    collapseNode.classList.remove('collapsed');
  } else {
    collapseNode.classList.add('collapsed');
  }
};

const CustomGroupHeading = (props) => {
  return (
    <div
      className="group-heading-wrapper"
      onClick={() => handleHeaderClick(props.id)}
    >
      <components.GroupHeading {...props} />
    </div>
  );
};

interface CustomProps {
  groupedOptions?: boolean;
}
type ComboboxProps = React.ComponentProps<typeof Select> & CustomProps;

const Combobox = ({ groupedOptions, ...props }: ComboboxProps) => {
  React.useEffect(() => {
    const groupWrappers = document.querySelectorAll('.group-heading-wrapper');

    console.log(groupWrappers);

    groupWrappers.forEach((elm) =>
      elm.nextElementSibling.classList.add('collapsed')
    );
  }, []);

  if (groupedOptions)
    return (
      <ReactSelectElement
        classNamePrefix="react-select"
        components={{ GroupHeading: CustomGroupHeading }}
        {...props}
      />
    );

  return <ReactSelectElement classNamePrefix="react-select" {...props} />;
};

export default Combobox;

const ReactSelectElement = styled(Select)`
  .react-select {
    &__menu {
      margin-top: 1px;

      &-list {
        padding: 12px;
        display: flex;
        flex-direction: column;
        max-height: 400px;
      }
    }

    &__value-container--is-multi {
      gap: 8px;
      padding: 8px 12px;
    }

    &__multi-value {
      background-color: var(--color-background-light);
      margin: 0;
      border-radius: 4px;

      &__label {
        font-weight: 400;
        letter-spacing: 0.01em;
        font-size: 1rem;
        padding: 4px;
        padding-left: 8px;
      }

      &__remove {
        border-radius: 0px 4px 4px 0px;
        background-color: var(--text-light-disabled);
        padding: 4px;
      }
    }

    &__group {
      padding: 0;
      margin-top: 8px;

      &:first-child {
        margin-top: 0;
      }

      &-heading {
        padding: 8px;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.7;
        color: var(--text-light-high);
        border-radius: 2px;
        background-color: var(--color-grey-600);
        transition: background-color 150ms ease;
        margin-bottom: 0;
        text-transform: inherit;
        cursor: pointer;

        &:hover {
          background-color: #e5eae7;
        }
      }

      .react-select__option {
        background-color: #e5eae7;

        &:first-of-type {
          border-top: var(--border-1);
        }

        &--is-focused {
          background-color: #dadddb;
        }
      }

      &-active {
        background-color: #e5eae7;
      }
    }

    &__option {
      transition: background-color 150ms ease;
      font-size: 0.875rem;
      line-height: 1.7;
      cursor: pointer;
      border-radius: 2px;

      &--is-focused {
        background-color: var(--color-grey-600);
      }
    }
  }

  .collapsed {
    display: none;
  }
`;
