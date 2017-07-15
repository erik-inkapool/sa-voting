import { connect } from 'react-redux';

import { deleteAllCards } from '../actions/cards';
import { navigate } from '../actions/route';
import VoteComplete from './VoteComplete';
import apiService from '../api/apiService';

const mapStateToProps = state => ({
  cards: state.cards
});

const mapDispatchToProps = dispatch => ({
  startOver: () => {
    dispatch(deleteAllCards());
    dispatch(navigate('REGISTER_CARDS'));
    apiService.reset();
  }
});

const VoteCompleteHandler = connect(mapStateToProps, mapDispatchToProps)(
  VoteComplete
);

export default VoteCompleteHandler;
