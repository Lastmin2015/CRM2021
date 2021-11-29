export default {
  state: () => ({
    airports: []
  }),
  getters: {
    airports: state => state.airports
  },
  mutations: {
    SET_AIRPORTS (state, payload) {
      state.airports = payload
    }
  },
  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/airports?with_data=true')
        if (data.result) {
          commit('SET_AIRPORTS', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    // async getById ({ commit }, payload) {
    //   try {
    //     const data = await this.$axios.$get(`/api/airports/${payload}`)
    //     commit('SET_CURRENT_HOTEL', data.result)
    //     return data.result
    //   } catch (error) {
    //     throw error.response.data.error.message
    //   }
    // },

    async edit ({ dispatch }, payload) {
      try {
        const data = await this.$axios.$put(`/api/airports/${payload.id}`, payload.data)
        dispatch('get')
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async add ({ dispatch }, payload) {
      try {
        await this.$axios.$post('/api/airports', payload)
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async deleteAirport ({ dispatch }, payload) {
      try {
        await this.$axios.$delete(`/api/airports/${payload}`)
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    }
  },
}