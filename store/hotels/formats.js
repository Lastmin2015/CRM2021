export default {
  state: () => ({
    formats: []
  }),

  getters: {
    formats: state => state.formats
  },
  mutations: {
    SET_FORMATS (state, payload) {
      state.formats = payload
    }
  },
  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/hotel-formats?with_data=true')
        if (data.result) {
          commit('SET_FORMATS', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async getById (_, payload) {
      try {
        const data = await this.$axios.$get(`/api/hotel-formats/${payload}`)
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async edit ({ dispatch }, payload) {
      try {
        const data = await this.$axios.$put(`/api/hotel-formats/${payload.id}`)
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async add ({ commit, dispatch }, payload) {
      try {
        const format = await this.$axios.$post('/api/hotel-formats', payload.formatData)
        await this.$axios.$post('/api/hotel-format-names', {
          ...payload.formatNameData,
          hotel_format_id: format.result
        })
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async deleteFormat ({ dispatch }, payload) {
      try {
        await this.$axios.$delete(`/api/hotel-formats/${payload.format}`)
        await this.$axios.$delete(`/api/hotel-format-names/${payload.name}`)
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    }
  }
}