export const state = () => ({
  email: ""
})

export const getters = {
  email: state => {
    return state.email
  },
}

export const mutations = {
  setEmail(state, email) {
    state.email = email
  }
}