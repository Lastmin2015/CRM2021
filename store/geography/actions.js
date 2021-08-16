
export default {
  async signIn ({ commit, dispatch, rootState }, payload) {
    try {
      const data = await this.$axios.$post('/api/auth/sign-in', {
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

  async signUp ({ commit, dispatch, rootState }, payload) {
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

  async refreshToken ({ commit, dispatch, rootState }, payload) {
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

  async restore ({ commit, dispatch, rootState }, email) {
    try {
      const data = await this.$axios.$get(`/api/auth/recovery?email=${email}`)
      return data.result
    } catch (error) {
      throw error.response.data.error.message
    }
  }
}
