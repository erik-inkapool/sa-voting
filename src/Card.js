import React, { Component } from 'react';
import styled from 'styled-components';
import { DangerButton } from './Buttons';

const CardContainer = styled.div`
    margin-top: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #fff;
    padding-bottom: 0.5em;
`;

const ButtonContainer = styled.div`
    margin-left: 10px;
`;

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            editing: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.enterEditMode = this.enterEditMode.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    onDelete() {
        this.props.onDelete(this.props.cardId);
    }

    handleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleBlur() {
        this.setState(prevState => ({
            title: prevState.title,
            editing: true
        }));
        setTimeout(() => this.props.updateTitle(this.props.cardId, this.state.title));
    }

    enterEditMode() {
        this.setState(prevState => ({
            title: prevState.title,
            editing: true
        }));
    }

    handleKeyUp(event) {
        if (event.key === 'Enter') {
            this.handleBlur();
        }
    }

    renderCardTitle() {
        let title = this.state.title ? this.state.title : 'No title (click to edit)';
        let Title = styled.div`
            width: 100%;
        `;
        return (<Title onClick={this.enterEditMode}>{title}</Title>)
    }

    renderEditableCardTitle() {
        return (
            <input
                ref="titleEdit"
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onKeyUp={this.handleKeyUp} />
        );
    }

    componentDidUpdate() {
        if (this.refs.titleEdit) {
            this.refs.titleEdit.focus();
        }
    }

    render() {
        const onDelete = this.onDelete.bind(this);

        var cardTitle = this.state.editing ? this.renderEditableCardTitle() : this.renderCardTitle();

        return (
            <CardContainer>
                {cardTitle}
                <ButtonContainer>
                    <DangerButton onClick={onDelete} center>Delete</DangerButton>
                </ButtonContainer>
            </CardContainer>
        )
    }
}