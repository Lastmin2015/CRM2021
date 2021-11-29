export default {
  state: () => ({
    chains: []
  }),

  getters: {
    chains: state => state.chains
  },
  mutations: {
    SET_CHAINS (state, payload) {
      state.chains = payload
    }
  },
  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/hotel-chains')
        if (data.result) {
          commit('SET_CHAINS', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async getById (_, payload) {
      try {
        const data = await this.$axios.$get(`/api/hotel-chains/${payload}`)
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async edit ({ dispatch }, payload) {
      try {
        const data = await this.$axios.$put(`/api/hotel-chains/${payload.id}`, {
          name: payload.name,
          show_in_filter: true,
          order: 0,
        })
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async add ({ dispatch }, payload) {
      try {
        await this.$axios.$post('/api/hotel-chains', payload)
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async deleteHotel ({ dispatch }, payload) {
      try {
        await this.$axios.$delete(`/api/hotel-chains/${payload}`)
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    }
  }
}