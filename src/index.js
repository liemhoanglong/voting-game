import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import RecoilLogger from 'recoil-logger';

import { client } from './apolloClient';

import reportWebVitals from './reportWebVitals';

import App from './components/App';
import './index.scss';

const renderApp = () => (
  <ApolloProvider client={client}>
    <RecoilRoot>
      {process.env.NODE_ENV === 'development' && <RecoilLogger />}
      <App />
    </RecoilRoot>
  </ApolloProvider>
);

ReactDOM.render(
  renderApp(),
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
