import axios from 'axios'

export const state = () => ({
  email: null,
  boxno: null
})
    
export const mutations = {
  setEmail(state, email) {
    state.email = email
  },
  getData(state, payload) {
    state.email = payload.email
    state.boxno = payload.boxno
  }
}

export const getters = {
  boxno: state => {
    return state.boxno
  }
}

export const actions = {
  async getData ({ commit }, email) {
    var boxinfo = await this.$axios.$post('/api/gacha/box', {email:email})
    await commit('getData', boxinfo)
  }
}