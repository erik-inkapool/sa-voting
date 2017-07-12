import { combineReducers } from 'redux';

import cards from './cards';
import route from './route';

const votingApp = combineReducers({
    cards,
    route
});

export default votingApp;