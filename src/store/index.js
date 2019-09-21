import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import {LocalStorage} from 'quasar'
import daptinClient from '../api'

Vue.use(Vuex);

let appConfig = LocalStorage.getItem("config");
console.log(appConfig);

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
      logourl: ''
    },
    templates: [
      {
        name: "card-view-1",
        template: "<q-page>\n" +
          "\n" +
          "    <q-toolbar class=\"bg-primary text-white shadow-2\" v-if=\"layout && layout.title\">\n" +
          "      <q-toolbar-title>{{layout.title}}</q-toolbar-title>\n" +
          "    </q-toolbar>\n" +
          "\n" +
          "    <div class=\"q-pa-md row items-start q-gutter-md\">\n" +
          "      <template v-for=\"(row, i) in localData\">\n" +
          "        <q-card class=\"my-card\" :key=\"row.key\" @click.native=\"fireEvent({'name': 'ItemSingleClick', 'index': i, 'params': row})\">\n" +
          "\n" +
          "          <q-avatar color=\"grey\" text-color=\"white\">\n" +
          "            {{ row.avatar }}\n" +
          "          </q-avatar>\n" +
          "\n" +
          "          <q-card-section>\n" +
          "            <q-item-label>{{row.title}}</q-item-label>\n" +
          "            <q-item-label caption lines=\"2\">{{row.description}}</q-item-label>\n" +
          "          </q-card-section>\n" +
          "\n" +
          "          <q-card-section>\n" +
          "            <q-item-label caption>{{row.created_at}}</q-item-label>\n" +
          "          </q-card-section>\n" +
          "        </q-card>\n" +
          "      </template>\n" +
          "    </div>\n" +
          "  </q-page>",
        variables: ["title", "created_at", "description", "key", "avatar", "reference_id"],
        events: [{
          name: "ItemSingleClick",
          type: "SingleRow"
        }]
      },
      {
        name: "list-view-1",
        template: "<q-page>\n" +
          "\n" +
          "    <q-toolbar class=\"bg-primary text-white shadow-2\" v-if=\"layout && layout.title\">\n" +
          "      <q-toolbar-title>{{layout.title}}</q-toolbar-title>\n" +
          "    </q-toolbar>\n" +
          "\n" +
          "    <q-list style=\"background: white\">\n" +
          "      <template v-for=\"(row, index) in localData\">\n" +
          "        <q-item :key=\"index\" @click.native=\"fireEvent({'name': 'ItemSingleClick', 'index':index, 'params': row})\">\n" +
          "\n" +
          "          <q-item-section avatar>\n" +
          "            <q-avatar color=\"grey\" text-color=\"white\">\n" +
          "              {{ row.avatar }}\n" +
          "            </q-avatar>\n" +
          "          </q-item-section>\n" +
          "\n" +
          "          <q-item-section>\n" +
          "            <q-item-label>{{row.title}}</q-item-label>\n" +
          "            <q-item-label caption lines=\"2\">{{row.description}}</q-item-label>\n" +
          "          </q-item-section>\n" +
          "\n" +
          "          <q-item-section side top>\n" +
          "            <q-item-label caption>{{row.created_at}}</q-item-label>\n" +
          "          </q-item-section>\n" +
          "        </q-item>\n" +
          "        <q-separator spaced inset :key=\"'sep_' + row.key\" v-if=\"index < localData.length - 1\"/>\n" +
          "      </template>\n" +
          "    </q-list>\n" +
          "\n" +
          "  </q-page>",
        variables: ["title", "created_at", "description", "key", "avatar", "reference_id"],
        events: [{
          name: "ItemSingleClick",
          type: "SingleRow"
        }]
      },
      {
        name: "another-form-view-1",
        template: "<q-page>\n" +
          "    <q-toolbar class=\"bg-primary text-white shadow-2\" v-if=\"localData && localData.title\">\n" +
          "      <q-toolbar-title>{{localData.title}}</q-toolbar-title>\n" +
          "    </q-toolbar>\n" +
          "\n" +
          "    <div class=\"q-pa-md row items-start q-gutter-md\">\n" +
          "\n" +
          "      {{localData}}\n" +
          "    </div>\n" +
          "  </q-page>",
        style: "",
        variables: ["title"],
        events: [{
          name: "DeleteItem"
        }]
      },
      {
        name: "home-view",
        template: "<div>\n" +
          "    Hello home\n" +
          "    \n" +
          "    <q-input label='Mobile number' v-model=\"vars.mobile_number\"></q-input>\n" +
          "    <q-btn label=\"Send Otp\"  @click=\"fireEvent({name: 'test', params: {mobile_number: vars.mobile_number}})\"></q-btn>\n" +
          "    \n" +
          "    <table>\n" +
          "        <tr v-for=\"row in localData\" >\n" +
          "           <td> {{row.title}}</td>\n" +
          "           <td>\n" +
          "               <q-btn @click=\"fireEvent({name: 'deleteThisAction', params: row.reference_id})\" label=\"Delete\"></q-btn>\n" +
          "           </td>\n" +
          "        </tr>\n" +
          "    </table>\n" +
          "    \n" +
          "</div>",
        variables: ["title", "reference_id"],
        events: [
          {
            name: 'deleteThisAction',
            type: "SingleRow"
          },
          {
            name: 'test',
            type: "SingleRow"
          }
        ]
      }
    ],
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
        "actions": {

        },
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
        "actions": {

        },
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
        "actions": {

        },
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
        "actions": {

        },
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


console.log("localhost state ", state);
if (token) {
  state.user = token;
  state.token = token;
}


export default function createStore() {
  daptinClient.worldManager.loadModels();
  console.log("Store created");
  return new Vuex.Store({
    state: state,
    actions,
    mutations,
    getters
  })
}
