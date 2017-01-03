import React, { PropTypes } from 'react';
import Background from './utility/Background';
import CardListHandler from './registerCards/CardListHandler';
import VoteHandler from './vote/VoteHandler';

const VotingApp = ({route}) => {
  let activeRoute;
  switch (route) {
    case 'VOTE':
      activeRoute = <VoteHandler />;
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
