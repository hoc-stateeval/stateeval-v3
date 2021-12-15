// import '../fake-db';
import { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';
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
              <ThemeProvider theme={theme}>
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
