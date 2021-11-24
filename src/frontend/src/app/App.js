import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from './theme';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from './utils/create-emotion-cache';

import Layout from './layout/Layout';
import Test from './features/Test';


const emotionCache = createEmotionCache();

const App = () => {
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
          <CssBaseline/>
          <Layout>
            <Test/>
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default App;
