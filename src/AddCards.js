import React, { Component } from 'react';
import styled from 'styled-components';
import generateGuid from 'uuid/v4';

import Title from './Title';
import Card from './Card';
import { PrimaryButton, SuccessButton } from './Buttons';
import { Container, ButtonContainer } from './Container';

export const AddAnotherButton = styled(PrimaryButton)`
    display: block;
    width: 100%;
    margin-top: 1em;
    text-align: center;
`;

const StartVoteButton = styled(SuccessButton)`
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

    deleteCard(index) {
        return () => {
            this.setState(prevState => {
                var copy = prevState.cards.slice();
                copy.splice(index, 1);
                return {
                    cards: copy
                }
            });
        }
    }

    updateTitle(index) {
        return (title) => {
            this.setState(prevState => {
                const oldCard = prevState.cards[index];
                const newCard = Object.assign({}, oldCard);
                newCard.title = title;
                const newCards = prevState.cards.slice();
                newCards[index] = newCard;

                return {
                    cards: newCards
                };
            });
        }
    }

    render() {
        const cards = this.state.cards.map((card, index) => {
            return <Card
                onDelete={this.deleteCard(index).bind(this)}
                updateTitle={this.updateTitle(index).bind(this)}
                key={card.id}
                title={card.title}
                />;
        });

        const addCard = this.addCard.bind(this);

        let containerOffset = '0px';
        if(this.buttonContainer) {
            containerOffset = this.buttonContainer.offsetHeight + 'px';
        }

        const ModifiedContainer = styled(Container)`
            height: calc(100vh - ${containerOffset} - 0.5em);
            overflow-y: auto;
        `;

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