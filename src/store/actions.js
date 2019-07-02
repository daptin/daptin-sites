import daptinClient from '../api'

export default {
  // ensure data for rendering given list type
  FETCH_LIST_DATA: ({commit, dispatch, state}, {type}) => {
    return Promise.resolve()
  },

  // ensure all active items are fetched
  ENSURE_ACTIVE_ITEMS: ({dispatch, getters}) => {
    return Promise.resolve()
  },

  FETCH_ITEMS: ({commit, state}, {ids}) => {
    return Promise.resolve()
  },

  FETCH_USER: ({commit, state}, {id}) => {
    return Promise.resolve()
  },
  loadTab: ({commit, state}, tabDetails) => {
    commit("SET_TAB", tabDetails);
  },
  loginUser: ({commit, state}, credentials) => {
    return new Promise(function (resolve, reject) {
      daptinClient.actionManager.doAction("user_account", "signin", {
        email: credentials.email,
        password: credentials.password,
      }).then(function (response) {
        console.log("sign in success")
        commit("SET_USER", response[0].Attributes.value)
        resolve(response);
      }).catch(function (error) {
        console.log("sign in failed")
        reject(error);
      })
    })
  },
  refreshData: ({commit, state}) => {
    return new Promise(function (resolve, reject) {
      daptinClient.jsonApi.findAll(state.currentTab.item).then(function (res) {
        console.log("loaded data", res)
        commit('SET_DATA', res.data);
      }).catch(function (err) {
        console.log("Failed to load data", err)
      })
    })
  },
}
