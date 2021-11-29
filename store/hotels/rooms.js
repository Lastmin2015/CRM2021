export default {

  state: () => ({
    rooms: []
  }),

  getters: {
    rooms: state => state.rooms
  },

  mutations: {
    SET_ROOMS (state, payload) {
      state.rooms = payload
    }
  },

  actions: {
    async get ({ commit }) {
      try {

        const { result } = await this.$axios.$get('/api/room-types?with_data=true')
        commit('SET_ROOMS', result ?? [])

      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async add ({ dispatch }, { id, room }) {
      const { result: room_type_id } = await this.$axios.$post('/api/room-types', id)

      return dispatch("addName", {
        ...room,
        room_type_id
      })
    },

    async addName ({ dispatch }, payload) {
      await this.$axios.$post('/api/room-type-texts', payload)
      return dispatch("get")
    },

    async edit ({ dispatch }, { room: { id, body }, name }) {
      await this.$axios.$put(`/api/room-types/${id}`, body)
      return dispatch("editName", name)
    },

    async editName ({ dispatch }, { id, body }) {
      await this.$axios.$put(`/api/room-type-texts/${id}`, body)
      return dispatch('get')
    },

    async deleteRoom ({ dispatch }, { id, roomID }) {
      await this.$axios.$delete(`/api/room-types/${id}`)
      return dispatch('deleteRoomName', roomID)

    },

    async deleteRoomName ({ dispatch }, payload) {
      await this.$axios.$delete(`/api/room-type-texts/${payload}`)
      return dispatch('get')
    },
  }
}