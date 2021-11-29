export default {
  state: () => ({
    resorts: [],
    resortNames: []
  }),
  getters: {
    resorts: state => state.resorts,
    resortNames: state => state.resortNames
  },
  mutations: {
    SET_RESORTS (state, payload) {
      state.resorts = payload
    },
    SET_RESORT_NAMES (state, payload) {
      state.resortNames = payload
    }
  },
  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/resorts?with_data=true')
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
        const data = await this.$axios.$get('/api/resorts-names')
        if (data.result) {
          commit('SET_RESORT_NAMES', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },
    async add ({ dispatch }, payload) {
      try {
        const resort = await this.$axios.$post('/api/resorts', payload.resortData)
        console.log(resort);
        await this.$axios.$post('/api/resorts-names', {
          ...payload.resortNameData,
          resort_id: resort.result
        })
        await dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },
    async edit ({ dispatch, state }, payload) {
      try {
        await this.$axios.$put(`/api/resorts/${payload.resortNameData.resort_id}`, payload.resortData)
        if (state.resortNames.length) {
          if (state.resortNames.some(name => name.resort_id === payload.resortNameData.resort_id)) {
            let resort = state.resortNames.find(name => name.resort_id === payload.resortNameData.resort_id)
            await this.$axios.$put(`/api/resorts-names/${resort.id}`, payload.resortNameData)
          } else {
            await this.$axios.$post('/api/resorts-names', payload.resortNameData)
          }
        } else {
          await this.$axios.$post('/api/resorts-names', payload.resortNameData)
        }
        await dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },
    async deleteResort ({ dispatch, state }, payload) {
      try {
        await this.$axios.$delete(`/api/resorts/${payload.resortID}`)
        if (payload.resortNameID) {
          await this.$axios.$delete(`/api/resorts-names/${payload.resortNameID}`)
        }
        await dispatch('get')
        await dispatch('getNames')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    }
  },
}