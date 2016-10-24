import reducer from '../../../src/frontend/reducers/order'
import { expect } from 'chai'

let images = [{size: 100, name: 'a1'}, {size: 150, name: 'a2'}]
let state1, state2, state3

describe('Reducer', function() {
  describe('#Order', () => {
    it('should return empty order object', () => {
      let order = reducer(undefined, {type: 'JUNK_TYPE'})
      expect(Object.keys(order)).to.have.length(1)
    })

    it('should return order object with product set', () => {
      state1 = reducer(undefined, {type: 'SET_PRODUCT', params: {key: 12, value: 'Ultimate Designing'}})
      expect(state1).to.have.property('product').to.have.property('key')
      expect(state1).to.have.property('product').deep.equals({key: 12, value: 'Ultimate Designing'})
    })

    it('should return order object with order id', () => {
      state2 = reducer(state1, {type: 'UPDATE_ORDER', params: {orderData: {order_id: 123}}})
      expect(state2).to.have.property('order_id').to.be.equal(123)
      expect(state2).to.have.property('customer').to.have.property('dirty').to.be.equal(false)
    })

    it('should return order object with customer details', () => {
      let order = reducer(state2, {type: 'UPDATE_CUSTOMER_DETAILS', params: {key: 'first_name', value: 'Test me'}})
      order = reducer(order, {type: 'UPDATE_CUSTOMER_DETAILS', params: {key: 'email', value: 'haha@hihi.com'}})
      expect(order).to.have.property('customer').to.have.property('dirty').to.be.equal(true)
      expect(order).to.have.property('customer').to.have.property('email').to.be.equal('haha@hihi.com')
    })

    it('should return order object with customer details', () => {
      let order = reducer(state2, {type: 'RESET_PRODUCT'})
      expect(order).to.have.property('product').to.not.have.property('key')
    })

    it('should update order object with params', () => {
      let order = reducer(state2, {type: 'SET_ORDER_PARAM', params: {name: 'My Order'}})
      expect(order).to.have.property('name').to.be.equal('My Order')

      order = reducer(order, {type: 'SET_ORDER_PARAM', params: {category: 'husbandnwife'}})
      expect(order).to.have.property('category').to.be.equal('husbandnwife')
    })
  })
})
