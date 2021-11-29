export default {
  state: () => ({
    types: []
  }),

  getters: {
    types: state => state.types
  },
  mutations: {
    SET_TYPES (state, payload) {
      state.types = payload
    }
  },
  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/hotel-types?with_data=true')
        if (data.result) {
          commit('SET_TYPES', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async getById (_, payload) {
      try {
        const data = await this.$axios.$get(`/api/hotel-types/${payload}`)
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async edit ({ dispatch }, payload) {
      try {
        const data = await this.$axios.$put(`/api/hotel-types/${payload.id}`, {
          name: payload.name
        })
        dispatch('get')
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async add ({ dispatch }, payload) {
      try {
        const type = await this.$axios.$post('/api/hotel-types', payload.typeData)
        await this.$axios.$post("/api/hotel-type-names", {
          ...payload.typeNameData,
          hotel_type_id: type.result
        })
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async deleteType ({ dispatch }, payload) {
      try {
        await this.$axios.$delete(`/api/hotel-types/${payload.type}`)
        await this.$axios.$delete(`/api/hotel-type-names/${payload.name}`)
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    }
  }
}