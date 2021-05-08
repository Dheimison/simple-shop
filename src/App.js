import { getTheme } from '@fluentui/react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'styles/global';

function App() {
  const theme = getTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
