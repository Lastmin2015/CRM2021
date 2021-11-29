export default {
  state: () => ({
    city: [],
    cityNames: [],
  }),
  getters: {
    city: state => state.city,
    cityNames: state => state.cityNames
  },
  mutations: {
    SET_CITIES (state, payload) {
      state.city = payload
    },
    SET_CITY_NAMES (state, payload) {
      state.city = payload
    }
  },
  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/cities?with_data=true')
        if (data.result) {
          commit('SET_CITIES', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },
    async getNames ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/cities-names')
        if (data.result) {
          commit('SET_CITY_NAMES', data.result)
        }
        return true
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
        // console.log(country)
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
  },
}