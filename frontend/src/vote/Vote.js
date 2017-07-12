import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Title from '../utility/titles';
import { SuccessButton } from '../utility/Buttons';
import { Container, ButtonContainer } from '../utility/Container';
import Card from './Card';

const Vote = ({
  cards,
  updateVotes,
  deleteOption,
  updateOptionName,
  addOption,
  totalVotes,
  finish
}) => {
  const VoteButton = styled(SuccessButton)`
        display: block;
        text-align: center;
        background-color: green;
   `;

  return (
    <div>
      <Container>
        <Title>Cast your votes</Title>
        {cards.map(card =>
          <Card
            key={card.id}
            card={card}
            updateVotes={updateVotes}
            deleteOption={deleteOption}
            updateOptionName={updateOptionName}
            addOption={addOption}
          />
        )}
      </Container>
      <ButtonContainer>
        <VoteButton onClick={finish}>
          Vote ({totalVotes} total)
        </VoteButton>
      </ButtonContainer>
    </div>
  );
};

Vote.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
  updateVotes: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
  updateOptionName: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
  totalVotes: PropTypes.number.isRequired,
  finish: PropTypes.func.isRequired
};

export default Vote;
