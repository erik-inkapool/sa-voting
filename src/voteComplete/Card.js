import React, { PropTypes } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { SubTitle } from '../utility/titles';

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
                _.filter(options, option => option.votes > 0).map(option => <Margined key={option.id}>{option.name} {option.votes}</Margined>)
            }
        </CardContainer>
    );
}

Card.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default Card;