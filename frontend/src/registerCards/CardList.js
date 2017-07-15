import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Card from './Card';
import Title from '../utility/titles';
import { PrimaryButton, SuccessButton, Button } from '../utility/Buttons';
import { Container, ButtonContainer } from '../utility/Container';

export const AddCardButton = styled(PrimaryButton)`
    display: block;
    width: 100%;
    margin-top: 1em;
    text-align: center;
`;

const StartVoteButton = styled(SuccessButton)`
    display: block;
    text-align: center;
    margin-bottom: 20px;
`;

const ResetButton = styled(Button)`
    display: block;
    text-align: center;
`;

const CardList = ({
  cards,
  updateCardTitle,
  deleteCard,
  addCard,
  startVote,
  reset,
  updateCard
}) => {
  const Cards = cards.map((card, index) => {
    return (
      <Card
        deleteCard={() => deleteCard(card.id)}
        updateTitle={updateCardTitle}
        updateCard={updateCard}
        key={card.id}
        cardId={card.id}
        title={card.title}
      />
    );
  });

  return (
    <div>
      <Container>
        <Title>Select cards</Title>
        {Cards}
        <AddCardButton onClick={addCard}>Add Another</AddCardButton>
      </Container>
      <ButtonContainer>
        <StartVoteButton onClick={startVote}>Start voting</StartVoteButton>
        <ResetButton onClick={reset}>Reset</ResetButton>
      </ButtonContainer>
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  updateCardTitle: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  startVote: PropTypes.func.isRequired
};

export default CardList;
