import Vue from 'vue'
import {DataTransform} from "node-json-transform" ;

export default {
  SET_ACTIVE_TYPE: (state, {type}) => {
    state.activeType = type
  },

  SET_LIST: (state, {type, ids}) => {
    state.lists[type] = ids
  },

  SET_ITEMS: (state, {items}) => {
    items.forEach(item => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },
  SET_TAB: (state, tabDetails) => {
    state.currentTab = tabDetails
    state.currentLayout = state.appLayout.layoutConfiguration[state.currentTab.layout];
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_DATA: (state, data) => {
    state.data = data
    state.localData = DataTransform({data: data}, state.currentLayout.transform).transform();
    console.log("transformed ata", state.localData)
  }
}
