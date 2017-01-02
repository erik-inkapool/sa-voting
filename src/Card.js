import React, { Component } from 'react';
import styled from 'styled-components';
import { DangerButton } from './Buttons';

const CardContainer = styled.div`
    margin-top: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonContainer = styled.div`
    margin-left: 10px;
`;

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.titleInput.focus();
    }

    onDelete() {
        this.props.onDelete();
    }

    handleChange(event) {
        this.props.updateTitle(event.target.value);
    }

    render() {
        const onDelete = this.onDelete.bind(this);

        return (
            <CardContainer>
                <input
                    ref={input => this.titleInput = input}
                    type="text"
                    value={this.props.title}
                    onChange={this.handleChange} />
                <ButtonContainer>
                    <DangerButton onClick={onDelete} center>Delete</DangerButton>
                </ButtonContainer>
            </CardContainer>
        )
    }
}