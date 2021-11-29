export default {

  state: () => ({
    graphs: [],
    operators: []
  }),

  getters: {
    graphs: state => state.graphs,
    operators: state => state.operators
  },

  mutations: {
    SET_GRAPHS(state, payload) {
      state.graphs = payload
      console.log(state.graphs);
    },
    SET_OPERATORS(state, payload) {
      state.operators = payload
    }
  },

  actions: {
    async get({ commit, rootState }, id) {

        const isOperator = rootState.auth.isOperator
        const hotelID = rootState.hotels.currentHotel.id
        let ID

        if (isOperator) {
          ID = rootState.auth.operatorID
        } else {
          if (id) {
            ID = id
            commit("auth/SET_OPERATOR_ID", id, { root: true })
          } else {

            const { result: data } = await this.$axios.$get("/api/users")
            let operators = data?.filter(role => role.role === 2)

            if (operators !== null && operators.length) {
              ID = operators[0].id
              commit('SET_OPERATORS', operators)
              this.$cookies.set('operatorID', operators[0].id)
              commit("auth/SET_OPERATOR_ID", operators[0].id, { root: true })
            }

            if (!operators) {
              ID = ""
            }
          }
        }

        const { result: prices } = await this.$axios.$get(`/api/graph-prices?hotel_id=${hotelID}&operator_id=${ID}&with_data=true&grouped=true`)
        const { result: hotel } = await this.$axios.$get(`/api/hotels/${hotelID}?with_data=true`)

        const roomNames = [];

        if (hotel.room_type.length) {
          hotel.room_type.forEach((item) => {
            roomNames.push(item);
          });
        }

        if (hotel.boarding_type.length) {
          if (prices) {
            hotel.boarding_type.forEach(type => {
              if (!prices.some(price => price.boarding_type.boarding_type_id === type.boarding_type_id)) {
                prices.push({
                  boarding_type: type,
                  items: []
                })
              }
            })
          }
        }

        if (prices) {
          prices.forEach(async (item) => {
            item.data = []

            item.names = roomNames

            item.names.forEach(name => {
              let obj = { name, items: [] }

              if (item.items.length) {
                obj.items = item.items.filter(q => q.room_type.name === name.name)
              }
              item.data.push(obj)
            })

            if (item.items.length) {
              item.periods = item.items[0].periods
            } else {
              item.periods = []
            }
          })

          prices.sort((a, b) => a.boarding_type.name.localeCompare(b.boarding_type.name))
        }
        commit('SET_GRAPHS', prices)
    },

    async add({ dispatch }, { id, room }) {
      const { result: room_type_id } = await this.$axios.$post('/api/room-types', id)

      return dispatch("addName", {
        ...room,
        room_type_id
      })
    },

    async addName({ dispatch }, payload) {
      await this.$axios.$post('/api/room-type-texts', payload)
      return dispatch("get")
    },

    async edit({ dispatch }, { room: { id, body }, name }) {
      await this.$axios.$put(`/api/room-types/${id}`, body)
      return dispatch("editName", name)
    },

    async editName({ dispatch }, { id, body }) {
      await this.$axios.$put(`/api/room-type-texts/${id}`, body)
      return dispatch('get')
    },

    async deleteRoom({ dispatch }, { id, roomID }) {
      await this.$axios.$delete(`/api/room-types/${id}`)
      return dispatch('deleteRoomName', roomID)

    },

    async deleteRoomName({ dispatch }, payload) {
      await this.$axios.$delete(`/api/room-type-texts/${payload}`)
      return dispatch('get')
    },
  }
}