import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { initStore } from './store';
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { mainTheme } from './styles/themes'
import "./reset.css"
import "typeface-roboto"

const store = initStore();

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={mainTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
