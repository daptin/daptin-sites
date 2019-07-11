<template>


  <q-layout view="hhh lpR fFf">


    <q-drawer v-model="left" side="left" bordered>

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

    <q-page-container>

      <q-page>
        <div class="col-12" v-for="(screen, i) in screens" :key="i">
          <div class="q-gutter-md row items-start">
            <div class="q-gutter-md row items-start">


              <q-card-section>
                <h3>{{screen.layoutName}}</h3>
              </q-card-section>

              <q-card-section>
                <q-btn color="green" @click="saveTemplate(screen.template, i)" label="Update"></q-btn>
                <q-btn color="green" label="New action"></q-btn>
              </q-card-section>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <iframe style="width: 100%; height: 100%; z-index: -1"
                      class="flower preview-frame"
                      :src="screen.path"></iframe>
              <div style="width: 100%; height: 100%; z-index: 1"></div>

            </div>
            <div class="col-6" style="height: 100%">


              <q-card bordered class="my-card">
                <q-card-section>
                  <div class="q-gutter-md row items-start">

                    <q-select style="width: 60px" size="sm" v-model="screen.layout.type"
                              :options="['list', 'single']"/>
                    <q-select map-options emit-value style="width: 150px" size="sm" v-model="screen.layout.item"
                              option-value="table_name"
                              option-label="table_name" :options="models"/>
                    <q-select use-input use-chips new-value-mode="add-unique" @new-value="newTemplate"
                              @input="updateScreenTemplate(screen, i)" map-options emit-value style="width: 200px"
                              :options="appLayout.templates" option-label="name"
                              option-value="name"
                              v-model="screen.layout.template"></q-select>
                  </div>
                </q-card-section>

                <q-card-section>
                  <editor v-model="screen.template.template" @input="updateTemplate(screen.template)" width="100%"
                          height="450px" lang="vue"></editor>
                </q-card-section>
              </q-card>


            </div>
            <div class="col-3">
              <div class="row">
                <div class="col-12">

                  <div class="text-h4">Actions</div>
                  <q-card flat bordered v-for="(actionConfig, actionName) in screen.layout.actions" :key="actionName">
                    <q-card-section>
                      <sui-segment>
                        <h2>{{actionName}}</h2>
                        <q-form>

                          <q-input v-model="actionConfig.path"/>
                          <q-btn size="xs" color="red" label="Delete"></q-btn>
                        </q-form>
                      </sui-segment>
                    </q-card-section>
                  </q-card>

                </div>
                <div class="col-12" style="max-height: 200px; overflow-y: scroll; overflow-x: hidden">
                  <table>
                    <tbody>

                    <tr v-for="column in screen.table.schema.Columns" :key="column.Name">
                      <td>
                        {{column.Name}}
                      </td>
                      <td style="padding: 0">
                        <input style="height: 100%; border: none"
                               v-model="screen.layout.transform.item[column.Name]"/>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12" v-if="tab">
          <q-btn label="Add screen" size="lg"></q-btn>
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
          <q-select use-input @new-value="newLayout" size="sm" v-model="newTabLayout" :options="layouts"
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

      transformedFlowerData() {
        const data = {
          name: 'Top Level',
          children: this.screens.map(screen => ({
            ...screen,
            size: 0,
            parent: 'Top Level'
          }))
        };
        console.log("transformed data", data);
        return data;
      },


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
        newTabName: '',
        newTabIcon: '',
        newScreenName: '',
        newActionName: '',
        templateMap: {}
      };
    },
    methods: {
      newLayout(name, done) {
        console.log("add new layout", name)
        if (!this.appLayout.layoutConfiguration[name]) {
          this.appLayout[name] = {
            type: "list",
            item: "user_account",
            transform: {
              list: "data",
              item: {}
            },
            template: "card-view-1"
          };
          this.layouts.push(name)
        }
        done(name)
      },
      newTemplate(newTemplateName, done) {
        console.log("new template name", arguments)
        this.createTemplate({name: newTemplateName})
        done(newTemplateName, "add-unique")
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

        if (!layout.actions) {
          return
        }

        const actionNames = Object.keys(layout.actions);


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


        this.getData({
          layout: layout,
          params: {}
        }).then(function (data) {
          console.log("loaded data for layout", data);
          var toExplore = [];
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
