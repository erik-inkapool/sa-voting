import PropTypes from 'prop-types';
import React from 'react';
import Background from './utility/Background';
import CardListHandler from './registerCards/CardListHandler';
import VoteHandler from './vote/VoteHandler';
import VoteReviewHandler from './voteReview/VoteReviewHandler';
import VoteCompleteDataFetcher from './voteComplete/VoteCompleteDataFetcher';

const VotingApp = ({ route }) => {
  let activeRoute;
  switch (route) {
    case 'VOTE':
      activeRoute = <VoteHandler />;
      break;
    case 'VOTE_REVIEW':
      activeRoute = <VoteReviewHandler />;
      break;
    case 'VOTE_COMPLETE':
      activeRoute = <VoteCompleteDataFetcher />;
      break;
    default:
      activeRoute = <CardListHandler />;
      break;
  }
  return (
    <Background>
      {activeRoute}
    </Background>
  );
};

VotingApp.propTypes = {
  route: PropTypes.string.isRequired
};

export default VotingApp;
