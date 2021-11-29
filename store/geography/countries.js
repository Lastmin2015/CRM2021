export default {
  state: () => ({
    countries: [],
    countryNames: [],
  }),
  getters: {
    countries: state => state.countries,
    countryNames: state => state.countryNames
  },
  mutations: {
    SET_COUNTRIES (state, payload) {
      state.countries = payload
    },
    SET_COUNTRY_NAMES (state, payload) {
      state.countryNames = payload
    },
  },
  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/countries?with_data=true')
        if (data.result) {
          commit('SET_COUNTRIES', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async getNames ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/countries-names')
        if (data.result) {
          commit('SET_COUNTRY_NAMES', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async add ({ dispatch }, payload) {
      try {
        const country = await this.$axios.$post('/api/countries', payload.countryData)
        await this.$axios.$post('/api/countries-names', {
          ...payload.countryNameData,
          country_id: country.result.id
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
        await this.$axios.$put(`/api/countries-names/${payload.id}`, payload.data)
        await dispatch('get')
        await dispatch('getNames')
        await dispatch('geography/regions/get', {}, { root: true })
        await dispatch('geography/regions/getNames', {}, { root: true })
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async deleteCountry ({ dispatch }, payload) {
      try {
        await this.$axios.$delete(`/api/countries/${payload.countryID}`)
        await this.$axios.$delete(`/api/countries-names/${payload.countryNameID}`)
        await dispatch('get')
        await dispatch('getNames')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    }
  },
}