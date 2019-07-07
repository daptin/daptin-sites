
export default {
  SET_ACTIVE_TYPE: (state, {type}) => {
    state.activeType = type
  },
  SET_PATH: (state, path) => {
    state.path = path;
    console.log("path set")
  },
  SAVE_CONFIG: (state) => {
    localStorage.setItem("config", JSON.stringify(state))
  },
  SET_LAYOUT: (state, layout) => {
    console.log("set layout", layout)
    state.currentLayout = layout
  },
  SET_LOADED: (state, loaded) => {
    state.loaded = loaded;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_LOCAL_DATA: (state, data) => {
    state.localData = data;
  },
  SET_DATA: (state, data) => {
    console.log("transformation ", JSON.stringify(state.currentLayout.transform))
    state.data = data
  }
}
