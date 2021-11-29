export default {
  state: () => ({
    regions: [],
    regionsNames: []
  }),
  getters: {
    regions: state => state.regions,
    regionsNames: state => state.regionsNames,
  },
  mutations: {
    SET_REGIONS (state, payload) {
      state.regions = payload
      console.log(state.regions, "STORE REGIONS");
    },
    SET_REGIONS_NAMES (state, payload) {
      state.regionsNames = payload
    }
  },
  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/regions?with_data=true')
        if (data.result) {
          commit('SET_REGIONS', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async getNames ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/regions-names')
        if (!data.result.length) {
          return []
        }
        commit('SET_REGIONS_NAMES', data.result)
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async add ({ dispatch }, payload) {
      try {
        const region = await this.$axios.$post('/api/regions', payload)
        await this.$axios.$post('/api/regions-names', {
          name: payload.name,
          locale: "en",
          region_id: region.result.id,
        })
        await dispatch('get')
        await dispatch('getNames')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async edit ({ dispatch }, payload) {
      try {
        await this.$axios.$put(`/api/regions/${payload.idRegion}`, payload.dataRegion)
        await this.$axios.$put(`/api/regions-names/${payload.idRegionName}`, payload.dataRegionName)
        await dispatch('get')
        await dispatch('getNames')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async deleteRegion ({ dispatch }, payload) {
      try {
        await this.$axios.$delete(`/api/regions/${payload.regionID}`)
        await this.$axios.$delete(`/api/regions-names/${payload.regionNameID}`)
        await dispatch('get')
        await dispatch('getNames')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    }
  },
}