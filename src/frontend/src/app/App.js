import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from './theme';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from './utils/create-emotion-cache';

import Layout from './layout/Layout';


const emotionCache = createEmotionCache();

function App() {
  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider
            theme={createTheme({
              direction: 'ltr',
              responsiveFontSizes: true,
              mode: 'light'
            })}
          >
          <Layout/>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default App;
