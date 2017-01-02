import { combineReducers } from 'redux';

import cards from './cards';

const votingApp = combineReducers({
    cards
});

export default votingApp;