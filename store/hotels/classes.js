export default {
  state: () => ({
    classes: []
  }),

  getters: {
    classes: state => state.classes
  },
  mutations: {
    SET_CLASS (state, payload) {
      state.classes = payload
    }
  },
  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/hotel-classes')
        if (data.result) {
          commit('SET_CLASS', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async getById (_, payload) {
      try {
        const data = await this.$axios.$get(`/api/hotel-classes/${payload}`)
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async edit ({ dispatch }, payload) {
      try {
        const data = await this.$axios.$put(`/api/hotel-classes/${payload.id}`)
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async add ({ commit, dispatch }, payload) {
      try {
        await this.$axios.$post('/api/hotel-classes', {
          name: payload.name,
          show_in_filter: true,
          order: 0,
        })
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async deleteClass ({ dispatch }, payload) {
      try {
        await this.$axios.$delete(`/api/hotel-classes/${payload}`)
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    }
  }
}