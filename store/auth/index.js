export default {
  state: () => ({
    token: null,
    role: "",
    operatorID: ""
  }),
  getters: {
    isAuth: state => !!state.token,
    isOperator: (state) => state.role === "operator" ? true : false,
    operatorID: state => state.operatorID
  },
  mutations: {
    SET_TOKEN (state, payload) {
      state.token = payload
    },
    SET_ROLES (state, { roles, email }) {

      let role = roles.find(role => role.email === email)

      if (role.role === 4 || role.role === 16) {
        if (this.$cookies.get('isOperator')) {
          this.$cookies.remove("isOperator")
        }
        state.role = "manager"
      } else if (role.role === 2) {
        state.role = "operator"
        this.$cookies.set('isOperator', true)

        this.$cookies.set('operatorID', role.id)
        state.operatorID = role.id
      }
    },
    SET_OPERATOR_ROLE (state) {
      state.role = "operator"
    },
    SET_OPERATOR_ID (state, payload) {
      state.operatorID = payload
    }
  },
  actions: {
    async signIn({ commit, dispatch, rootState }, payload) {
      try {
        const data = await this.$axios.$post('/api/auth/sign-in', {
          email: payload.email,
          password: payload.password
        })

        const { result } = await this.$axios.$get("/api/users")

        if (data.success) {
          commit("SET_ROLES", { roles: result, email: payload.email })
          commit('SET_TOKEN', data.result.refresh_token)
          this.$cookies.set('token', data.result.refresh_token)
          this.$axios.setToken(data.result.access_token, 'Bearer')
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async signUp({ commit, dispatch, rootState }, payload) {
      try {
        const data = await this.$axios.$post('/api/auth/sign-up', {
          email: payload.email,
          password: payload.password
        })
        if (data.success) {
          commit('SET_TOKEN', data.result.refresh_token)
          this.$cookies.set('token', data.result.refresh_token)
          this.$axios.setToken(data.result.access_token, 'Bearer')
        }
        return true
      } catch (error) {
        throw error.response.data.error.message
      }
    },

    async refreshToken({ commit, dispatch, rootState }, payload) {
      try {
        const data = await this.$axios.$post(`/api/auth/refresh?token=${payload}`)
        if (data.success) {
          commit('SET_TOKEN', data.result.access_token)
          this.$cookies.set('token', data.result.refresh_token)
          this.$axios.setToken(data.result.access_token, 'Bearer')
        } else {
          commit('SET_TOKEN', null)
        }
        return data.result.refresh_token
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async restore({ commit, dispatch, rootState }, email) {
      try {
        const data = await this.$axios.$get(`/api/auth/recovery?email=${email}`)
        return data.result
      } catch (error) {
        throw error.response.data.error.message
      }
    }
  }
}