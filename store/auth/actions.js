
export default {
  async signIn ({ commit, dispatch, rootState }, payload) {
    try {
      const data = await this.$axios.$post('/api/auth/sign-in', {
        email: payload.email,
        password: payload.password
      })
      if (data.success) {
        commit('SET_TOKEN', data.result.refresh_token)
        this.$cookies.set('token', data.result.refresh_token, {
          secure: true
        })
        this.$axios.setToken(data.result.access_token, 'Bearer')
      }
      return data.result.refresh_token
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  async refreshToken ({ commit, dispatch, rootState }, payload) {
    try {
      const data = await this.$axios.$post(`/api/auth/refresh?token=${payload}`)
      if (data.success) {
        commit('SET_TOKEN', data.result.access_token)
        this.$cookies.set('token', data.result.refresh_token, {
          secure: true
        })
        this.$axios.setToken(data.result.access_token, 'Bearer')
      }
      return data.result.refresh_token
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
