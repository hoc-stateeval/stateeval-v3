// import '../fake-db';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { createEmotionCache } from '@lib/utils/create-emotion-cache';
import RootRoute from '@routes/RootRoute';

import store from './store';
import theme from './Theme';

const emotionCache = createEmotionCache();

const App = () => {
   return (
    <>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RootRoute />
              </ThemeProvider>
            </Suspense>
          </BrowserRouter>
        </CacheProvider>
      </Provider>
    </>
  );
}

export default App;
