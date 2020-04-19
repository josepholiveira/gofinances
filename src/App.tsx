import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';

import GlobalStyle from './styles/global';

import history from './services/history';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router history={history}>
      <Routes />
    </Router>
  </>
);

export default App;
