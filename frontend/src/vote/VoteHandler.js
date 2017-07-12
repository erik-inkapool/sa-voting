import { connect } from 'react-redux';

import {
  updateOptionName,
  addOption,
  deleteOption,
  updateVotes
} from '../actions/cards';
import { navigate } from '../actions/route';
import Vote from './Vote';
import totalVotes from '../utility/totalVotes';

const mapStateToProps = state => ({
  cards: state.cards,

  totalVotes: totalVotes(state.cards)
});

const mapDispatchToProps = dispatch => ({
  updateOptionName: (id, name) => dispatch(updateOptionName(id, name)),

  addOption: id => dispatch(addOption(id)),

  deleteOption: id => dispatch(deleteOption(id)),

  updateVotes: (id, votes) => dispatch(updateVotes(id, votes)),

  finish: () => {
    dispatch(navigate('VOTE_COMPLETE'));
  }
});

const VoteHandler = connect(mapStateToProps, mapDispatchToProps)(Vote);

export default VoteHandler;
