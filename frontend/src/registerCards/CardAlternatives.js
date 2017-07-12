import React from 'react';
import styled from 'styled-components';

const ClickAbleAlternative = styled.a`display: block;`;

const AlternativesContainer = styled.ul`
  position: absolute;
  width: 100%;
  background: darkblue;
`;

const Alternative = styled.li`
  padding: 5px;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
  font-weight: ${props => (props.active ? 700 : 'inherit')};
  background: ${props => (props.active ? 'blue' : 'inherit')};
`;

const CardAlternatives = ({ handleCardClick, cardAlternatives, activeIndex }) =>
  <AlternativesContainer>
    {cardAlternatives.map((card, cardIndex) =>
      <Alternative active={cardIndex === activeIndex} key={card.title}>
        <ClickAbleAlternative
          onTouchStart={handleCardClick(cardIndex)}
          onMouseDown={handleCardClick(cardIndex)}
        >
          {card.title}
        </ClickAbleAlternative>
      </Alternative>
    )}
  </AlternativesContainer>;

export default CardAlternatives;
