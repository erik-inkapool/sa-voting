import React from 'react';
import styled from 'styled-components';

import CardTitleHandler from './CardTitleHandler';
import { DangerButton } from '../utility/Buttons';

const CardContainer = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #fff;
  padding-bottom: 0.5em;
`;

const ButtonContainer = styled.div`margin-left: 10px;`;

const Card = ({ deleteCard, title, updateCard, cardId }) =>
  <CardContainer>
    <CardTitleHandler cardId={cardId} title={title} updateCard={updateCard} />
    <ButtonContainer>
      <DangerButton onClick={deleteCard} center>
        Delete
      </DangerButton>
    </ButtonContainer>
  </CardContainer>;

export default Card;
