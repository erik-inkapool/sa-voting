import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { SubTitle } from '../utility/titles';

const Margined = styled.div`margin-left: 10px;`;

const CardContainer = styled.div`margin-top: 1em;`;

const Card = ({
  options,
  title,
  id,
  updateVotes,
  deleteOption,
  updateOptionName,
  addOption
}) => {
  return (
    <CardContainer>
      <SubTitle>
        {title ? title : 'No title'}
      </SubTitle>
      {_.filter(options, option => option.votes > 0).map(option =>
        <Margined key={option.id}>
          {option.name} {option.votes}
        </Margined>
      )}
    </CardContainer>
  );
};

Card.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Card;
