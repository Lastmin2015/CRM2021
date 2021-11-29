/*
* Managing global state app
*/
export const state = () => ({
  loading: false,
  error: null
})

export const mutations = {
  SET_ERROR (state, payload) {
    state.error = payload
  },
  SET_LOADING (state, payload) {
    state.loading = payload
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch }, { app }) {
    if (process.server && process.static) {
      return
    }
    const token = app.$cookies.get('token')
    if (!token) {
      return
    }
    const newToken = await dispatch('auth/refreshToken', token, {
      root: true
    })
    app.$cookies.set('token', newToken)
  },
  setError ({ commit }, error) {
    commit('SET_ERROR', error)
    setTimeout(() => {
      commit('SET_ERROR', null)
    })
  }
}
