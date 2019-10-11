import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import {LocalStorage} from 'quasar'
import daptinClient from '../api'

Vue.use(Vuex);

let appConfig = LocalStorage.getItem("config");
console.log("Daptin client config endpoint", daptinClient.appConfig.endpoint);

if (appConfig && appConfig.appLayout) {
  appConfig.appLayout.endpoint = daptinClient.appConfig.getEndpoint();
}

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
  appLayout: {
    homeLayout: "home_layout",
    endpoint: "http://localhost:6336",
    style: {
      background: "#ffffff",
      logourl: '',
      primary: '#027be3',
      secondary: '#26a69a',
      navbarBackgroundColor: '#122211',
      navbarTextColor: '#fff',
      navbarIconColor: '#729'
    },
    layout: "",
    containerLayouts: [],
    templates: [],
    tabs: [
      {
        label: "User accounts",
        icon: "face",
        path: "/user_template"
      },
      {
        label: "Mails",
        icon: "mail",
        path: "/mail_template"
      },
      {
        label: "Actions",
        icon: 'lock',
        path: "/action_template"
      },
      {
        label: "Articles",
        icon: 'list',
        path: "/article_template"
      }
    ],
    layoutConfiguration: {
      'home_layout': {
        "item": "action",
        "type": "list",
        "title": "Home",
        "transform": {
          list: "data",
          item: {
            reference_id: "reference_id",
            title: "action_name",
          }
        },
        "template": "home-view",
        "actions": {},
      },
      'mail_form_template': {
        "item": "mail",
        "type": "single",
        'title': "View mail",
        'transform': {
          list: 'data',
          item: {
            title: "subject",
            description: "from_address",
            avatar: 'label',
            created_at: "created_at",
            key: "reference_id"
          }
        },
        "template": "another-form-view-1",
        "actions": {},
      },
      'action_form_template': {
        "item": "action",
        "type": "single",
        'title': "Edit action",
        "template": "list-view-1",
        'transform': {
          list: 'data',
          item: {
            title: "label",
            description: "action_name",
            created_at: "created_at",
            avatar: 'label',
            key: "reference_id",
          }
        },
        "actions": {},
      },
      'user_form_template': {
        "item": "user_account",
        "type": "single",
        'title': "Edit user",
        "template": "another-form-view-1",
        'transform': {
          list: 'data',
          item: {
            title: "email",
            key: "reference_id",
            created_at: "created_at",
            avatar: 'email',
            description: 'email'
          },
          operate: [
            {
              run: "function dateParse(v){return new Date(Date.parse(v));};dateParse", on: "created_at"
            },
          ]
        },
        "actions": {},
      },
      'article_display_template': {
        'title': "Article",
        'type': 'single',
        "item": "article",
        "style": {
          "background": "white"
        },
        "params": {
          "included_relations": "heading_image"
        },
        'transform': {
          list: 'data',
          item: {
            title: "title",
            summary: "summary",
            created_at: "created_at",
            heading_image: "heading_image.0.contents",
            content: "article",
            avatar: 'heading_image',
            key: "reference_id",
          },
          operate: [
            {
              run: "function dateParse(v){return new Date(Date.parse(v));};dateParse", on: "created_at"
            },
          ]
        },
        "actions": {
          "ItemSingleClick": {
            "type": "relocate",
            "params": {"path": "/article_display_template/{{reference_id}}",}
          }
        }
      },
      'article_template': {
        "template": "list-view-1",
        'title': "Articles",
        'type': 'list',
        "item": "article",
        "params": {
          "included_relations": "heading_image"
        },
        'transform': {
          list: 'data',
          item: {
            title: "title",
            summary: "summary",
            created_at: "created_at",
            heading_image: "heading_image.0.contents",
            avatar: 'heading_image',
            key: "reference_id",
          },
          operate: [
            {
              run: "function dateParse(v){return new Date(Date.parse(v));};dateParse", on: "created_at"
            },
          ]
        },
        "actions": {
          "ItemSingleClick": {
            "type": "relocate",
            "params": {"path": "/article_display_template/{{reference_id}}",}
          }
        }
      },
      'action_template': {
        'title': "Actions",
        "template": "list-view-1",
        'type': 'list',
        "item": "action",
        'transform': {
          list: 'data',
          item: {
            title: "label",
            description: "action_name",
            created_at: "created_at",
            avatar: 'label',
            key: "reference_id",
          },
          operate: [
            {
              run: "function dateParse(v){return new Date(Date.parse(v));};dateParse", on: "created_at"
            },
            {
              run: "function setAvatar(v){return v.substring(0, 1);};setAvatar", on: "avatar"
            },
          ]
        },
        "actions": {
          "ItemSingleClick": {
            "type": "relocate",
            "params": {"path": "/action_form_template/{{reference_id}}",}
          },
          "ItemSingleDelete": {
            "type": "action",
            "params": {}
          }
        }
      },
      'mail_template': {
        'title': "Mails",
        'type': 'list',
        "item": "mail",
        'transform': {
          list: 'data',
          item: {
            title: "subject",
            description: "from_address",
            avatar: 'label',
            created_at: "created_at",
            reference_id: "reference_id",
            key: "reference_id"
          },
          operate: [
            {
              run: "function dateParse(v){return new Date(Date.parse(v));};dateParse", on: "created_at"
            },
          ]
        },
        "actions": {
          "ItemSingleClick": {
            "type": "relocate",
            "params": {"path": "/mail_form_template/{{reference_id}}",}
          },
        },
        template: "card-view-1"
      },
      'user_template': {
        'title': "Users",
        'type': 'list',
        "item": "user_account",
        "template": "card-view-1",
        'transform': {
          list: 'data',
          item: {
            title: "email",
            key: "reference_id",
            created_at: "created_at",
            avatar: 'email',
            description: 'email'
          },
          operate: [
            {
              run: "function dateParse(v){return new Date(Date.parse(v));};dateParse", on: "created_at"
            },

            {
              run: "function setAvatar(v){return v ? v.substring(0, 1).toUpperCase() : '';};setAvatar", on: "avatar"
            },
          ]
        },
        "actions": {
          "ItemSingleClick": {
            "type": "relocate",
            "params": {"path": "/user_form_template/{{reference_id}}",}
          },
        }
      },
    }
  }
};

const token = LocalStorage.getItem("token");
var state = JSON.parse(appConfig || JSON.stringify(defaultConfig));

if (!daptinClient.appConfig.endpoint && state.appLayout.endpoint) {
  console.log("setting daptin end point and refreshing ")
  localStorage.setItem("DAPTIN_ENDPOINT", state.appLayout.endpoint);

  setTimeout(function () {
    window.location = window.location + "";
  }, 300);
}

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
