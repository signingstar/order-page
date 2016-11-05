import reducer from '../../../src/customer/frontend/reducers/images'
import { expect } from 'chai'

let state = { id_1: {album_id: "album_1", likes: 1, liked:[]}}
let state1, state2, state3

describe('Reducer', function() {
  describe('#CustomerImage', () => {
    it('should return empty users objects', () => {
      let images = reducer(undefined, {type: 'JUNK_TYPE'})
      expect(Object.keys(images)).to.have.length(0)
    })

    it('should update likes and liked entry', () => {
      let images = reducer(state, {type: 'UPDATE_REACTION', params: {id: "id_1", value: 0}})
      expect(images).to.have.property('id_1')
      expect(images.id_1).to.have.property('likes').to.be.equal(0)
      expect(images.id_1).to.have.property('liked').to.have.length(1)
      expect(images.id_1.liked[0]).deep.equal({name: 'You', reaction_type: 0})
    })

    it('should update likes and liked entry when multiple images are present', () => {
      let images = reducer(Object.assign({}, state, { id_2: {album_id: "album_2"}}), {type: 'UPDATE_REACTION', params: {id: "id_2", value: 2}})
      expect(images).to.have.property('id_2')
      expect(images.id_2).to.have.property('likes').to.be.equal(2)
      expect(images.id_2).to.have.property('liked').to.have.length(1)
      expect(images.id_2.liked[0]).deep.equal({name: 'You', reaction_type: 2})


      images = reducer(images, {type: 'UPDATE_REACTION', params: {id: "id_2", value: 1}})
      expect(images.id_2.liked[0]).deep.equal({name: 'You', reaction_type: 1})
    })

    it('should update likes and liked entry when image already liked by others', () => {
      let images = reducer({ id_1: {album_id: "album_1", liked:[{name: 'Anonym', reaction_type: 1}]}}, {type: 'UPDATE_REACTION', params: {id: "id_1", value: 2}})
      expect(images).to.have.property('id_1')
      expect(images.id_1).to.have.property('likes').to.be.equal(2)
      expect(images.id_1).to.have.property('liked').to.have.length(2)
      expect(images.id_1.liked[0]).deep.equal({name: 'Anonym', reaction_type: 1})
      expect(images.id_1.liked[1]).deep.equal({name: 'You', reaction_type: 2})

      images = reducer(images, {type: 'UPDATE_REACTION', params: {id: "id_1", value: 0}})
      expect(images.id_1.liked[1]).deep.equal({name: 'You', reaction_type: 0})
    })
  })
})
