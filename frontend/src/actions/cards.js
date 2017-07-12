import generateGuid from 'uuid/v4';
import { createAction } from 'redux-actions';

export const addCard = createAction('ADD_CARD', () => {
    let options = [{
        id: generateGuid(),
        name: 'For',
        votes: 0
    },
    {
        id: generateGuid(),
        name: 'Against',
        votes: 0
    },
    {
        id: generateGuid(),
        name: '',
        votes: 0
    }];
    return {
        id: generateGuid(),
        options,
        votes: 0
    }
});

export const deleteCard = createAction('DELETE_CARD', id => ({ id }));

export const updateCard = createAction('UPDATE_CARD', (id, card) => ({ id, card }));

export const changeTitle = createAction('CHANGE_TITLE', (id, title) => ({ id, title }));

export const updateOptionName = createAction('UPDATE_OPTION_NAME', (id, name) => ({ id, name }));

export const updateVotes = createAction('UPDATE_OPTION_VOTES', (id, votes) => ({ id, votes }));

export const addOption = createAction('ADD_OPTION', cardId => ({ cardId, id: generateGuid() }));

export const deleteOption = createAction('DELETE_OPTION', id => ({ id }));