import React, { Component } from 'react';
import styled from 'styled-components';
import generateGuid from 'uuid/v4';
import _ from 'lodash'

import Title from './Title';
import Card from './Card';
import { PrimaryButton, SuccessButton } from './Buttons';
import { Container, ButtonContainer } from './Container';

export const AddAnotherButton = styled(PrimaryButton) `
    display: block;
    width: 100%;
    margin-top: 1em;
    text-align: center;
`;

const StartVoteButton = styled(SuccessButton) `
    display: block;
    text-align: center;
`;

export default class AddCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: []
        };
    }

    addCard() {
        this.setState(prevState => ({
            cards: prevState.cards.concat({
                id: generateGuid(),
                title: ''
            })
        }));
    }

    deleteCard(id) {
        this.setState(prevState => ({
            // get all cards that don't have same id
            cards: _.filter(prevState.cards, card => card.id !== id)
        }));
    }

    updateCardTitle(id, title) {
        this.setState(prevState => {
            const index = _.findIndex(prevState.cards, card => card.id === id);
            if (index === -1) {
                return Object.assign({}, prevState);
            }

            const newCard = Object.assign({}, prevState.cards[index]);
            newCard.title = title;
            const cards = prevState.cards.slice();
            cards[index] = newCard;

            return { cards };
        });
    }

    render() {
        const addCard = this.addCard.bind(this);

        let containerOffset = '0px';
        if (this.buttonContainer) {
            containerOffset = this.buttonContainer.offsetHeight + 'px';
        }

        const ModifiedContainer = styled(Container) `
            height: calc(100vh - ${containerOffset} - 0.5em);
            overflow-y: auto;
        `;

        const deleteCard = this.deleteCard.bind(this);
        const updateCardTitle = this.updateCardTitle.bind(this);

        const cards = this.state.cards.map((card, index) => {
            return <Card
                onDelete={deleteCard}
                updateTitle={updateCardTitle}
                key={card.id}
                cardId={card.id}
                title={card.title}
                />;
        });

        return (
            <div>
                <ModifiedContainer>
                    <Title>Select cards</Title>
                    {cards}
                    <AddAnotherButton onClick={addCard}>Add Another</AddAnotherButton>
                </ModifiedContainer>
                <ButtonContainer innerRef={buttonContainer => this.buttonContainer = buttonContainer}>
                    <StartVoteButton>Start voting</StartVoteButton>
                </ButtonContainer>
            </div>
        );
    }
}