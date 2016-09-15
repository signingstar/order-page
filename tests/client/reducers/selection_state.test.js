import selectionState from '../../../src/frontend/reducers/selection_state';
import TypeState from '../../../src/frontend/reducers/category_state';
import { expect } from 'chai';

const defaultState = {
  files: [],
  updateComponents: []
}

describe('Reducer', function() {
  describe('#selectionState', () => {
      it('should return empty category objects', () => {
        let state = selectionState(defaultState, {type: 'RESET'});
        expect(state).to.have.property('updateComponents');
        expect(state).to.not.have.keys('size', 'material', 'quantity', 'coat', 'paper_quality');
      });

      it('should set type when state is empty', () => {
        let state = selectionState(defaultState, {type: 'SET_CATEGORY', category: 'mugs'});
        let typeState = TypeState(defaultState, {type: 'SET_CATEGORY', category: 'mugs'});
        expect(typeState).to.have.property('category').and.equal('mugs');
        expect(state).to.not.have.property('size');
      });

      it('should have all keys present when type is set', () => {
        let state = selectionState(defaultState, {type: 'SET_CATEGORY', category: 'mugs'});
        let typeState = TypeState({}, {type: 'SET_CATEGORY', category: 'mugs'});
        expect(state).to.have.all.keys('files', 'updateComponents');
        expect(typeState).to.have.all.keys('category');
      });

      it('should set size when state is empty', () => {
        let state = selectionState(defaultState, {type: 'SET_SIZE', value: 'axb'});
        expect(state).to.not.have.property('type');
        expect(state).to.have.property('size').and.equal('axb');
      });

      it('should set surface when state is not empty', () => {
        let state = selectionState({category: 'mugs', size: 'axb', files:[], updateComponents:[]}, {type: 'SET_SURFACE', value: 'paper'});
        let typeState = TypeState({category: 'mugs', updateComponents:[]}, {type: 'SET_SURFACE', value: 'paper'});
        expect(typeState).to.have.property('category').and.equal('mugs');
        expect(state).to.have.property('size').and.equal('axb');
        expect(state).to.have.property('material').and.equal('paper');
        expect(state).to.have.property('coat').to.be.undefined;
      });

      it('should set coating when state is not empty', () => {
        let state = selectionState({type: 'mugs', size: 'axb', material: 'paper', files:[], updateComponents:[]}, {type: 'SET_COATING', value: 'gloss'});
        let typeState = TypeState({type: 'mugs', updateComponents:[]}, {type: 'SET_SURFACE', value: 'paper'});
        expect(typeState).to.have.property('type').and.equal('mugs');
        expect(state).to.have.property('size').and.equal('axb');
        expect(state).to.have.property('material').and.equal('paper');
        expect(state).to.have.property('coat').and.equal('gloss');
      });

      it('should set size when state is not empty', () => {
        let state = selectionState({category: 'mugs', files:[], updateComponents:[]}, {type: 'SET_SIZE', value: 'axb'});
        expect(state).to.have.property('size').and.equal('axb');
      });

      it('should set quantity when state is not empty', () => {
        let state = selectionState({type: 'mugs', size: 'axb', files:[], updateComponents:[]}, {type: 'SET_QUANTITY', value: '100'});
        expect(state).to.have.property('type').and.equal('mugs');
        expect(state).to.have.property('size').and.equal('axb');
        expect(state).to.have.property('quantity').and.equal('100');
        expect(state).to.not.have.property('material');
      });

      it('should deep comparison pass', () => {
        let state = selectionState({type: 'mugs', size: 'axb', material: 'latex', files:[], updateComponents:[]}, {type: 'SET_QUANTITY', value: '100'});
        expect(state).to.deep.equal({type: 'mugs', size: 'axb', quantity: '100', material: 'latex', files: [], updateComponents: ['quantity']});
      });
  });
});
