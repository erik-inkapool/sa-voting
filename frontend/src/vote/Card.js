import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { SubTitle } from '../utility/titles';
import Option from './Option';

const FlexContainer = styled.div`
  margin-top: 0.5em;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Margined = styled.div`margin-left: 10px;`;

const CardContainer = styled.div`margin-top: 1em;`;

const ActionLink = styled.a`
  font-size: 3em;
  line-height: 0.6;
`;

const EmphasisText = styled.span`
  font-weight: 700;
  font-size: 1.1em;
`;

const SligtlySmallerText = styled.p`font-size: 0.8em;`;

const Card = ({
  card,
  updateVotes,
  deleteOption,
  updateOptionName,
  addOption
}) => {
  let { options, title, id, elect, resolutions } = card;
  let canAdd = false;

  const addOptionToCard = () => {
    addOption(id);
  };

  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    let lowerCaseName = option.name.toLowerCase();
    if (lowerCaseName === 'for' || lowerCaseName === 'against') {
      if (elect) {
        option.deleted = true;
      }
    } else {
      if (elect) {
        canAdd = true;
      } else {
        option.deleted = true;
      }
    }
  }

  return (
    <CardContainer>
      <SubTitle>
        {title ? title : 'No title'}
      </SubTitle>
      <SligtlySmallerText>
        <EmphasisText>{elect ? elect : 'For'}:</EmphasisText> {resolutions.for}
      </SligtlySmallerText>
      {resolutions.against
        ? <SligtlySmallerText>
            <EmphasisText>Against:</EmphasisText> {resolutions.against}
          </SligtlySmallerText>
        : ''}
      {_.filter(options, option => !option.deleted).map(option =>
        <Option
          key={option.id}
          id={option.id}
          name={option.name}
          canBeDeleted={option.canBeDeleted}
          votes={option.votes}
          updateVotes={updateVotes}
          deleteOption={deleteOption}
          updateName={updateOptionName}
        />
      )}
      {canAdd
        ? <FlexContainer>
            <ActionLink onClick={addOptionToCard}>+</ActionLink>{' '}
            <Margined>
              <a onClick={addOptionToCard}>Add option</a>
            </Margined>
          </FlexContainer>
        : ''}
    </CardContainer>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }),
  updateVotes: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
  updateOptionName: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired
};

export default Card;
