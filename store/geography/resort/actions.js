
export default {
  async get ({ commit }, payload) {
    try {
      const data = await this.$axios.$get('/api/resorts', {})
      console.log(data.result)
      if (data.result) {
        commit('SET_RESORTS', data.result)
      }
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async getNames ({ commit }, payload) {
    try {
      const data = await this.$axios.$get(`/api/resorts?region_id=${payload}`, {})
      if (!data.result.length) {
        return []
      }
      return data.result
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async add ({ commit, dispatch }, payload) {
    try {
      await this.$axios.$post('/api/resorts', {
        region_id: payload.region_id,
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
      await this.$axios.$put(`/api/resorts/${payload.id}`, {
        region_id: payload.region_id
      })
      await dispatch('get')
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async deleteResort ({ commit, dispatch }, payload) {
    try {
      await this.$axios.$delete(`/api/resorts/${payload}`)
      await dispatch('get')
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  }
}
