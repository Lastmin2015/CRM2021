export default {
  state: () => ({
    places: []
  }),
  getters: {
    places: state => state.places
  },
  mutations: {
    SET_PLACES (state, payload) {
      state.places = payload
    }
  },
  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/places?with_data=true')
        if (data.result) {
          commit('SET_PLACES', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },
    async add ({ dispatch }, payload) {
      try {
        await this.$axios.$post('/api/places', payload)
        await dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },
    async edit ({ dispatch }, payload) {
      try {
        await this.$axios.$put(`/api/places/${payload.id}`, payload.data)
        await dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },
    async deletePlace ({ dispatch }, payload) {
      try {
        await this.$axios.$delete(`/api/places/${payload}`)
        await dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    }
  },
}