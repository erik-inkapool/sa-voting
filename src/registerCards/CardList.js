import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Card from './Card';
import Title from '../utility/Title';
import { PrimaryButton, SuccessButton } from '../utility/Buttons';
import { Container, ButtonContainer } from '../utility/Container';

export const AddCardButton = styled(PrimaryButton)`
    display: block;
    width: 100%;
    margin-top: 1em;
    text-align: center;
`;

const AddCards = ({cards, updateCardTitle, deleteCard, addCard}) => {
    const StartVoteButton = styled(SuccessButton)`
        display: block;
        text-align: center;
   `;

    const Cards = cards.map((card, index) => {
        return <Card
            delete={deleteCard}
            updateTitle={updateCardTitle}
            key={card.id}
            cardId={card.id}
            title={card.title} />;
    });

    return (
        <div>
            <Container>
                <Title>Select cards</Title>
                {Cards}
                <AddCardButton onClick={addCard}>Add Another</AddCardButton>
            </Container>
            <ButtonContainer>
                <StartVoteButton>Start voting</StartVoteButton>
            </ButtonContainer>
        </div>
    );
};

AddCards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    updateCardTitle: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
}

export default AddCards;