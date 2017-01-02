import React, { Component } from 'react';
import Background from './utility/Background';
import CardListHandler from './registerCards/CardListHandler';

class VotingApp extends Component {
  render() {
    return (
      <Background>
       <CardListHandler>
       </CardListHandler>
      </Background>
    );
  }
}

export default VotingApp;
