import React from 'react'
import { shallow } from 'enzyme';
import Card from './Card';
import { DangerButton } from '../utility/Buttons';
import { spy } from 'sinon';

describe('Card', () => { 
    it('should have a delete button', () => {
        // ARRANGE
        var card = shallow(<Card />);

        // ACT
        // ASSERT
        let deleteButton = card.find(DangerButton); 
        expect(deleteButton.length).toEqual(1);
    });

    it('should call props.onDelete when delete button is clicked', () => {
        // ARRANGE
        const onDeleteSpy = spy();
        var card = shallow(<Card delete={onDeleteSpy} />);

        // ACT
        let deleteButton = card.find(DangerButton); 
        deleteButton.simulate('click');
        
        // ASSERT
        expect(onDeleteSpy.called).toBeTruthy();
    });
});