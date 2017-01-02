import generateGuid from 'uuid/v4';
import { createAction } from 'redux-actions';

export const addCard = createAction('ADD_CARD', () => ({ id: generateGuid() }));

export const deleteCard = createAction('DELETE_CARD', id => ({ id }));

export const changeTitle = createAction('CHANGE_TITLE', (id, title) => ({ id, title }));