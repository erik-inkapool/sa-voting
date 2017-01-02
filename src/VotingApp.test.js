import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import VotingApp from './VotingApp';
import reducers from './reducers';

let store = createStore(reducers);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <VotingApp />
  </Provider>, div);
});
