import React from 'react'
import { shallow } from 'enzyme';
import AddCards, { AddAnotherButton } from './AddCards';

describe('AddCards', () => {

    it('should start with no cards', () => {
        // ARRANGE
        var addCards = shallow(<AddCards />);

        // ACT
        // ASSERT
        let cards = addCards.find('Card'); 
        expect(cards.length).toEqual(0);
    });

    it('should have add button', () => {
        // ARRANGE
        var addCards = shallow(<AddCards />);

        // ACT
        let addAnother = addCards.find(AddAnotherButton);

        // ASSERT
        expect(addAnother.length).toEqual(1);
    });

    it('should add a specific card', () => {
        // ARRANGE
        var expectedCard = {};
        var addCards = shallow(<AddCards />);

        // ACT
        addCards.find(AddAnotherButton).simulate('click')

        // ASSERT
        let card = addCards.find('Card');
        expect(card.length).toEqual(1);
        expect(card.prop('title')).toEqual(undefined);
    });

    it('should pass down onDelete to card', () => {
        // ARRANGE
        var expectedCard = {};
        var addCards = shallow(<AddCards />);
        addCards.setState({
            cards: [{}]
        });
        
        // ACT
        let card = addCards.find('Card');

        // ASSERT
        expect(card.prop('onDelete')).toBeTruthy();
    });

    it('should delete a specific card', () => {
        // ARRANGE
        var expectedCard = {};
        var addCards = shallow(<AddCards />);
        addCards.setState({
            cards: [{}]
        });

        // ACT
        let card = addCards.find('Card');
        card.prop('onDelete')(card.prop('index'));

        // ASSERT
        let cards = addCards.find('Card'); 
        expect(cards.length).toEqual(0);
    });
})