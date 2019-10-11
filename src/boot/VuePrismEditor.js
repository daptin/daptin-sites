// import something here
import * as editor from "vue2-ace-editor"

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import 'semantic-ui-css/semantic.min.css';
import FileUpload from 'vue-upload-component'

import ace from 'brace'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/theme/monokai'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import chiefClient from '../simplyapi'
import {mapGetters, mapActions, mapState} from 'vuex';

// "async" is optional
export default async ({Vue}) => {
  // something to do

  Vue.use(VueTabs)
  Vue.component("editor", editor);
  Vue.component('v-select', vSelect);
  Vue.component('file-upload', FileUpload);

  return Promise.all([
    new Promise(function (resolve, reject) {
      console.log("load screens from chief");
      chiefClient.worldManager.loadModel("screen").then(function () {
        chiefClient.jsonApi.findAll("screen", {
          page: {
            size: 50,
            number: 1
          }
        }).then(function (screens) {
          console.log('screens from chief', screens);

          for (let i = 0; i < screens.data.length; i++) {
            let template = screens.data[i];
            (function (t) {
              console.log("register screens ", t.screen_name)
              Vue.component(t.screen_name, function (resolve, reject) {
                resolve({
                  template: t.template,
                  props: ['localData', 'layout'],
                  data: function () {
                    return {
                      styleTag: null,
                    }
                  },
                  computed: {
                    ...mapGetters(["appLayout", "vars"]),
                  },
                  methods: {
                    ...mapActions(['fireEvent', 'setVar', 'setTab'])
                  },
                  beforeDestroy: function () {
                    console.log("destroying template", t);
                    if (this.styleTag) {
                      this.styleTag.remove()
                    }
                  },
                  mounted: function () {
                    console.log("mounted layout: ", t, this.appLayout);

                    if (!this.vars) {
                      this.vars = {}
                    }
                    if (t.css_style) {
                      const css = t.css_style,
                        head = document.head || document.getElementsByTagName('head')[0],
                        style = document.createElement('style');

                      head.appendChild(style);

                      style.type = 'text/css';
                      style.appendChild(document.createTextNode(css));
                      this.styleTag = style;
                    }
                  }
                })
              })
            })(template)
          }
          resolve();

        }).catch(function (err) {
          console.log("Failed to load screens", err);
          reject(err);
        })
      });
    }), new Promise(function (resolve, reject) {
      chiefClient.worldManager.loadModel("layout").then(function () {
        chiefClient.jsonApi.findAll("layout", {
          page: {
            size: 50,
            number: 1
          }
        }).then(function (screens) {
          console.log('layout from chief', screens);

          for (let i = 0; i < screens.data.length; i++) {
            let template = screens.data[i];
            (function (t) {
              console.log("register layout ", t.screen_name)
              Vue.component(t.layout_name, function (resolve, reject) {
                resolve({
                  template: t.template,
                  props: ['localData', 'layout'],
                  data: function () {
                    return {
                      styleTag: null,
                    }
                  },
                  computed: {
                    ...mapGetters(["appLayout", "vars"]),
                  },
                  methods: {
                    ...mapActions(['fireEvent', 'setVar', 'setTab'])
                  },
                  beforeDestroy: function () {
                    console.log("destroying template", t);
                    if (this.styleTag) {
                      this.styleTag.remove()
                    }
                  },
                  mounted: function () {
                    console.log("mounted layout: ", t, this.appLayout);

                    if (!this.vars) {
                      this.vars = {}
                    }
                    if (t.css_style) {
                      const css = t.css_style,
                        head = document.head || document.getElementsByTagName('head')[0],
                        style = document.createElement('style');

                      head.appendChild(style);

                      style.type = 'text/css';
                      style.appendChild(document.createTextNode(css));
                      this.styleTag = style;
                    }
                  }
                })
              })
            })(template)
          }
          resolve();

        }).catch(function (err) {
          console.log("Failed to load screens", err);
          reject(err);
        })
      })
    })
  ])

}
