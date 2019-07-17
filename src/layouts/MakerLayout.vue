<template>


  <q-layout view="hhh lpR fFf">

    <q-page-container>

      <q-drawer :width="300" v-model="left" side="left" bordered>

        <q-list>
          <template v-for="(menuItem, index) in appLayout.tabs">
            <q-item @click="setTab(menuItem)" :key="index" clickable v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"/>
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>

            <q-separator v-if="menuItem.separator" :key="'sep_'  + index"/>

          </template>
          <q-item>
            <q-btn label="Add tab" @click="newTabNameDialog = true" style="width: 100%"></q-btn>
          </q-item>


        </q-list>


        <!-- drawer content -->
      </q-drawer>


      <q-page>
        <div class="col-12" v-for="(screen, i) in screens" :key="i">


          <q-bar>
            Layout &nbsp;
            <q-select borderless :options="Object.keys(appLayout.layoutConfiguration)"
                      v-model="screen.layoutName"></q-select>
            <q-space/>
            <q-btn color="green" @click="saveTemplate(screen.template, i)" label="Update"></q-btn>
          </q-bar>
          <div class="row">
            <q-icon style="font-size: 4rem;" :name="tab.icon"/>
            <q-input v-model="tab.label"></q-input>

            <q-select filled @input="updateScreenType(screen)" size="sm" v-model="screen.layout.type"
                      :options="['list', 'single']"/>
            <q-select filled map-options emit-value size="sm" v-model="screen.layout.item"
                      option-value="table_name"
                      option-label="table_name" :options="models"/>
            <q-select filled use-input use-chips new-value-mode="add-unique" @new-value="newTemplate"
                      @input="updateScreenTemplate(screen, i)" map-options emit-value
                      :options="appLayout.templates" option-label="name"
                      option-value="name"
                      v-model="screen.layout.template"></q-select>

          </div>
          <div class="row" style="height: 450px">
            <div class="col-3">
              <iframe style="width: 100%; height: 450px; z-index: -1"
                      class="flower preview-frame"
                      :src="screen.path"></iframe>

            </div>
            <div class="col-9" style="height: 100%">
              <editor v-model="screen.template.template" @input="updateTemplate(screen.template)" width="100%"
                      height="450px" theme="monokai" lang="html"></editor>
            </div>
          </div>
          <div class="row">
            <div class="col-3" style="overflow-x: hidden; overflow-y:scroll;">

              <q-bar>
                Mapping
              </q-bar>
              <table style="width: 100%;">
                <tbody>

                <tr v-for="key in Object.keys(screen.layout.transform.item)" :key="key">
                  <td style="width: 40%">
                    {{key}}
                  </td>
                  <td style="padding: 0">
                    <v-select :reduce="col => col.ColumnName"
                              v-model="screen.layout.transform.item[key]" :options="screen.table.schema.Columns"
                              value="ColumnName" label="ColumnName"></v-select>
                  </td>
                  <td></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="col-4">
              <q-bar>CSS Style</q-bar>
              <editor v-model="screen.template.style" lang="css" theme="monokai" style="height: 100%">css</editor>
            </div>
            <div class="col-5">
              <q-bar>Actions</q-bar>
              <table style="margin-top: 0" class="ui celled table">
                <thead>
                <tr>
                  <th>Action</th>
                  <th>Type</th>
                  <th>To</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(action) in Object.keys(screen.layout.actions)" :key="action">
                  <td>{{action}}</td>
                  <td>{{screen.layout.actions[action].type}}</td>
                  <td>

                    <v-select style="min-width: 200px"
                              :options="Object.keys(appLayout.layoutConfiguration).map(function(e){ return appLayout.layoutConfiguration[e].type == 'single' ? '/' + e + '/{{reference_id}}' : '/' + e })"
                              v-model="screen.layout.actions[action].path"></v-select>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </q-page>


    </q-page-container>

    <q-dialog v-model="newTabNameDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">New tab</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newTabName" placeholder="New Tab Label"></q-input>
          <q-select use-input use-chips @new-value="newLayout" size="sm" v-model="newTabLayout" :options="layouts"
                    label="Layout"/>
          <q-select v-model="newTabIcon" option-label="id" option-value="id" :options="icons" label="Icon">
          </q-select>

        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Add" @click="addTab(newTabName, newTabIcon, newTabLayout)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="newScreenNameDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Tab name</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="newTabName" autofocus @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Add" @click="addTab(newTabName)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="newActionNameDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Tab name</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="newTabName" autofocus @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Add" @click="addTab(newTabName)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-layout>


