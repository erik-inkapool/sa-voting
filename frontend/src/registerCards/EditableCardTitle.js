import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import CardAlternatives from './CardAlternatives';
import cardSearch from './cardSearch';

const InputContainer = styled.div`position: relative;`;

export default class CardTitleHandler extends Component {
  constructor(props) {
    super(props);
    this.getCardAlternatives = this.getCardAlternatives.bind(this);

    this.state = {
      title: props.title,
      cardAlternatives: this.getCardAlternatives(props.title),
      index: 0
    };

    this.maxCards = 5;

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  getCardAlternatives(search) {
    const allCardAlternatives = cardSearch(search);
    return _.take(allCardAlternatives, this.maxCards);
  }

  handleChange(search) {
    const cardAlternatives = this.getCardAlternatives(search);

    const activeCard = cardAlternatives ? cardAlternatives[0] : null;
    if (activeCard) {
      this.props.setActiveCard(activeCard);
    }

    this.setState({
      title: search,
      cardAlternatives,
      index: 0
    });
  }

  moveIndex(step = 0) {
    this.setState(prevState => {
      return this.getStateWithNewIndex(prevState, prevState.index + step);
    });
  }

  setIndex(index = 0) {
    this.setState(prevState => this.getStateWithNewIndex(prevState, index));
  }

  getStateWithNewIndex(prevState, index) {
    let newIndex = index;
    if (newIndex < 0 || newIndex >= prevState.cardAlternatives.length) {
      newIndex = prevState.index;
    }

    let activeCard = prevState.cardAlternatives[newIndex];
    this.props.setActiveCard(activeCard);

    return {
      ...prevState,
      index: newIndex,
      title: activeCard.title
    };
  }

  handleKeyUp(event) {
    switch (event.key) {
      case 'Enter':
        this.props.onBlur();
        break;
      case 'ArrowDown':
        this.moveIndex(1);
        break;
      case 'ArrowUp':
        this.moveIndex(-1);
        break;
      default:
        // do nothing
        break;
    }
  }

  handleCardClick(index) {
    return () => this.setIndex(index);
  }

  componentDidUpdate() {
    if (this.refs.titleEdit) {
      this.refs.titleEdit.focus();
    }
  }

  componentDidMount() {
    if (this.refs.titleEdit) {
      this.refs.titleEdit.focus();
    }
  }

  render() {
    return (
      <InputContainer>
        <input
          ref="titleEdit"
          type="text"
          value={this.state.title}
          onChange={ev => this.handleChange(ev.target.value)}
          onBlur={this.props.onBlur}
          onKeyUp={this.handleKeyUp}
        />
        <CardAlternatives
          cardAlternatives={this.state.cardAlternatives}
          activeIndex={this.state.index}
          handleCardClick={this.handleCardClick}
        />
      </InputContainer>
    );
  }
}
