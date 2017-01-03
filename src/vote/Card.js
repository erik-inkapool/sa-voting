import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { SubTitle } from '../utility/titles';
import Option from './Option';

const FlexContainer = styled.div`
    margin-top: 0.5em;    
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Margined = styled.div`
    margin-left: 10px;
`;

const CardContainer = styled.div`
    margin-top: 1em;
`;

const ActionLink = styled.a`
    font-size: 3em;
    line-height: 0.6;
`;

const Card = ({options, title, id, updateVotes, deleteOption, updateOptionName, addOption}) => {
    const addOptionToCard = () => {
        addOption(id);
    }

    return (
        <CardContainer>
            <SubTitle>{title ? title : 'No title'}</SubTitle>
            {
                options.map(option => <Option
                    key={option.id}
                    id={option.id}
                    name={option.name}
                    votes={option.votes}
                    updateVotes={updateVotes}
                    deleteOption={deleteOption}
                    updateName={updateOptionName}
                    />)
            }
            <FlexContainer>
                <ActionLink onClick={addOptionToCard}>+</ActionLink> <Margined><a onClick={addOptionToCard}>Add option</a></Margined>
            </FlexContainer>
        </CardContainer>
    );
}

Card.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    updateVotes: PropTypes.func.isRequired,
    deleteOption: PropTypes.func.isRequired,
    updateOptionName: PropTypes.func.isRequired,
    addOption: PropTypes.func.isRequired
}

export default Card;