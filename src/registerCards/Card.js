import React, { Component } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import _ from 'lodash';

import { DangerButton } from '../utility/Buttons';
import selectInInput from '../utility/selectInInput';
import politicalCardData from '../data/political-cards.json'

const CardContainer = styled.div`
    margin-top: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #fff;
    padding-bottom: 0.5em;
`;

const ButtonContainer = styled.div`
    margin-left: 10px;
`;

const ClickAbleAlternative = styled.a`
    display: block;
`

const AlternativesContainer = styled.ul`
    position: absolute;
    width: 100%;
    background: darkblue;
`

const InputContainer = styled.div`
    position: relative;
`

const Alternative = styled.li`
    padding: 5px;
    border-bottom: 1px solid white;
    border-left: 1px solid white;
    border-right: 1px solid white;
    font-weight: ${ props => props.active ? 700 : 'inherit'};
    background: ${ props => props.active ? 'blue' : 'inherit'};
`

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            editing: false,
            cards: [],
            mark: {
                input: 0,
                card: 0
            },
            index: 0
        };

        this.maxCards = 5;

        this.fuse = new Fuse(politicalCardData, {
            keys: [{
                name: "title",
                weight: 0.7
            },
            {
                name: "elect",
                weight: 0.1
            },
            {
                name: "resolution.for",
                weight: 0.1
            },
            {
                name: "resolution.against",
                weight: 0.1
            }]
        });

        this.handleChange = this.handleChange.bind(this);
        this.exitEditMode = this.exitEditMode.bind(this);
        this.enterEditMode = this.enterEditMode.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
    }

    onDelete() {
        this.props.delete(this.props.cardId);
    }

    handleChange(event) {
        let search = event.target.value;
        let cards = this.fuse.search(search);
        let mark = { input: search.length, card: 0 };

        this.setState(prevState => {
            if (cards.length && prevState.mark.input < search.length) {
                let firstFuzzyCardTitle = _.head(cards).title;
                if (firstFuzzyCardTitle.toUpperCase().startsWith(search.toUpperCase())) {
                    mark.input = search.length;
                    mark.card = firstFuzzyCardTitle.length;
                    search = firstFuzzyCardTitle;
                }
            }

            return Object.assign({}, prevState, {
                title: search,
                cards,
                mark,
                index: 0
            });
        });
    }

    exitEditMode() {
        this.setState(prevState => Object.assign({}, prevState, {
            editing: false
        }));

        let activeCard = this.state.cards.length > this.state.index ? this.state.cards[this.state.index] : null;
        console.log(activeCard);
        console.log(this.state.title);
        console.log(activeCard.title);
        if (activeCard && activeCard.title.toUpperCase() === this.state.title.toUpperCase()) {
            this.props.updateCard(this.props.cardId, Object.assign({}, activeCard, { title: this.state.title }));
        } else {
            this.props.updateTitle(this.props.cardId, this.state.title);
        }

    }

    enterEditMode() {
        this.setState(prevState => Object.assign({}, prevState, {
            editing: true,
            mark: { input: 0, card: prevState.title.length },
            cards: this.fuse.search(prevState.title),
            index: 0
        }));
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
        if (newIndex < 0 || newIndex >= Math.min(prevState.cards.length, this.maxCards)) {
            newIndex = prevState.index;
        }

        let activeCard = prevState.cards[newIndex];
        let mark = prevState.mark;
        if (newIndex !== prevState.index) {
            mark = {
                input: 0,
                card: activeCard ? activeCard.title.length : 0
            }
        }

        return Object.assign({}, prevState, {
            index: newIndex,
            title: activeCard.title,
            mark
        });
    }

    handleKeyUp(event) {
        if (this.state.editing) {
            switch (event.key) {
                case 'Enter':
                    this.exitEditMode();
                    break;
                case 'ArrowDown':
                    this.moveIndex(1);
                    break;
                case 'ArrowUp':
                    this.moveIndex(-1);
                    break;
            }
        }
    }

    handleCardClick(index) {
        return () => this.setIndex(index);
    }

    renderCardTitle() {
        let title = this.state.title ? this.state.title : 'No title (click to edit)';
        let Title = styled.div`
            width: 100%;
        `;
        return (<Title onClick={this.enterEditMode}>{title}</Title>)
    }

    renderEditableCardTitle() {
        var activeCardAlternatives = _.take(this.state.cards, this.maxCards);
        var cardAlternatives = activeCardAlternatives.map((card, cardIndex) =>
            <Alternative active={this.state.index === cardIndex} key={card.title}>
                <ClickAbleAlternative onTouchStart={this.handleCardClick(cardIndex)} onMouseDown={this.handleCardClick(cardIndex)}>{card.title}</ClickAbleAlternative>
            </Alternative>);

        return (
            <InputContainer>
                <input
                    ref="titleEdit"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                    onBlur={this.exitEditMode}
                    onKeyUp={this.handleKeyUp} />
                {cardAlternatives.length ? <AlternativesContainer>{cardAlternatives}</AlternativesContainer> : ''}
            </InputContainer>
        );
    }

    componentDidUpdate() {
        if (this.state.editing && this.refs.titleEdit) {
            let card = _.head(this.state.cards);
            if (card && this.state.mark.card > 0) {
                selectInInput(this.refs.titleEdit, this.state.mark.input, this.state.mark.card);
            } else {
                this.refs.titleEdit.focus();
            }
        }
    }

    render() {
        const onDelete = this.onDelete.bind(this);

        var cardTitle = this.state.editing ? this.renderEditableCardTitle() : this.renderCardTitle();

        return (
            <CardContainer>
                {cardTitle}
                <ButtonContainer>
                    <DangerButton onClick={onDelete} center>Delete</DangerButton>
                </ButtonContainer>
            </CardContainer>
        )
    }
}