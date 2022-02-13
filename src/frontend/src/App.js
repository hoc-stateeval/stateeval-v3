// import '../fake-db';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'

import { createEmotionCache } from '@lib/utils/create-emotion-cache';
import RootRoute from '@routes/RootRoute';

import store from './store';
import theme from './Theme';

const emotionCache = createEmotionCache();

let persistor = persistStore(store)

const App = () => {
   return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
