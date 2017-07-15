import _ from 'lodash';

const noop = () => {};

const fetchIt = ({ url, ...config }) =>
  fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    ...config,
    body: JSON.stringify(config.data)
  })
    .then(
      response =>
        response.status >= 200 && response.status <= 299
          ? response.json()
          : Promise.reject()
    )
    .then(data => console.log('Fetchdata:', data) || data)
    .catch(noop);

let getState;

const apiService = {
  updateCard: id => {
    const card = getState().cards.find(c => c.id === id);
    if (!card) {
      throw new Error('No card found for id: ' + id);
    }
    return fetchIt({
      url: '/api/cards/' + id,
      method: 'PUT',
      data: card
    });
  },
  deleteCard: id => {
    return fetchIt({
      url: '/api/cards/' + id,
      method: 'DELETE'
    });
  },
  sendVotes: user => {
    const options = _.chain(getState().cards)
      .flatMap(c =>
        c.options.map(o => ({
          cardId: c.id,
          ...o,
          id: undefined
        }))
      )
      .filter(c => !c.deleted && c.votes > 0)
      .value();

    return fetchIt({
      url: '/api/options/' + localStorage.getItem('username'),
      method: 'PUT',
      data: options
    });
  },
  getResults: () => {
    return fetchIt({
      url: '/api/options'
    });
  },
  reset: () => {
    return fetchIt({
      url: '/api/cards',
      method: 'DELETE'
    });
  },
  start: stateGetter => (getState = stateGetter)
};

export default apiService;
