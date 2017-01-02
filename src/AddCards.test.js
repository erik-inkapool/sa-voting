import React from 'react'
import { shallow } from 'enzyme';
import AddCards, { AddAnotherButton } from './AddCards';

describe('AddCards', () => {
    var addCards;

    beforeEach(() =>  {
        addCards = shallow(<AddCards />);
    });

    it('should start with no cards', () => {
        // ARRANGE

        // ACT

        // ASSERT
        let cards = addCards.find('Card'); 
        expect(cards.length).toEqual(0);
    });

    it('should have add button', () => {
        // ARRANGE

        // ACT
        let addAnother = addCards.find(AddAnotherButton);

        // ASSERT
        expect(addAnother.length).toEqual(1);
    });

    it('should add a specific card', () => {
        // ARRANGE

        // ACT
        addCards.find(AddAnotherButton).simulate('click')

        // ASSERT
        let card = addCards.find('Card');
        expect(card.length).toEqual(1);
        expect(card.prop('title')).toEqual('');
    });

    it('should pass down onDelete to card', () => {
        // ARRANGE
        var expectedCard = {};
        addCards.setState({
            cards: [{ id: 'testId' }]
        });
        
        // ACT
        let card = addCards.find('Card');

        // ASSERT
        expect(card.prop('onDelete')).toBeTruthy();
    });

    it('should delete a specific card', () => {
        // ARRANGE
        var expectedCard = {};
        addCards.setState({
            cards: [{ id: 'testId' }]
        });

        // ACT
        let card = addCards.find('Card');
        card.prop('onDelete')('testId');

        // ASSERT
        let cards = addCards.find('Card'); 
        expect(cards.length).toEqual(0);
    });
})