import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  html, body {
    height: 100%;
  }

  #root {
    display: flex;
    min-height: 100%;
  }

  ${({ theme }) => css`
    body {
      font-family: ${theme.fonts.large.fontFamily};
    }
  `}
`;
