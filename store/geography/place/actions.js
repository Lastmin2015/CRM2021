
export default {
  async get ({ commit }, payload) {
    try {
      const data = await this.$axios.$get('/api/places', {})
      console.log(data.result)
      if (data.result) {
        commit('SET_PLACES', data.result)
      }
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async add ({ commit, dispatch }, payload) {
    try {
      await this.$axios.$post('/api/places', {
        resort_id: payload.resort_id,
        is_city: payload.is_city,
        show_in_filter: true,
        order: 0
      })
      await dispatch('get')
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async edit ({ commit, dispatch }, payload) {
    try {
      await this.$axios.$put(`/api/places/${payload.id}`, {
        is_city: payload.is_city,
        resort_id: payload.resort_id
      })
      await dispatch('get')
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async deletePlace ({ commit, dispatch }, payload) {
    try {
      await this.$axios.$delete(`/api/places/${payload}`)
      await dispatch('get')
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  }
}
