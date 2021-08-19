
export default {
  async get ({ commit }) {
    try {
      const data = await this.$axios.$get('/api/hotels')
      if (data.result) {
        commit('SET_HOTELS', data.result)
      }
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },

  async getById (_, payload) {
    try {
      const data = await this.$axios.$get(`/api/hotels/${payload}`)
      return data.result
    } catch (error) {
      throw error.response.data.error.message
    }
  },

  async edit ({ dispatch }, payload) {
    try {
      const data = await this.$axios.$put(`/api/hotels/${payload}`)
      return data.result
    } catch (error) {
      throw error.response.data.error.message
    }
  },

  async add ({ commit, dispatch, rootState }, payload) {
    try {
      const data = await this.$axios.$post('/api/hotels', payload)
      if (data.result) {
        commit('SET_HOTELS', data.result)
      }
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },

  async deleteHotel ({ dispatch }, payload) {
    try {
      await this.$axios.$delete(`/api/hotels/${payload}`)
      dispatch('get')
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  }
}
