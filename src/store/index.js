import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import {LocalStorage} from 'quasar'
import daptinClient from '../api'

var layoutJson = require("../../site/layout.json")

Vue.use(Vuex);

// let appConfig = LocalStorage.getItem("config");
console.log("Daptin client config endpoint", daptinClient.appConfig.endpoint);

// if (appConfig && appConfig.appLayout) {
//   appConfig.appLayout.endpoint = daptinClient.appConfig.getEndpoint();
// }

var defaultConfig = {
  user: null,
  token: null,
  currentTab: null,
  item: null,
  vars: {},
  pagination: {},
  filters: {},
  path: null,
  type: null,
  loaded: false,
  data: null,
  worldModels: null,
  localData: null,
  currentLayout: null,
  appLayout: layoutJson
};

const token = LocalStorage.getItem("token");
var state = defaultConfig;

// if (!daptinClient.appConfig.endpoint && state.appLayout.endpoint) {
//   console.log("setting daptin end point and refreshing ")
//   localStorage.setItem("DAPTIN_ENDPOINT", state.appLayout.endpoint);
//
//   setTimeout(function () {
//     window.location = window.location + "";
//   }, 300);
// }

console.log("localhost state ", state);
if (token) {
  state.user = token;
  state.token = token;
}


export default function createStore() {
  // daptinClient.worldManager.loadModels();
  console.log("Store created");
  return new Vuex.Store({
    state: state,
    actions,
    mutations,
    getters
  })
}
