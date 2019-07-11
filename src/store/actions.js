import daptinClient from '../api'
import {DataTransform} from "node-json-transform" ;
import Mustache from 'mustache';

export default {
  setLayout: ({commit, state}, layout) => {

    console.log("set layout called", layout);
    commit("SET_LAYOUT", state.appLayout.layoutConfiguration[layout]);

  },
  setPath: ({commit, state}, path) => {
    commit("SET_PATH", path)
  },
  createTemplate: ({commit, state}, template) => {
    commit("NEW_TEMPLATE", template)
  },
  refreshModels: ({commit, state}) => {
    return new Promise(function (resolve, reject) {
      daptinClient.worldManager.loadModels().then(function () {
        const worlds = daptinClient.worldManager.getWorlds().map(function (e) {
          e.schema = JSON.parse(e.world_schema_json)
          return e;
        });
        console.log("world models", worlds)
        commit("SET_WORLD_MODELS", worlds);
        resolve(worlds);
      }).catch(reject)
    });
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
  setTemplate: ({commit, state}, template) => {
    for (var i = 0; i < state.appLayout.templates.length; i++) {
      if (state.appLayout.templates[i].name == template.name) {
        state.appLayout.templates[i].template = template.template;
      }
    }
  },
  fireEvent: ({commit, state}, params) => {
    console.log("single item clicked", params)

    const action = state.currentLayout.actions[params.name]
    const path = Mustache.render(action.path, state.data[params.index])
    console.log("next path", path);
    commit("SET_PATH", path)
  },
  saveConfig: ({commit, state}) => {
    commit("SAVE_CONFIG")
  },
  getData: ({commit, state}, params) => {
    const layout = params.layout;
    params = params.params;
    return new Promise(function (resolve, reject) {
      console.log("current layout on refresh data", layout)

      if (layout.type == "list") {
        if (!params) {
          params = {}
        }
        const finalParams = {...layout.params, ...params}
        daptinClient.jsonApi.findAll(layout.item, finalParams).then(function (res) {
          console.log("loaded data", res);
          resolve(res.data)
        }).catch(function (err) {
          console.log("Failed to load data", err)
        })
      } else {
        if (!params) {
          reject("no id provided");
          return
        }
        const finalParams = {...layout.params}
        daptinClient.jsonApi.find(layout.item, params, finalParams).then(function (res) {
          console.log("loaded data", res);
          resolve(res.data)
        }).catch(function (err) {
          console.log("Failed to load data", err)
        })
      }
    })
  },
  addNewTab: ({commit, state}, params) => {
    console.log("add tab", params)
    state.appLayout.tabs.push(params)
  },
  refreshData: ({commit, state}, params) => {

    if (!state.currentLayout) {
      return
    }
    if (!state.currentLayout.params) {
      state.currentLayout.params = {}
    }

    return new Promise(function (resolve, reject) {
      console.log("current layout on refresh data", state.currentLayout)

      if (state.loaded) {


        if (state.currentLayout.type == "list") {
          if (!params) {
            params = {}
          }
          const finalParams = {...state.currentLayout.params, ...params}
          daptinClient.jsonApi.findAll(state.currentLayout.item, finalParams).then(function (res) {
            console.log("loaded data", res);
            const data = res.data;
            commit('SET_DATA', data);


            if (state.currentLayout.type == "list") {
              commit("SET_LOCAL_DATA", DataTransform({data: data}, state.currentLayout.transform).transform())
            } else {
              commit("SET_LOCAL_DATA", DataTransform({data: [data]}, state.currentLayout.transform).transform()[0])
            }


          }).catch(function (err) {
            console.log("Failed to load data", err)
          })
        } else {
          if (!params) {
            reject("no id provided");
            return
          }
          const finalParams = {...state.currentLayout.params}
          daptinClient.jsonApi.find(state.currentLayout.item, params, finalParams).then(function (res) {
            console.log("loaded data", res);
            const data = res.data
            commit('SET_DATA', data);
            if (state.currentLayout.type == "list") {
              commit("SET_LOCAL_DATA", DataTransform({data: data}, state.currentLayout.transform).transform())
            } else {
              commit("SET_LOCAL_DATA", DataTransform({data: [data]}, state.currentLayout.transform).transform()[0])
            }
          }).catch(function (err) {
            console.log("Failed to load data", err)
          })
        }
      } else {
        daptinClient.worldManager.loadModels().then(function () {
          commit("SET_LOADED", true)
          console.log("loaded all worlds")


          if (state.currentLayout.type == "list") {
            if (!params) {
              params = {}
            }
            const finalParams = {...state.currentLayout.params, ...params}
            daptinClient.jsonApi.findAll(state.currentLayout.item, finalParams).then(function (res) {
              console.log("loaded data", res);
              const data = res.data;
              commit('SET_DATA', data);


              if (state.currentLayout.type == "list") {
                commit("SET_LOCAL_DATA", DataTransform({data: data}, state.currentLayout.transform).transform())
              } else {
                commit("SET_LOCAL_DATA", DataTransform({data: [data]}, state.currentLayout.transform).transform()[0])
              }

            }).catch(function (err) {
              console.log("Failed to load data", err)
            })
          } else {
            if (!params) {
              reject("no id provided");
              return
            }
            const finalParams = {...state.currentLayout.params}
            daptinClient.jsonApi.find(state.currentLayout.item, params, finalParams).then(function (res) {
              console.log("loaded data", res);
              const data = res.data;
              commit('SET_DATA', data);


              if (state.currentLayout.type == "list") {
                commit("SET_LOCAL_DATA", DataTransform({data: data}, state.currentLayout.transform).transform())
              } else {
                commit("SET_LOCAL_DATA", DataTransform({data: [data]}, state.currentLayout.transform).transform()[0])
              }


            }).catch(function (err) {
              console.log("Failed to load data", err)
            })
          }


        }).catch(function () {
          console.log("failed to load worlds", arguments)
        })
      }
    })
  }
}
