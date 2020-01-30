// eslint-disable-next-line
import API from '@aws-amplify/api'
// eslint-disable-next-line
import { graphqlOperation } from '@aws-amplify/api'
import meInfo from '~/graphql/query/meInfo'

export const state = () => ({
  isAuthenticated: false,
  userData: {}
})

export const mutations = {
  setUserIsAuthenticated(state) {
    state.isAuthenticated = true
  },
  setUserData(state, data) {
    state.userData = data
  },
  resetUserData(state, data) {
    state.isAuthenticated = false
    state.userData = {}
  }
}

export const actions = {
  async fetchUserData(context) {
    try {
      const { data } = await API.graphql(graphqlOperation(meInfo, {}))
      context.commit('setUserData', data.meInfo)
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  }
}

export const getters = {
  userName(state) {
    return state.isAuthenticated ? state.userData.name : ''
  },
  isAuthenticated(state) {
    return state.isAuthenticated
  },
  userId(state) {
    return state.isAuthenticated ? state.userData.userId : undefined
  },
  slug(state) {
    return state.isAuthenticated ? state.userData.slug : undefined
  }
}
