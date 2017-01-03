import { connect } from 'react-redux';
import _ from 'lodash';

import { updateOptionName, addOption, deleteOption, updateVotes } from '../actions/cards';
import { navigate } from '../actions/route';
import Vote from './Vote';

const getTotalVotes = cards => {
    return _.reduce(cards, (totalVotes, card) => 
        _.reduce(card.options, (totalVotes, option) => 
            option.votes + totalVotes, totalVotes), 0);
};

const mapStateToProps = state => ({
    cards: state.cards,

    totalVotes: getTotalVotes(state.cards)
});

const mapDispatchToProps = dispatch => ({
    updateOptionName: (id, name) => dispatch(updateOptionName(id, name)),

    addOption: id => dispatch(addOption(id)),

    deleteOption: id => dispatch(deleteOption(id)),

    updateVotes: (id, votes) => dispatch(updateVotes(id, votes))
});

const VoteHandler = connect(mapStateToProps, mapDispatchToProps)(Vote);

export default VoteHandler;