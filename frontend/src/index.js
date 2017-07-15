import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './jaydensericFoundation.css';
import './index.css';
import VotingApp from './VotingApp';
import reducers from './reducers';

import apiService from './api/apiService';
import syncService from './sync/syncService';

let store = createStore(reducers);
syncService.start(action => store.dispatch(action), () => store.getState());
apiService.start(() => store.getState());

ReactDOM.render(
  <Provider store={store}>
    <VotingApp />
  </Provider>,
  document.getElementById('root')
);

let username = localStorage.getItem('username');
while (!username || username.trim() === 'null') {
  username = prompt('Please enter your username:');
}

localStorage.setItem('username', username);
