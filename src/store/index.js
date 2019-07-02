import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

export default function createStore() {
  console.log("Store created");
  return new Vuex.Store({
    state: {
      user: null,
      token: null,
      currentTab: null,
      data: null,
      localData: null,
      currentLayout: null,
      appLayout: {
        defaultTab: "user_account",
        tabs: [
          {
            item: "user_account",
            label: "User accounts",
            icon: "face",
            layout: "user_template",
            path: "/card/user_account"
          },
          {
            item: "mail",
            label: "Mails",
            icon: "mail",
            layout: 'mail_template',
            path: "/list/mail"
          },
          {
            item: "action",
            label: "Actions",
            icon: 'lock',
            layout: 'action_template',
            path: "/list/action"
          }
        ],
        layoutConfiguration: {
          'action_template': {
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
                "path": "/form/{{type}}/{{reference_id}}",
                "layout": 'action_form_template'
              }
            }
          },
          'mail_template': {
            'transform': {
              list: 'data',
              item: {
                title: "subject",
                description: "from_address",
                avatar: 'label',
                created_at: "created_at",
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
                "path": "/form/{{type}}/{{reference_id}}"
              }
            }
          },
          'user_template': {
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
                "path": "/form/{{type}}/{{reference_id}}"
              }
            }
          },
        }
      }
    },
    actions,
    mutations,
    getters
  })
}
