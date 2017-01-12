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
            }
        };

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
        this.handleBlur = this.handleBlur.bind(this);
        this.enterEditMode = this.enterEditMode.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    onDelete() {
        this.props.delete(this.props.cardId);
    }

    handleChange(event) {
        let search = event.target.value;
        let cards = this.fuse.search(search);
        let mark = { input: search.length, card: 0 };
        if (cards.length && this.state.mark.input < search.length) {
            let firstFuzzyCardTitle = _.head(cards).title;
            if (firstFuzzyCardTitle.toUpperCase().startsWith(search.toUpperCase())) {
                mark.input = search.length;
                mark.card = firstFuzzyCardTitle.length;
                search = firstFuzzyCardTitle;
            }
        }

        this.setState(prevState => Object.assign({}, prevState, {
            title: search,
            cards,
            mark
        }));
    }

    handleBlur() {
        this.setState(prevState => Object.assign({}, prevState, {
            editing: false
        }));
        this.props.updateTitle(this.props.cardId, this.state.title);
        // this.props.updateCard(this.props.cardId, this.state.card);
    }

    enterEditMode() {
        this.setState(prevState => Object.assign({}, prevState, {
            editing: true
        }));
    }

    handleKeyUp(event) {
        if (event.key === 'Enter') {
            this.handleBlur();
        }
    }

    renderCardTitle() {
        let title = this.state.title ? this.state.title : 'No title (click to edit)';
        let Title = styled.div`
            width: 100%;
        `;
        return (<Title onClick={this.enterEditMode}>{title}</Title>)
    }

    renderEditableCardTitle() {
        return (
            <div>
                <input
                    ref="titleEdit"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onKeyUp={this.handleKeyUp} />
                <ul>
                    {_.take(this.state.cards, 5).map(card => <li key={card.title}>{card.title}</li>)}
                </ul>
            </div>
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