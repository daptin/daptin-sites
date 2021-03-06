import daptinClient from '../api'
import {DataTransform} from "node-json-transform" ;
import Mustache from 'mustache';
import router from '../router'

export default {
  setLayout: ({commit, state}, layout) => {
    console.log("set layout called", layout);
    if (!layout) {
      layout = state.appLayout.homeLayout;
    }
    commit("SET_LAYOUT", state.appLayout.layoutConfiguration[layout]);
  },
  setVar: ({commit, state}, params) => {
    commit("SET_VAR", params)
  },
  setPath: ({commit, state}, path) => {
    commit("SET_PATH", path)
  },
  createTemplate: ({commit, state}, template) => {
    commit("NEW_TEMPLATE", template)
  },
  refreshActions: ({commit, state}) => {
    daptinClient.worldManager.loadModel("action").then(function () {
      daptinClient.jsonApi.findAll('action', {
        page: {
          size: 500,
        }
      }).then(function (e) {
        console.log("loaded all actions", e);
        commit("SET_ACTIONS", e.data)
      })
    })

  },
  refreshModels: ({commit, state}) => {
    return new Promise(function (resolve, reject) {
      daptinClient.worldManager.loadModels().then(function () {
        const worlds = daptinClient.worldManager.getWorlds().map(function (e) {
          e.schema = JSON.parse(e.world_schema_json);
          return e;
        });
        console.log("world models", worlds);
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
        console.log("sign in success");
        commit("SET_USER", response[0].Attributes.value);
        resolve(response);
      }).catch(function (error) {
        console.log("sign in failed");
        reject(error);
      })
    })
  },
  setDaptinToken: ({commit, state}, token) => {
    commit("SET_DAPTIN_TOKEN", token)
  },
  setTemplate: ({commit, state}, template) => {
    for (var i = 0; i < state.appLayout.templates.length; i++) {
      if (state.appLayout.templates[i].name == template.name) {
        state.appLayout.templates[i].template = template.template;
      }
    }
  },
  setTab({commit, state}, tab) {
    commit("SET_PATH", tab.path.split("/")[1])
  },
  setPagination: ({commit, state}, params) => {
    commit("SET_PAGINATION", params)
  },
  invokeEvent: ({commit, state}, actionConfig) => {
    console.log("action invoked", actionConfig);

    if (!actionConfig) {
      console.log("no action defined");
      return
    }


    switch (actionConfig.type) {
      case "relocate":
        const path = Mustache.render(actionConfig.params.path, actionConfig.params);
        console.log("next path", path);
        commit("SET_PATH", path);
        break;
      case "action":
        const actionName = actionConfig.params.action_name;
        const serverAction = state.serverActions.filter(function (e) {
          return e.action_name == actionName
        })[0];
        console.log("execute server action", serverAction);
        const actionSchema = JSON.parse(serverAction.action_schema);
        return daptinClient.actionManager.doAction(actionSchema.OnType, actionName, actionConfig.params).catch(function (e) {
          console.log("action failed", e);
          for (var i in e) {
            var res = e[i];
            switch (res.ResponseType) {
              case "client.notify":
                alert(res.Attributes.message);
                break;
            }
          }
        });


      case "put":
        console.log("put request", actionConfig)
        return daptinClient.jsonApi.update(actionConfig.params.table_name, actionConfig.params)

      case "delete":
        return daptinClient.jsonApi.destroy(actionConfig.params.table_name, actionConfig.params)

      case "post":
        return daptinClient.jsonApi.create(actionConfig.params.table_name, actionConfig.params)

      case "get":
        return daptinClient.jsonApi.findAll(actionConfig.params.table_name, actionConfig.params)

    }


  },
  fireEvent: ({commit, state}, action) => {
    console.log("single item clicked", action);

    const actionConfig = state.currentLayout.actions[action.name];


    if (!actionConfig) {
      console.log("no action defined");
      return
    }


    switch (actionConfig.type) {
      case "relocate":
        const path = Mustache.render(actionConfig.params.path, action.params);
        console.log("next path", path);
        commit("SET_PATH", path);
        break;
      case "action":
        const actionName = actionConfig.params.action_name;
        const serverAction = state.serverActions.filter(function (e) {
          return e.action_name == actionName
        })[0];
        console.log("execute server action", serverAction);
        const actionSchema = JSON.parse(serverAction.action_schema);
        return daptinClient.actionManager.doAction(actionSchema.OnType, actionName, action.params).catch(function (e) {
          console.log("action failed", e);
          for (var i in e) {
            var res = e[i];
            switch (res.ResponseType) {
              case "client.notify":
                alert(res.Attributes.message);
                break;
            }
          }
        });
        break;


      case "put":
        return daptinClient.jsonApi.update(actionConfig.params.table_name, action.params)
        break;

      case "delete":
        return daptinClient.jsonApi.destroy(actionConfig.params.table_name, action.params)
        break;

      case "post":
        return daptinClient.jsonApi.create(actionConfig.params.table_name, action.params)

    }


  },
  saveConfig: ({commit, state}) => {
    commit("SAVE_CONFIG")
  },
  getData: ({commit, state}, params) => {
    const layout = params.layout;
    params = params.params;
    return new Promise(function (resolve, reject) {
      console.log("current layout on refresh data", layout);

      if (layout.type == "list") {
        if (!params) {
          params = {}
        }
        const finalParams = {...layout.params, ...params};
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
        const finalParams = {...layout.params};
        daptinClient.jsonApi.find(layout.item, params, finalParams).then(function (res) {
          console.log("loaded data", res);
          resolve(res.data)
        }).catch(function (err) {
          console.log("Failed to load data", err)
        })
      }
    })
  },
  addLayout: ({commit, state}, params) => {
    console.log("add tab", params);
    state.appLayout.layoutConfiguration[params.name] = params.config;
  },
  addNewTab: ({commit, state}, params) => {
    console.log("add tab", params);
    state.appLayout.tabs.push(params)
  },
  refreshData: ({commit, state}, params) => {

    console.log("refresh data ", state.currentLayout)
    if (!state.currentLayout) {
      return
    }
    if (!state.currentLayout.params) {
      state.currentLayout.params = {}
    }

    return new Promise(function (resolve, reject) {
      console.log("current layout on refresh data", state.currentLayout);

      if (state.loaded) {


        if (state.currentLayout.type == "list") {
          if (!params) {
            params = {}
          }
          const finalParams = {...state.currentLayout.params, ...params};

          daptinClient.worldManager.loadModel(state.currentLayout.item).then(function () {
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

          })


        } else {
          if (!params) {
            reject("no id provided");
            return
          }
          const finalParams = {...state.currentLayout.params};
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
      } else {
        daptinClient.worldManager.loadModel(state.currentLayout.item).then(function () {
          commit("SET_LOADED", true);
          console.log("loaded all worlds");


          if (state.currentLayout.type == "list") {
            if (!params) {
              params = {}
            }
            const finalParams = {...state.currentLayout.params, ...params};
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
            const finalParams = {...state.currentLayout.params};
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
