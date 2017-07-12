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
  edit
}) => {
  const VoteButton = styled(SuccessButton)`
        display: block;
        text-align: center;
   `;

  return (
    <div>
      <Container>
        <Title>Your votes:</Title>
        {cards.map(card =>
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            options={card.options}
          />
        )}
      </Container>
      <ButtonContainer>
        <VoteButton onClick={edit}>
          Edit ({totalVotes} total)
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
  ).isRequired
};

export default Vote;
