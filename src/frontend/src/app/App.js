import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from './theme';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from './utils/create-emotion-cache';
import { Router } from 'react-router-dom';
import PrivateRoutes from './routing/PrivateRoutes'

const emotionCache = createEmotionCache();

const App = () => {
  return (
    <>
      <CacheProvider value={emotionCache}>
        {/* <Router> */}
          <ThemeProvider
              theme={createTheme({
                direction: 'ltr',
                responsiveFontSizes: true,
                mode: 'light'
              })}
            >
            <CssBaseline/>
            <PrivateRoutes/>
          </ThemeProvider>
        {/* </Router> */}
      </CacheProvider>
    </>
  );
}

export default App;
