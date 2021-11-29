export default {
  state: () => ({
    beaches: []
  }),

  getters: {
    beaches: state => state.beaches
  },
  mutations: {
    SET_BEACHES (state, payload) {
      state.beaches = payload
    }
  },
  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/beach-types?with_data=true')
        if (data.result) {
          commit('SET_BEACHES', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async getById (_, payload) {
      try {
        const data = await this.$axios.$get(`/api/beach-types/${payload}`)
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async edit ({ dispatch }, payload) {
      try {
        const data = await this.$axios.$put(`/api/beach-types/${payload.id}`, {
           name: payload.name
        })
        dispatch('get')
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async add ({ commit, dispatch, rootState }, payload) {
      try {
        await this.$axios.$post('/api/beach-types', payload)
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async deleteHotel ({ dispatch }, payload) {
      try {
        await this.$axios.$delete(`/api/beach-types/${payload}`)
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    }
  }
}