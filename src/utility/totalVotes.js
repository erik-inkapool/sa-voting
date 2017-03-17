import _ from 'lodash';

const totalVotes = cards => {
    return _.reduce(cards, (totalVotes, card) => 
        _.reduce(card.options, (totalVotes, option) => 
            option.votes + totalVotes, totalVotes), 0);
};

export default totalVotes;