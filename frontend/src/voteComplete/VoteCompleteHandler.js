import { connect } from 'react-redux';

import { navigate } from '../actions/route';
import VoteComplete from './VoteComplete';
import totalVotes from '../utility/totalVotes';

const mapStateToProps = state => ({
  cards: state.cards,

  totalVotes: totalVotes(state.cards)
});

const mapDispatchToProps = dispatch => ({
  edit: () => {
    dispatch(navigate('VOTE'));
  }
});

const VoteCompleteHandler = connect(mapStateToProps, mapDispatchToProps)(
  VoteComplete
);

export default VoteCompleteHandler;
