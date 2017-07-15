import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Title from '../utility/titles';
import { SuccessButton, PrimaryButton } from '../utility/Buttons';
import { Container, ButtonContainer } from '../utility/Container';
import Card from './Card';

const EditButton = styled(PrimaryButton)`
        display: block;
        text-align: center;
        margin-bottom: 20px;
   `;

const FinishButton = styled(SuccessButton)`
        display: block;
        text-align: center;
   `;

const VoteReview = ({
  cards,
  updateVotes,
  deleteOption,
  updateOptionName,
  addOption,
  totalVotes,
  edit,
  finish
}) => {
  const shownCards = cards.filter(card =>
    _.some(card.options, o => o.votes > 0)
  );

  return (
    <div>
      <Container>
        <Title>Your votes:</Title>
        {shownCards.map(card =>
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            options={card.options}
          />
        )}
      </Container>
      <ButtonContainer>
        <EditButton onClick={edit}>
          Edit ({totalVotes} votes total)
        </EditButton>
        <FinishButton onClick={finish}>
          Finish voting and view results
        </FinishButton>
      </ButtonContainer>
    </div>
  );
};

VoteReview.propTypes = {
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

export default VoteReview;
