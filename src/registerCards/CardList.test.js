import React from 'react'
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { AddCardButton } from './CardList';
import Card from './Card';
import CardList from './CardList';

describe('Cardlist', () => {
    it('should have an "add card" button', () => {
        // ARRANGE
        var cardList = shallowCardList({})

        // ACT

        // ASSERT
        let addCardButton = cardList.find(AddCardButton);
        expect(addCardButton.length).toEqual(1);
    });

    it('should call addCard on "add card" click', () => {
        // ARRANGE
        const onAddSpy = spy();
        var cardList = shallowCardList({addCard: onAddSpy});
        let addCardButton = cardList.find(AddCardButton);

        // ACT
        addCardButton.simulate('click');

        // ASSERT
        expect(onAddSpy.called).toBeTruthy();
    });

    it('should render cards', () => {
        // ARRANGE
        var cards = [{ title: '', id: '' }];
        var cardList = shallowCardList({cards})

        // ACT
        let renderedCards = cardList.find(Card);

        // ASSERT
        expect(renderedCards.length).toEqual(1);
    });

    it('should render cards with titles', () => {
        // ARRANGE
        var expectedTitle = 'Test title';
        var cards = [{ title: expectedTitle, id: '' }];
        var cardList = shallowCardList({cards})

        // ACT
        let renderedCards = cardList.find(Card);

        // ASSERT
        expect(renderedCards.props().title).toEqual(expectedTitle);
    });

    const shallowCardList = ({cards=[], updateCardTitle=() => {}, deleteCard=() => {}, addCard=() => {}, startVote=() => {}}) => {
        return shallow(<CardList cards={cards} updateCardTitle={updateCardTitle} deleteCard={deleteCard} addCard={addCard} startVote={startVote} />);
    };
});