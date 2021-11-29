export default {
  state: () => ({
    airports: [],
    beaches: []
  }),

  getters: {
    airports: state => state.airports,
    beaches: state => state.beaches,
  },

  mutations: {
    SET_HOTELS_AIRPORTS (state, payload) {
      state.airports = payload
      // console.log(state.airports, 'airports');
    },
    SET_BEACHES (state, payload) {
      state.beaches = payload
    }
  },

  actions: {
    async getHotelsAirports ({ commit }, payload) {
      const airports = await this.$axios.$get(`/api/hotel-airports?hotel_id=${payload}&with_data=true`)
      // dispatch('getAirportById', airports.result)
      // console.log(airports.result);
      commit('SET_HOTELS_AIRPORTS', airports.result)
    },

    async getAirportById ({commit}, payload) {
      const promises = []
      payload.forEach(airport => {
        const promise = this.$axios.$get(`/api/airports/${airport.airport_id}`)
          .then((res) => res.result)
        promises.push(promise)
      });
      const airports = await Promise.all(promises)
      commit('SET_HOTELS_AIRPORTS', airports)
    },

    deleteAirport (_, payload) {
      return this.$axios.delete(`/api/hotel-airports/${payload}`)
        .catch(err => {
          console.log(err);
        })
    },
    changeAirportDetails ({commit}, payload) {
      return this.$axios.put(`/api/hotel-airports/${payload.id}`, payload)
        .catch(err => {
          console.log(err);
        })
    },
    //
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/beach-types')
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

    async add ({ dispatch }, payload) {
      try {
        await this.$axios.$post('/api/hotel-airports', payload)
        await dispatch('getHotelsAirports', payload.hotel_id)
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