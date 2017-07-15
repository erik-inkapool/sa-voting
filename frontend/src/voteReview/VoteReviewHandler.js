import { connect } from 'react-redux';

import { navigate } from '../actions/route';
import VoteReview from './VoteReview';
import totalVotes from '../utility/totalVotes';

const mapStateToProps = state => ({
  cards: state.cards,

  totalVotes: totalVotes(state.cards)
});

const mapDispatchToProps = dispatch => ({
  edit: () => {
    dispatch(navigate('VOTE'));
  },
  finish: () => {
    dispatch(navigate('VOTE_COMPLETE'));
  }
});

const VoteReviewHandler = connect(mapStateToProps, mapDispatchToProps)(
  VoteReview
);

export default VoteReviewHandler;
