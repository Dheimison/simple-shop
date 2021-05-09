import { getTheme, initializeIcons } from '@fluentui/react';
import { ThemeProvider } from 'styled-components';

import { Routes } from 'routes';
import GlobalStyle from 'styles/global';

function App() {
  initializeIcons();
  const theme = getTheme();

  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
