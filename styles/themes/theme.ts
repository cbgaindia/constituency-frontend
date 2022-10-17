import { css } from 'styled-components';
import { maple } from './maple';

export const themes = css`
  [data-contrast='true'] {
    filter: invert(100%);
  }
  [data-theme='maple'] {
    ${maple}
  }
`;

export const defaultTheme = 'maple';