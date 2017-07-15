import React, { Component } from 'react';

import apiService from '../api/apiService';

import VoteCompleteHandler from './VoteCompleteHandler';

export default class CardTitleHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {}
    };
  }

  componentWillMount() {
    apiService.getResults().then(options => this.setState({ options }));
  }

  render() {
    return <VoteCompleteHandler options={this.state.options} />;
  }
}
