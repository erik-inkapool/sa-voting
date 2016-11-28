import React, { Component } from 'react';
import styled from 'styled-components';
import { DangerButton } from './Buttons';

const CardContainer = styled.div`
    margin-top: 1em;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;

const ButtonContainer = styled.div`
    margin-left: 10px;
`;

export default class Card extends Component {
    constructor(props) {
        super(props);

        const name = props.title ? props.title : '';

        this.state = { name };

        this.handleChange = this.handleChange.bind(this);
    }

    onDelete() {
        this.props.onDelete(this.props.index);
    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    render() {
        const onDelete = this.onDelete.bind(this);

        return (
            <CardContainer>
                <input type="text" value={this.state.name} onChange={this.handleChange} />
                <ButtonContainer>
                    <DangerButton onClick={onDelete} center>Delete</DangerButton>
                </ButtonContainer>
            </CardContainer>
        )
    }
}