import { connect } from 'react-redux'

import { addCard, deleteCard, changeTitle } from '../actions/cards';
import { navigate } from '../actions/route';
import CardList from './CardList';

const mapStateToProps = state => ({
    cards: state.cards
});

const mapDispatchToProps = dispatch => ({
    updateCardTitle: (id, title) => {
        dispatch(changeTitle(id, title));
    },

    addCard: () => {
        dispatch(addCard());
    },

    deleteCard: (id) => {
        dispatch(deleteCard(id));
    },

    startVote: () => {
        dispatch(navigate('VOTE'));
    }
});

const CardListHandler = connect(mapStateToProps, mapDispatchToProps)(CardList);

export default CardListHandler;