</template>

<script>
  import {openURL} from "quasar";
  import {mapGetters, mapActions} from 'vuex';
  import Mustache from 'mustache';
  import Vue from 'vue';

  export default {
    watch: {
      'appLayout.templates': function () {
        console.log("templates changed")
        const templates = this.appLayout.templates;
        const templateMap = new Map();
        for (var i = 0; i < templates.length; i++) {
          var template = templates[i];
          templateMap.set(template.name, template)
        }
        this.templateMap = templateMap;
        for (var i = 0; i < this.screens.length; i++) {
          this.screens[i].template = this.templateMap.get(this.screens[i].layout.template)
        }
      },
      'appLayout.layoutConfiguration': function () {
        console.log("layout config changed")
        this.layouts = Object.keys(this.appLayout.layoutConfiguration)
      }
    },
    computed: {
      ...mapGetters([
        'appLayout',
        'user',
        'layout',
        'models',
        'icons'
      ]),
    },
    name: "MyLayout",
    data() {
      return {
        flowers: [],
        tab: null,
        left: this.$q.platform.is.desktop,
        screens: [],
        newTabNameDialog: false,
        newScreenNameDialog: false,
        newActionNameDialog: false,
        newTabLayout: '',
        newTabTemplate: '',
        layouts: [],
        newTabItem: 'user_account',
        newTabName: null,
        newTabIcon: null,
        newScreenName: '',
        newActionName: '',
        templateMap: {},
        data: null,
      };
    },
    methods: {
      newLayout(name, done) {
        console.log("add new layout", name)
        if (!this.appLayout.layoutConfiguration[name]) {
          const templateName = name + "_template";
          this.newTemplate(templateName, function () {
          })
          this.appLayout.layoutConfiguration[name] = {
            type: "list",
            item: "user_account",
            transform: {
              list: "data",
              item: {}
            },
            template: templateName
          };
          this.layouts.push(name)
        }
        done(name)
      },
      newTemplate(newTemplateName, done) {
        console.log("new template name", arguments)
        this.createTemplate({
          name: newTemplateName
        })
        done(newTemplateName, "add-unique")
      },
      updateScreenType(screen) {
        console.log("update screen type", screen)
        const existingPath = screen.path;
        let newPath = null;
        if (screen.layout.type == "list") {
          newPath = "/" + screen.layoutName;
        } else {
          newPath = "/" + screen.layoutName + "/{{reference_id}}";
        }
        if (newPath) {

          for (var i = 0; i < this.appLayout.tabs.length; i++) {
            if (this.appLayout.tabs[i].path == existingPath) {
              this.appLayout.tabs[i].path = newPath;
            }
          }
          this.saveConfig()
        }
      },
      updateScreenTemplate(screen, frameIndex) {
        if (!screen.layout.template) {
          return
        }
        screen.template = this.templateMap.get(screen.layout.template)
        console.log("updated screen template ", screen)
        this.saveConfig();
        document.getElementsByClassName("preview-frame")[frameIndex].src = document.getElementsByClassName("preview-frame")[frameIndex].src + "";

      },
      addTab(tabName, newTabIcon, layout) {
        this.newTabNameDialog = false;
        const layoutConfig = this.appLayout.layoutConfiguration[layout];
        if (layoutConfig.type == "list") {
          this.addNewTab({'label': tabName, 'icon': newTabIcon.id, 'path': "/" + layout + "/template"})
        } else {
          this.addNewTab({'label': tabName, 'icon': newTabIcon.id, 'path': "/" + layout + "/template/{{reference_id}}"})
        }
      },
      saveTemplate(template, frameIndex) {
        console.log("update template", arguments)
        this.setTemplate(template);
        this.saveConfig();
        template.showSave = false;
        document.getElementsByClassName("preview-frame")[frameIndex].src = document.getElementsByClassName("preview-frame")[frameIndex].src + "";
      },
      updateTemplate(template) {
        console.log("update template", arguments)
        template.showSave = true;
      },
      openURL,
      ...mapActions(['setLayout', 'getData', 'saveConfig', 'setTemplate', 'addNewTab', 'createTemplate']),
      setTab(tab) {
        console.log("load page", tab);
        // this.setLayout(tab.layout);
        // this.$router.push(tab.path);
        this.screens = [];
        this.tab = tab;
        this.pushScreens(tab.path)
      },
      getWorldSchema(worldName) {
        console.log("get world schema for", worldName)
        for (var i = 0; i < this.models.length; i++) {
          if (this.models[i].table_name == worldName) {
            return this.models[i];
          }
        }
        return null;
      },
      pushScreens(path) {
        const that = this;
        console.log("push screens from ", path);
        const layoutName = path.split("/")[1];
        console.log("push ");
        const layout = this.appLayout.layoutConfiguration[layoutName];
        console.log("push layout actions", layout);
        this.screens.push({
          parent: "Top Level",
          path: path,
          name: path,
          template: this.templateMap.get(layout.template),
          layout: layout,
          layoutName: layoutName,
          actionName: "TabItemClick",
          table: this.getWorldSchema(layout.item)
        });


        if (!layout.actions) {
          return
        }

        const actionNames = Object.keys(layout.actions);


        this.getData({
          layout: layout,
          params: {}
        }).then(function (data) {
          console.log("loaded data for layout", data);
          var toExplore = [];
          that.data = data;
          return;
          for (var i in actionNames) {
            const actionName = actionNames[i];
            const action = layout.actions[actionName];

            let newPath;
            if (!action.path) {
              continue
            }
            if (data instanceof Array) {
              if (data.length == 0) {
                console.log("no data to open next page: ", action, layout)
                continue
              }
              newPath = Mustache.render(action.path, data[0]);
            } else {
              newPath = Mustache.render(action.path, data);
            }
            var newLayoutName = newPath.split("/")[1];
            const newLayout = that.appLayout.layoutConfiguration[newLayoutName]

            console.log("register action name", action.path, newPath, action, layout);
            that.screens.push({
              parent: path,
              path: newPath,
              name: action.path,
              mappingName: layoutName,
              template: that.templateMap.get(newLayout.template),
              layout: newLayout,
              layoutName: newLayoutName,
              actionName: actionName,
              table: that.getWorldSchema(newLayout.item)
            });


            let exists = false;

            for (var i = 0; i < that.screens.length; i++) {
              if (that.screens[i].name == action.path) {
                exists = true;
              }
            }

            if (!exists) {
              toExplore.push(action.path);
            }
          }

          for (var i in toExplore) {
            that.pushScreens(toExplore[i])
          }
        })


      },
    },
    mounted() {
      if (!this.user) {
        this.$router.push("/")
      }

      const templates = this.appLayout.templates;
      const templateMap = new Map();
      for (var i = 0; i < templates.length; i++) {
        var template = templates[i];
        templateMap.set(template.name, template)
      }
      this.templateMap = templateMap;
      this.layouts = Object.keys(this.appLayout.layoutConfiguration)


    },
  };
</script>

<style></style>
