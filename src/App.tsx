import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ToastContainer} from 'react-toastify';

import {ThemeProvider} from '@mui/material';
import {muiTheme} from './styles/mui-theme';
import {BrowserRouter} from 'react-router-dom';

import { AbilityContext } from './modules/authentication/hooks/useAbitlity';

import RoutesSystem from './routes';
import {AppProvider} from './context';
import {ability} from './utils/define-ability';
import theme from './styles/theme';


const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <AbilityContext.Provider value={ability}>
          <BrowserRouter>
            <AppProvider>
              <RoutesSystem />
            </AppProvider>
          </BrowserRouter>
        </AbilityContext.Provider>
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <GlobalStyle />
    </ThemeProvider>
  </QueryClientProvider>
  )
}

export default App
