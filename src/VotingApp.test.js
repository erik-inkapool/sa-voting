import React from 'react';
import ReactDOM from 'react-dom';
import VotingApp from './VotingApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VotingApp />, div);
});
