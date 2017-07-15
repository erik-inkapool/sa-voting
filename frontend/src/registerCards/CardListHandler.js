import { connect } from 'react-redux';

import {
  addCard,
  deleteCard,
  updateCard,
  changeTitle,
  deleteAllCards
} from '../actions/cards';
import { navigate } from '../actions/route';
import CardList from './CardList';
import apiService from '../api/apiService';

const mapStateToProps = state => ({
  cards: state.cards
});

const mapDispatchToProps = dispatch => ({
  updateCardTitle: (id, title) => {
    dispatch(changeTitle(id, title));
  },

  updateCard: (id, card) => {
    dispatch(updateCard(id, card));
    apiService.updateCard(id);
  },

  addCard: () => {
    dispatch(addCard());
  },

  deleteCard: id => {
    dispatch(deleteCard(id));
    apiService.deleteCard(id);
  },

  startVote: () => {
    dispatch(navigate('VOTE'));
  },

  reset: () => {
    dispatch(deleteAllCards());
    dispatch(navigate('REGISTER_CARDS'));
    apiService.reset();
  }
});

const CardListHandler = connect(mapStateToProps, mapDispatchToProps)(CardList);

export default CardListHandler;
