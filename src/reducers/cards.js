import _ from 'lodash';

const card = (state = {}, action) => {
    let { type, payload } = action;

    switch (type) {
        case 'ADD_CARD':
            return {
                id: payload.id,
                title: ''
            };
        case 'CHANGE_TITLE':
            if (state.id !== payload.id) {
                return state;
            }

            return Object.assign({}, state, {
                title: payload.title
            });
        default:
            return state;
    }
}

const cards = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CARD':
            return [
                ...state,
                card(undefined, action)
            ];
        case 'CHANGE_TITLE':
            return state.map(c => card(c, action));
        case 'DELETE_CARD':
            return _.filter(state, card => card.id !== action.payload.id);
        default:
            return state;
    }
}

export default cards;