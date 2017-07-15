import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  margin-top: 0.5em;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Margined = styled.div`margin-left: 10px;`;

const SmallInput = styled.input`width: 15%;`;

const DeletionActionLink = styled.a`
  position: relative;
  margin-left: 0.25em;
  top: -0.075em;
  font-size: 3em;
  margin-left: 0.25em;
  line-height: 0.6;
`;

const Option = ({
  name,
  id,
  votes,
  updateVotes,
  deleteOption,
  updateName,
  canBeDeleted
}) => {
  const updateNameHook = event => updateName(id, event.target.value);

  let option;
  if (name) {
    option = (
      <Margined>
        {name}
      </Margined>
    );
  } else {
    option = (
      <Margined>
        <input onBlur={updateNameHook} placeholder="Custom" />
      </Margined>
    );
  }

  const updateVote = event => updateVotes(id, +event.target.value);

  const deleteOptionHook = () => deleteOption(id);

  return (
    <FlexContainer>
      <SmallInput onChange={updateVote} value={votes} type="number" />
      {option}
      {canBeDeleted
        ? <DeletionActionLink onClick={deleteOptionHook}>
            &times;
          </DeletionActionLink>
        : ''}
    </FlexContainer>
  );
};

Option.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  updateVotes: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired
};

export default Option;
