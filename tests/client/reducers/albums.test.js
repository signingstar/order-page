import reducer from '../../../src/frontend/reducers/albums'
import { expect } from 'chai'

let state = { id_1: {name: "name_1", priority: 5}}
let images = [{size: 100, name: 'a1'}, {size: 150, name: 'a2'}]
let state1, state2, state3

describe('Reducer', function() {
  describe('#Image', () => {
    it('should return empty users objects', () => {
      let image = reducer(undefined, {type: 'JUNK_TYPE'})
      expect(Object.keys(image)).to.have.length(0)
    })

    it('should return default image object from update order', () => {
      let image = reducer(undefined, {type: 'UPDATE_ORDER', params: {albumData: {id: "id_1", name: state.id_1.name, priority: state.id_1.priority}}})
      expect(image).to.have.property('id_1')
      expect(image).to.have.property('id_1').deep.equals({name: "name_1", priority: 5})
    })

    it('should add new album', () => {
      state1 = reducer(state, {type: 'ADD_ALBUM', params: {id: "id_2", name: "name_2", priority: 10}})
      state1 = reducer(state1, {type: 'ADD_ALBUM', params: {id: "id_3", name: "name_3", priority: 15}})
      expect(state1).to.have.property('id_1')
      expect(state1.id_1).deep.equals({name: "name_1", priority: 5})

      expect(state1).to.have.property('id_2')
      expect(state1.id_2).deep.equals({name: "name_2", priority: 10})
      expect(state1.id_3).deep.equals({name: "name_3", priority: 15})
    })

    it('should remove an album', () => {
      state1 = reducer(state1, {type: 'REMOVE_ALBUM', params: 'id_2'})

      expect(state1).to.have.property('id_1')
      expect(state1).to.not.have.property('id_2')
      expect(state1).to.have.property('id_3')
    })

    it('should set images', () => {
      state2 = reducer(state1, {type: 'SET_IMAGES', params: {albumId: 'id_1', images}})

      expect(state2.id_1).to.have.property('files').to.have.length(2)
      expect(state2.id_1).to.have.property('queued').to.be.equal(2)
      expect(state2.id_1).to.have.property('uploaded').to.be.equal(0)
      expect(state2.id_1).to.have.property('queuedSize').to.be.equal(250)
      expect(state2.id_1).to.have.property('uploadedSize').to.be.equal(0)
    })

    it('should set more images', () => {
      let images2 = [{size: 100, name: 'a3'}, {size: 150, name: 'a4'}]
      state2 = reducer(state2, {type: 'SET_IMAGES', params: {albumId: 'id_1', images: images2}})

      expect(state2.id_1).to.have.property('files').to.have.length(4)
      expect(state2.id_1).to.have.property('queued').to.be.equal(4)
      expect(state2.id_1).to.have.property('uploaded').to.be.equal(0)
      expect(state2.id_1).to.have.property('queuedSize').to.be.equal(500)
      expect(state2.id_1).to.have.property('uploadedSize').to.be.equal(0)
    })

    it('should remove an image', () => {
      state2 = reducer(state2, {type: 'REMOVE_IMAGE', params: {albumId: 'id_1', image: {name: 'a2', size: 150}}})

      expect(state2.id_1).to.have.property('files').to.have.length(3)
      expect(state2.id_1).to.have.property('queued').to.be.equal(3)
      expect(state2.id_1).to.have.property('uploaded').to.be.equal(0)
      expect(state2.id_1).to.have.property('queuedSize').to.be.equal(350)
      expect(state2.id_1).to.have.property('uploadedSize').to.be.equal(0)
    })

    it('should set images to another album', () => {
      state3 = reducer(state1, {type: 'SET_IMAGES', params: {albumId: 'id_3', images}})

      expect(state3.id_3).to.have.property('files').to.have.length(2)
      expect(state3.id_3).to.have.property('queued').to.be.equal(2)
      expect(state3.id_3).to.have.property('uploaded').to.be.equal(0)
      expect(state3.id_3).to.have.property('queuedSize').to.be.equal(250)
      expect(state3.id_3).to.have.property('uploadedSize').to.be.equal(0)
    })

    it('should remove an image from another album', () => {
      state3 = reducer(state3, {type: 'REMOVE_IMAGE', params: {albumId: 'id_3', image: {name: 'a1', size: 100}}})

      expect(state3.id_3).to.have.property('files').to.have.length(1)
      expect(state3.id_3).to.have.property('queued').to.be.equal(1)
      expect(state3.id_3).to.have.property('uploaded').to.be.equal(0)
      expect(state3.id_3).to.have.property('queuedSize').to.be.equal(150)
      expect(state3.id_3).to.have.property('uploadedSize').to.be.equal(0)
    })

    it('should update state after uploading photos', () => {
      state2 = reducer(state2, {type: 'SET_IMAGE_UPLOADED', params: 'id_1'})

      expect(state2.id_1).to.have.property('files').to.have.length(3)
      expect(state2.id_1).to.have.property('queued').to.be.equal(0)
      expect(state2.id_1).to.have.property('uploaded').to.be.equal(3)
      expect(state2.id_1).to.have.property('queuedSize').to.be.equal(0)
      expect(state2.id_1).to.have.property('uploadedSize').to.be.equal(350)
    })

    it('should add and upload images 2nd time', () => {
      let images3 = [{size: 200, name: 'a5'}, {size: 250, name: 'a6'}]
      state2 = reducer(state2, {type: 'SET_IMAGES', params: {albumId: 'id_1', images: images3}})

      expect(state2.id_1).to.have.property('files').to.have.length(5)
      expect(state2.id_1).to.have.property('queued').to.be.equal(2)
      expect(state2.id_1).to.have.property('uploaded').to.be.equal(3)
      expect(state2.id_1).to.have.property('queuedSize').to.be.equal(450)
      expect(state2.id_1).to.have.property('uploadedSize').to.be.equal(350)

      state3 = reducer(state2, {type: 'SET_IMAGE_UPLOADED', params: 'id_1'})

      expect(state3.id_1).to.have.property('files').to.have.length(5)
      expect(state3.id_1).to.have.property('queued').to.be.equal(0)
      expect(state3.id_1).to.have.property('uploaded').to.be.equal(5)
      expect(state3.id_1).to.have.property('queuedSize').to.be.equal(0)
      expect(state3.id_1).to.have.property('uploadedSize').to.be.equal(800)
    })

  })
})
