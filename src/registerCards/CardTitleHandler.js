import React, { Component } from 'react';
import styled from 'styled-components';

import CardTitle from './CardTitle';
import EditableCardTitle from './EditableCardTitle';
import politicalCardData from '../data/political-cards.json';

export default class CardTitleHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.exitEditMode = this.exitEditMode.bind(this);
    this.enterEditMode = this.enterEditMode.bind(this);
  }

  exitEditMode() {
    this.setState(prevState =>
      Object.assign({}, prevState, {
        editing: false
      })
    );

    let activeCard = this.state.activeCard;

    if (activeCard) {
      this.props.updateCard(this.props.cardId, activeCard);
    }
  }

  enterEditMode() {
    this.setState(prevState => ({
      ...prevState,
      editing: true
    }));
  }

  render() {
    return this.state.editing
      ? <EditableCardTitle
          title={this.props.title}
          onBlur={this.exitEditMode}
          setActiveCard={card => this.setState({ activeCard: card })}
        />
      : <CardTitle onClick={this.enterEditMode} title={this.props.title} />;
  }
}
