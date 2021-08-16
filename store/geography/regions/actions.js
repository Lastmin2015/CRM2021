
export default {
  async get ({ commit }, payload) {
    try {
      const data = await this.$axios.$get('/api/regions?with_name=true', {})
      console.log(data.result)
      if (data.result) {
        commit('SET_REGIONS', data.result)
      }
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async getNames ({ commit }, payload) {
    try {
      const data = await this.$axios.$get(`/api/regions-names?region_id=${payload}`, {})
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
      const country = await this.$axios.$post('/api/regions', {
        name: payload.name,
        country_id: payload.country_id,
        show_in_filter: true,
        order: 0
      })
      console.log(country)
      for (const locale of payload.names) {
        await this.$axios.$post('/api/regions-names', {
          name: locale.name,
          locale: locale.locale,
          region_id: country.result.id
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
      await this.$axios.$put(`/api/regions/${payload.id}`, {
        name: payload.name,
        country_id: payload.country_id
      })
      for (const locale of payload.names) {
        if (!locale.new) {
          await this.$axios.$put(`/api/regions-names/${locale.id}`, {
            name: locale.name,
            locale: locale.locale,
            region_id: payload.id
          })
        } else {
          await this.$axios.$post('/api/regions-names', {
            name: locale.name,
            locale: locale.locale,
            region_id: payload.id
          })
        }
      }
      await dispatch('get')
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  },
  async deleteRegion ({ commit, dispatch }, payload) {
    try {
      await this.$axios.$delete(`/api/regions/${payload}`)
      await dispatch('get')
      return true
    } catch (error) {
      throw error.response.data.error.message
    }
  }
}
