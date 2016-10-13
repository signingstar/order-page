import reducer from '../../../src/customer/frontend/reducers/users'
import { expect } from 'chai';

describe('Reducer', function() {
  describe('#ADD_USER', () => {
    it('should return empty users objects', () => {
      let users = reducer(undefined, {type: 'ADD_USER'})
      expect(users).to.have.length(0)
    })

    it('should return user object of size 1', () => {
      let users = reducer(undefined, {type: 'ADD_USER', params: {email: 'test@user.com', role: 3}})
      expect(users).to.have.length(1)
      expect(users[0]).to.have.property('email')
      expect(users[0]).to.have.property('email').to.be.equal('test@user.com')
      expect(users[0]).to.have.property('role').to.be.equal(3)
    })

    it('should return user object of size 2', () => {
      let users = reducer(undefined, {type: 'ADD_USER', params: {email: 'test1@user.com', role: 3}})
      users = reducer(users, {type: 'ADD_USER', params: {email: 'test2@user.com', role: 1}})
      expect(users).to.have.length(2)
      expect(users[0]).to.have.property('email')
      expect(users[0]).to.have.property('email').to.be.equal('test1@user.com')
      expect(users[0]).to.have.property('role').to.be.equal(3)
      expect(users[1]).to.have.property('email')
      expect(users[1]).to.have.property('email').to.be.equal('test2@user.com')
      expect(users[1]).to.have.property('role').to.be.equal(1)
    })

    it('should override existing user', () => {
      let users = reducer(undefined, {type: 'ADD_USER', params: {email: 'test1@user.com', role: 3}})
      users = reducer(users, {type: 'ADD_USER', params: {email: 'test1@user.com', role: 1}})
      expect(users).to.have.length(1)
      expect(users[0]).to.have.property('email')
      expect(users[0]).to.have.property('email').to.be.equal('test1@user.com')
      expect(users[0]).to.have.property('role').to.be.equal(1)
    })
  })

  describe('#DELETE_USER', () => {
    it('should return empty users objects', () => {
      let users = reducer(undefined, {type: 'DELETE_USER'})
      expect(users).to.have.length(0)
    })

    it('should return user object of size 0', () => {
      let users = reducer(undefined, {type: 'DELETE_USER', params: {email: 'test@user.com'}})
      expect(users).to.have.length(0)
    })

    it('should return user object of size 1 when deleted non existing user', () => {
      let users = reducer(undefined, {type: 'ADD_USER', params: {email: 'test1@user.com', role: 3}})
      users = reducer(users, {type: 'DELETE_USER', params: {email: 'test2@user.com'}})
      expect(users).to.have.length(1)
      expect(users[0]).to.have.property('email')
      expect(users[0]).to.have.property('email').to.be.equal('test1@user.com')
      expect(users[0]).to.have.property('role').to.be.equal(3)
    })

    it('should delete existing user', () => {
      let users1 = reducer(undefined, {type: 'ADD_USER', params: {email: 'test1@user.com', role: 3}})
      let users2 = reducer(users1, {type: 'DELETE_USER', params: {email: 'test1@user.com'}})
      expect(users1).to.have.length(1)
      expect(users2).to.have.length(0)
    })
  })
})
