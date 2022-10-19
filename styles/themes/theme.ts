import { css } from 'styled-components';
import { amazon } from './amazon';

export const themes = css`
  [data-contrast='true'] {
    filter: invert(100%);
  }
  [data-theme='amazon'] {
    ${amazon}
  }
`;

export const defaultTheme = 'amazon';