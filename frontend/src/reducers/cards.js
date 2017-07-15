import _ from 'lodash';

const option = (state = {}, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'UPDATE_OPTION_NAME':
      if (state.id !== payload.id) {
        return state;
      }

      return Object.assign({}, state, {
        name: payload.name
      });
    case 'UPDATE_OPTION_VOTES':
      if (state.id !== payload.id) {
        return state;
      }

      return Object.assign({}, state, {
        votes: payload.votes
      });
    case 'ADD_OPTION':
      return {
        id: payload.id,
        name: '',
        votes: 0,
        canBeDeleted: true
      };
    default:
      return state;
  }
};

const card = (state = {}, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'ADD_CARD':
      return Object.assign(
        {
          title: ''
        },
        payload
      );
    case 'CHANGE_TITLE':
      if (state.id !== payload.id) {
        return state;
      }

      return Object.assign({}, state, {
        title: payload.title
      });
    case 'UPDATE_CARD':
      if (state.id !== payload.id) {
        return state;
      }

      return Object.assign({}, state, payload.card);
    case 'UPDATE_OPTION_NAME':
      state.options = state.options.map(o => option(o, action));
      return state;
    case 'UPDATE_OPTION_VOTES':
      state.options = state.options.map(o => option(o, action));
      return state;
    case 'ADD_OPTION':
      if (payload.cardId !== state.id) {
        return state;
      }
      state.options = [...state.options, option(undefined, action)];
      return state;
    case 'DELETE_OPTION':
      state.options = _.filter(
        state.options,
        option => option.id !== action.payload.id
      );
      return state;
    default:
      return state;
  }
};

const cards = (state = [], action) => {
  switch (action.type) {
    case 'DELETE_ALL_CARDS':
      return [];
    case 'ADD_CARD':
      return [...state, card(undefined, action)];
    case 'ADD_CARDS':
      return state.concat(action.payload);
    case 'UPDATE_CARD':
      return state.map(c => card(c, action));
    case 'CHANGE_TITLE':
      return state.map(c => card(c, action));
    case 'DELETE_CARD':
      return _.filter(state, card => card.id !== action.payload.id);
    case 'UPDATE_OPTION_NAME':
      return state.map(c => card(c, action));
    case 'ADD_OPTION':
      return state.map(c => card(c, action));
    case 'DELETE_OPTION':
      return state.map(c => card(c, action));
    case 'UPDATE_OPTION_VOTES':
      return state.map(c => card(c, action));
    default:
      return state;
  }
};

export default cards;
