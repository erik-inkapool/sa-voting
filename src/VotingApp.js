import React, { Component } from 'react';
import Background from './Background';
import AddCards from './AddCards';

class VotingApp extends Component {
  render() {
    return (
      <Background>
       <AddCards>
       </AddCards>
      </Background>
    );
  }
}

export default VotingApp;
