export default {
  state: () => ({
    hotels: [],
    currentHotel: null,
    currentHotelNoData: null
  }),

  getters: {
    hotels: state => state.hotels,
    currentHotel: state => state.currentHotel,
    currentHotelNoData: state => state.currentHotelNoData,
  },

  mutations: {
    SET_HOTELS (state, payload) {
      state.hotels = payload
    },
    SET_CURRENT_HOTEL (state, payload) {
      state.currentHotel = payload
    },
    SET_CURRENT_HOTEL_NO_DATA (state, payload) {
      state.currentHotelNoData = payload
    },
    SORT_BY_ORDER (state) {
      state.currentHotel.hotel_images.sort((a, b) => a.order - b.order)
    },
    SET_IMAGES_ORDER (state, payload) {
      payload.forEach((img, i) => {
        img.order = i + 1
      });
      state.currentHotel.hotel_images = payload
    }
  },

  actions: {
    async get ({ commit }) {
      try {
        const data = await this.$axios.$get('/api/hotels?with_data=true')
        if (data.result) {
          commit('SET_HOTELS', data.result)
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async getById ({ commit }, payload) {
      try {
        const data = await this.$axios.$get(`/api/hotels/${payload}?with_data=true`)
        commit('SET_CURRENT_HOTEL', data.result)
        commit('SORT_BY_ORDER')
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async getByIdNoData ({ commit }, payload) {
      try {
        const data = await this.$axios.$get(`/api/hotels/${payload}?with_data=false`)
        commit('SET_CURRENT_HOTEL_NO_DATA', data.result)
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async edit ({ dispatch }, payload) {
      try {
        await this.$axios.$put(`/api/hotels/${payload.id}`, payload.data)
        dispatch('getById', payload.id)
        dispatch('getByIdNoData', payload.id)
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async add ({ dispatch }, payload) {
      try {
        await this.$axios.$post('/api/hotels', payload)
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async deleteHotel ({ dispatch }, payload) {
      try {
        await this.$axios.$delete(`/api/hotels/${payload}`)
        dispatch('get')
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },
    setImagesOrder({state, commit}, payload) {
      for (let i = 0; i < payload.length; i++) {
        let data = {
          ...payload[i],
          hotel_id: state.currentHotel.id
        }
        this.$axios.put(`/api/hotel-images/${payload[i].id}`, data)
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
}