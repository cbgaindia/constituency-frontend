import styled, { css, createGlobalStyle } from 'styled-components';
import cssReset from './Reset';
import cssNormalise from './Normalise';
import { DEFAULT_THEME } from 'config/theme';
import { themes } from './themes';

const theme = DEFAULT_THEME;

const gradient = css`
  @supports (background-clip: text) or (-webkit-background-clip: text) {
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

export const GlobalStyles = createGlobalStyle`
${cssReset}
${cssNormalise}
${themes}

html {
  --color-primary: ${theme.color_amazon_300};
  --color-secondary : ${theme.color_maple_300};
  --color-tertiary : ${theme.color_olive_100};

  --colors-secondary : ${theme.color_maple_300} !important;

  --color-white : ${theme.color_white};
  --color-violet : ${theme.color_violet};
  --color-honey : ${theme.color_honey};

  --color-carrot : ${theme.color_carrot};
  --color-carrot-2 : ${theme.color_carrot_2};
  --color-carrot-3 : ${theme.color_carrot_3};
  --color-violet-3 : ${theme.color_violet_3};
  --color-sapphire-3 : ${theme.color_sapphire_3};
  --color-sapphire-5 : ${theme.color_sapphire_5};

  --colors-slateA3: ${theme.grey_500};

  --color-success : ${theme.color_success};
  --color-error : ${theme.color_error};
  --color-warning : ${theme.color_warning};
  --color-notice : ${theme.color_notice};


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
  --box-shadow-hover : 2px 8px 12px rgba(0, 0, 0, 0.2);
  --box-shadow-inset: inset 0px 0px 4px rgba(0, 0, 0, 0.08);
  --separator-5: 1px solid ${theme.grey_500};
  --separator-5-2: 2px solid ${theme.grey_500};
  --separator-6: 1px solid ${theme.grey_500};

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
  font-family: 'Inter',-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
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
  cursor: pointer !important;
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

.fill {
    flex-grow: 1;

    button {
      width: 100%;
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
