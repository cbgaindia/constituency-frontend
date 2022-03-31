import styled, { css, createGlobalStyle } from 'styled-components';
import { transparentize } from 'polished';
import cssReset from './Reset';
import cssNormalise from './Normalise';
import { DEFAULT_THEME } from 'config/theme';

const theme = DEFAULT_THEME;

const gradient = css`
  @supports (background-clip: text) {
    --gradient-bg: var(--text-light-high);
    background-color: var(--gradient-bg);
    background-image: var(--gradient-bg);
    background-size: 100%;
    background-repeat: repeat;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    text-shadow: var(--box-shadow-1);
  }
`;

export const GlobalStyle = createGlobalStyle`
${cssReset}
${cssNormalise}

html {
  --color-primary: ${theme.color_amazon_100};
  --color-secondary : ${theme.color_maple_100};
  --color-tertiary : ${theme.color_olive_100};

  --color-background : ${theme.background};
  --color-background-dark : ${theme.background_dark};
  --background-dark-hover : ${theme.color_amazon_600};
  --color-background-darker : ${theme.background_darker};
  --color-background-light : ${theme.background_light};
  --color-background-lighter : ${theme.background_lighter};

  --color-white : ${theme.color_white};
  --color-violet : ${theme.color_violet};
  --color-honey : ${theme.color_honey};
  --color-amazon-100 : ${theme.color_amazon_100};
  --color-amazon-200 : ${theme.color_amazon_200};
  --color-amazon-300 : ${theme.color_amazon_300};
  --color-amazon-400 : ${theme.color_amazon_400};
  --color-amazon-500 : ${theme.color_amazon_500};
  --color-amazon-600 : ${theme.color_amazon_600};

  --color-maple-100 : ${theme.color_maple_100};
  --color-maple-200 : ${theme.color_maple_200};
  --color-maple-300 : ${theme.color_maple_300};
  --color-maple-400 : ${theme.color_maple_400};
  --color-maple-500 : ${theme.color_maple_500};
  --color-maple-600 : ${theme.color_maple_600};

  --color-carrot : ${theme.color_carrot};
  --color-carrot-2 : ${theme.color_carrot_2};
  --color-carrot-3 : ${theme.color_carrot_3};
  --color-violet-3 : ${theme.color_violet_3};
  --color-sapphire-3 : ${theme.color_sapphire_3};
  --color-sapphire-5 : ${theme.color_sapphire_5};

  --color-success : ${theme.color_success};
  --color-error : ${theme.color_error};
  --color-warning : ${theme.color_warning};
  --color-notice : ${theme.color_notice};

  --color-grey-100 : ${theme.grey_100};
  --color-grey-200 : ${theme.grey_200};
  --color-grey-300 : ${theme.grey_300};
  --color-grey-400 : ${theme.grey_400};
  --color-grey-500 : ${theme.grey_500};
  --color-grey-600 : ${theme.grey_600};

  --text-light-high : ${theme.text_light_high};
  --text-light-medium : ${theme.text_light_medium};
  --text-light-light : ${theme.text_light_light};
  --text-light-disabled : ${theme.text_light_disabled};

  --text-dark-high : ${theme.text_dark_high};
  --text-dark-medium : ${theme.text_dark_medium};
  --text-dark-light : ${theme.text_dark_light};
  --text-dark-disabled : ${theme.text_dark_disabled};

  --gradient-basic : ${theme.gradient_basic};
  --gradient-hotPink : ${theme.gradient_hotPink};
  --gradient-sapphire : ${theme.gradient_sapphire};
  --gradient-maple : linear-gradient(162.85deg, #E9B840 0%, #AA862E 99.48%);
  --gradient-amazon: linear-gradient(158.61deg, #28A062 7.07%, #165735 99.52%);

  --border-1 : 1px solid var(--color-grey-500);
  --border-2 : 1px solid var(--color-grey-600);
  --box-shadow-1 : 0px 4px 12px rgba(0, 0, 0, 0.08);
  --box-shadow-inset: inset 0px 0px 4px rgba(0, 0, 0, 0.08);
  --separator-5: 1px solid ${transparentize('0.5', `${theme.grey_500}`)};
  --separator-5-2: 2px solid ${transparentize('0.5', `${theme.grey_500}`)};
  --separator-6: 1px solid ${transparentize('0.5', `${theme.grey_500}`)};

  --font-weight-bold: 600;
  --font-weight-medium: 500;
  --font-weight-light: 400;

  --nav-bg: var(--color-background-darker);
  --nav-bg-hover: var(--background-dark-hover);
  --nav-submenu: var(--color-amazon-400);
  --nav-submenu-hover: var(--color-amazon-600);
  --nav-mobile: var(--color-amazon-400);

  box-sizing: border-box;

  &.ReactModal__Html--open {
    overflow-y: hidden;
  }
}
*, *:before, *:after {
  box-sizing: inherit;
}

:focus-visible {
  outline: 3px solid #78aeda !important;
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Rubik',-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
		Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background-color: var(--color-background-light);
  font-size: 16px;
  line-height: 1.5;
  color: var(--text-light-high);
}

#__next {
  min-height: 100vh;
}

button {
  border:  none;
  background: none;
  cursor: pointer;
}

a {
  color: inherit;
}

ul, ol {
  margin: 0;
  padding: 0;
}

.sr-only {
  &:not(:where(:focus, :active, :focus-within)) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  
  width: calc(100vw - 20px);
  max-width: 1246px;
}

.img-cover {
   object-fit: cover;
}
.img-contain {
   object-fit: contain;
}

.gradient {
  &-maple {
    ${gradient} {
      --gradient-bg: var(--gradient-maple);
    }
  }

  &-amazon {
    ${gradient} {
      --gradient-bg: var(--gradient-amazon);
    }
  }
}
`;

export const HomeTitle = styled.span`
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.7;
`;
