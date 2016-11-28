import React, { Component } from 'react';
import styled from 'styled-components';
import Title from './Title';
import Card from './Card';
import { PrimaryButton } from './Buttons';

const Container = styled.div`
    margin-left: 2.5vw;
    margin-right: 2.5vw;
`;

export const AddAnotherButton = styled(PrimaryButton)`
    display: block;
    width: 100%;
    margin-top: 1em;
    text-align: center;
`;

export default class AddCards extends Component {
    constructor(props) {
        super(props);

        this.state = { cards: [] };
    }

    addCard() {
        this.setState({
            cards: this.state.cards.concat({})   
        });
    }

    deleteCard(index) {
        var copy = this.state.cards.slice();
        copy.splice(index, 1);
        this.setState({
            cards: copy
        });
    }

    render() {
        const cards = this.state.cards.map((card, index) => {
            return <Card 
                index={index} 
                onDelete={this.deleteCard.bind(this)} 
                key={index} 
                title={card.title}
                />;
        });

        const addCard = this.addCard.bind(this);

        return (
            <Container>
                <Title>Select cards</Title>
                {cards}
                <AddAnotherButton onClick={addCard}>Add Another</AddAnotherButton>
            </Container>
        );
    }
}