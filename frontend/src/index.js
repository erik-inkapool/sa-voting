import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './jaydensericFoundation.css';
import './index.css';
import VotingApp from './VotingApp';
import reducers from './reducers';

import syncService from './syncService';

let store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <VotingApp />
  </Provider>,
  document.getElementById('root')
);
