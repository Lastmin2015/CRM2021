
export default {
  async get ({ commit }, payload) {
    try {
      const data = await this.$axios.$get('/api/countries?with_name=true', {})
      console.log(data.result)
      if (data.result) {
        commit('SET_COUNTRY', data.result)
      }
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async getNames ({ commit }, payload) {
    try {
      const data = await this.$axios.$get(`/api/countries-names?country_id=${payload}`, {})
      return data.result
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async add ({ commit, dispatch }, payload) {
    try {
      const country = await this.$axios.$post('/api/countries', {
        show_in_filter: true,
        order: 0
      })
      for (const locale of payload) {
        await this.$axios.$post('/api/countries-names', {
          name: locale.name,
          locale: locale.locale,
          country_id: country.result.id
        })
      }
      await dispatch('get')
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async edit ({ commit, dispatch }, payload) {
    try {
      for (const locale of payload.names) {
        if (!locale.new) {
          await this.$axios.$put(`/api/countries-names/${locale.id}`, {
            name: locale.name,
            locale: locale.locale,
            country_id: payload.id
          })
        } else {
          await this.$axios.$post('/api/countries-names', {
            name: locale.name,
            locale: locale.locale,
            country_id: payload.id
          })
        }
      }
      await dispatch('get')
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async deleteCountry ({ commit, dispatch }, payload) {
    try {
      await this.$axios.$delete(`/api/countries/${payload}`)
      await dispatch('get')
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  }
}
