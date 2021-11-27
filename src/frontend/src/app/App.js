import '../fake-db';
import { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from './theme';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from './utils/create-emotion-cache';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

const emotionCache = createEmotionCache();

const App = () => {
   return (
    <>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <ThemeProvider
                  theme={createTheme({
                    direction: 'ltr',
                    responsiveFontSizes: true,
                    mode: 'light'
                  })}
                >
                <CssBaseline/>
                <MainLayout />
              </ThemeProvider>
            </Suspense>
          </Router>
        </CacheProvider>
      </Provider>
    </>
  );
}

export default App;
