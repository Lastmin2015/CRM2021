export default {
  state: () => ({

  }),
  getters: {},
  mutations: {},
  actions: {
    async editDistance ({ dispatch, rootState }, payload) {
      const id = rootState.hotels.currentHotel.id
      await this.$axios.put(`/api/hotels/${id}`, payload)
      await dispatch('hotels/getById', id, { root: true })
      return true
    }
  },
}