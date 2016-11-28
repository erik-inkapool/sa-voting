import React, { Component } from 'react';
import styled from 'styled-components';

const StyledButton = styled.a`
    display: inline-block;
    border: 2px solid white;
    border-radius: 10px;
    padding: 0.3em 0.5em;
    font-weight: bold;
`;

export class Button extends Component {
    render() {
        return (
            <StyledButton onClick={this.props.onClick} className={this.props.className}>{this.props.children}</StyledButton>
        );
    }
}

export const DangerButton = styled(Button)`
    background-color: rgba(255,0,0,0.5);
`;

export const SuccessButton = styled(Button)`
    background-color: rgba(0,255,0,0.5);
`;

export const PrimaryButton = styled(Button)`
    background-color: rgba(0,0,255,0.5);
`;