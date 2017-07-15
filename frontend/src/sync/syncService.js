import io from 'socket.io-client';
import {
  addCard,
  addCards,
  deleteCard,
  updateCard,
  deleteAllCards
} from '../actions/cards';
import { navigate } from '../actions/route';

const syncService = {
  start: (dispatch, getState) => {
    const socket = io.connect('/');

    socket.on('cardDeleted', ({ id }) => {
      dispatch(deleteCard(id));
    });

    socket.on('allCardsDeleted', () => {
      dispatch(deleteAllCards());
      dispatch(navigate('REGISTER_CARDS'));
    });

    socket.on('cards', cards => {
      dispatch(
        addCards(
          cards
            .map(({ id, card }) => ({ ...card, id }))
            .map(c => addCard(c).payload)
        )
      );
    });

    socket.on('card', ({ id, card }) => {
      const hasCard = getState().cards.filter(card => card.id === id);
      if (!hasCard.length) {
        dispatch(
          addCard({
            ...card,
            id
          })
        );
      } else {
        dispatch(updateCard(id, card));
      }
    });

    socket.on('finish', () => {
      dispatch(navigate('VOTE_COMPLETE'));
    });
  }
};

export default syncService;
