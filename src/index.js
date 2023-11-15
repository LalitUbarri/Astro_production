import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Notification from './components/pushNotification'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import Store from './Redux/store';
import { HelmetProvider } from 'react-helmet-async';
import './i18n';
const helmetContext = {};
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider context={helmetContext}>
        <Provider store={Store}>
          <App />
        </Provider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
  Notification.initializeFirebase()
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
