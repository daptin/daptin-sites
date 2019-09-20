<template>


  <q-layout view="hhh lpR fFf">


    <q-drawer content-class="primary-color" color="#272643" :width="200" v-model="left" side="left" bordered>

      <q-list>
        <q-item-label header><h3 style="color: white">Make</h3></q-item-label>

        <q-item clickable @click.native="selectedTab = 'appSetting'"
                :class="{'selected-maker-tab': selectedTab == 'appSetting'}">
          <q-item-section>App Layout</q-item-section>
        </q-item>
        <q-item clickable @click.native="selectedTab = 'screens'"
                :class="{'selected-maker-tab': selectedTab == 'screens'}">
          <q-item-section>Screens</q-item-section>
        </q-item>
        <q-item clickable @click.native="selectedTab = 'events'"
                :class="{'selected-maker-tab': selectedTab == 'events'}">
          <q-item-section>Events</q-item-section>
        </q-item>
        <q-item clickable @click.native="selectedTab = 'publish'"
                :class="{'selected-maker-tab': selectedTab == 'publish'}">
          <q-item-section>Publish</q-item-section>
        </q-item>


      </q-list>


      <!-- drawer content -->
    </q-drawer>

    <q-page-container>

      <div class="row" v-if="selectedTab == 'appSetting'">

        <div class="col-12" style="padding: 10vh 25vw">

          <form>

            <div>
              <label>Daptin End point</label>
              <input class="d-input" v-model="appLayout.endpoint" type="text">
            </div>
            <div>
              <label>PRIMARY COLOR HEX CODE</label>
              <input class="d-input" v-model="appLayout.style.background" type="text">
            </div>

            <div>
              <label>Logo URL</label>
              <input class="d-input" type="text">
            </div>

            <q-btn style="margin-top: 20px" color="blue" @click="selectedTab = 'screens'">Next</q-btn>


          </form>

        </div>

      </div>


      <div style="height: 100vh" class="row" v-if="selectedTab == 'screens'">


        <div class="col-1">
          <div class="row" style="text-align: center; overflow-y: scroll; height: 100vh; overflow-x: hidden">
            <div class="col-12" style="text-align: left; margin: 20px;">
              <h3 style="color: black">Tabs</h3>
            </div>

            <div class="col-12 tab-icon" style="padding-bottom: 20px;" @click="setTab('home')" :key="-1" clickable
                 v-ripple>
              <q-icon style="width: 100%; font-size: 70px;" name="home" size="xl"/>
              <span style="font-weight: bolder">Home</span>
            </div>


            <template v-for="(menuItem, index) in appLayout.tabs">
              <div class="col-12 tab-icon" style="padding-top: 30px; padding-bottom: 20px;" @click="setTab(menuItem)"
                   :key="index" clickable v-ripple>
                <q-icon :name="menuItem.icon" size="xl" style="width: 100%; font-size: 70px;"/>
                <span style="font-weight: bolder">{{ menuItem.label }}</span>
              </div>
            </template>
            <div class="col-12" style="padding: 30px">
              <q-btn size="sm" color="black" background="white" @click="newTabNameDialog = true" icon="add"></q-btn>
            </div>
          </div>
        </div>


        <div class="col-11" v-for="(screen, i) in screens" :key="i">


          <div style=" height: 100%" class="row">


            <div class="col-8" style="background: #ebf1f4;padding-top: 150px; padding-left: 250px">
              <iframe style="width: 100%; max-width: 320px; min-height: 500px; z-index: -1"
                      class="flower preview-frame"
                      :src="screen.path"></iframe>
            </div>

            <div class="col-3">
              <div class="row" style="padding: 20px">
                <h2>Tab details</h2>
              </div>
              <div class="row">


                <div class="col-12" style="padding: 10px;">
                  Tab Name
                </div>

                <div class="col-8" style="padding: 10px;">
                  <q-input v-model="tab.label"></q-input>
                </div>

                <div class="col-3" style="margin: 10px;">
                  <q-icon style="font-size: 4rem;" :name="tab.icon" @click.native="iconSelection = true"/>
                </div>


                <div class="col-12" style="margin: 10px;">
                  <q-select filled @input="updateScreenType(screen)" size="sm"
                            v-model="screen.layout.type"
                            :options="['list', 'single']"/>
                </div>


                <div class="col-12" style="margin: 10px;">
                  <q-select filled map-options emit-value size="sm" v-model="screen.layout.item"
                            option-value="table_name"
                            option-label="table_name" :options="models"/>
                </div>
                <div class="col-12" style="margin: 10px;">

                  <q-select filled
                            @input="updateScreenTemplate(screen, i)" map-options emit-value
                            :options="appLayout.templates" option-label="name"
                            option-value="name"
                            v-model="screen.layout.template"></q-select>
                </div>

                <!--<div class="col-12">-->
                <!--<q-select borderless :options="Object.keys(appLayout.layoutConfiguration)"-->
                <!--v-model="screen.layoutName"></q-select>-->
                <!--</div>-->

                <!--<div class="col-12">-->
                <!--<q-btn color="green" @click="saveTemplate(screen.template, i)" label="Update"></q-btn>-->
                <!--<q-btn label="New layout" color="green" @click="newLayoutDialog = true"></q-btn>-->
                <!--</div>-->
              </div>

            </div>


          </div>


        </div>

      </div>


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

    <q-dialog v-model="newMappingDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Key name</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="newMappingName" autofocus @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Add" @click="addNewMapping(newMappingName)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="newLayoutDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Layout name</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="newLayoutName" autofocus @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Add" @click="newLayout(newLayoutName)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="iconSelection" style="width: 300px; height: 200px">
      <q-card>
        <div class="row">
          <div class="col-12">
            <input>
          </div>
          <div class="col-1" v-for="icon in currentPageIcons" :key="icon.id">
            <q-icon style="width: 50px; height: 50px;" :name="icon.id"></q-icon>
          </div>
          <div class="col-12">
            <q-pagination
              v-model="currentIconPage"
              :max="5"></q-pagination>
          </div>
        </div>

      </q-card>
    </q-dialog>

    <q-dialog v-model="newActionNameDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Action Name</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="newActionName" label="Action Name" autofocus @keyup.enter="prompt = false"/>
          <q-select dense v-model="newActionType" :options="['relocate', 'post', 'put', 'delete', 'action']"
                    label="Action Type"
                    autofocus @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Add" @click="addAction(newActionName, newActionType)" v-close-popup/>
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
        'icons',
        'serverActions'
      ]),
      currentPageIcons: function () {
        return this.icons.slice((this.currentIconPage - 1) * 10, this.currentIconPage * 10)
      }
    },
    name: "MyLayout",
    data() {
      return {
        selectedTab: 'appSetting',
        flowers: [],
        tab: null,
        left: this.$q.platform.is.desktop,
        screens: [],
        newTabNameDialog: false,
        newScreenNameDialog: false,
        newActionNameDialog: false,
        iconSelection: false,
        newMappingDialog: false,
        newLayoutDialog: false,
        currentIconPage: 1,
        newMappingName: '',
        newTabLayout: '',
        newTabTemplate: '',
        layouts: [],
        newTabItem: 'user_account',
        newTabName: null,
        newTabIcon: null,
        newScreenName: '',
        newActionName: '',
        newLayoutName: '',
        newActionType: '',
        templateMap: {},
        data: null,
        screenHistoryStack: []
      };
    },
    methods: {
      newLayout(name, done) {
        console.log("add new layout", name)
        if (!this.appLayout.layoutConfiguration[name]) {
          const templateName = name + "_template";
          this.newTemplate(templateName)
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
        if (done) {
          done(name)
        }
      },
      newTemplate(newTemplateName, done) {
        console.log("new template name", arguments)
        this.createTemplate({
          name: newTemplateName
        })
        if (done) {
          done(newTemplateName, "add-unique")
        }
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
      addAction(actionName, type) {
        console.log('add action', actionName, type)

        if (!this.screens[0].layout.actions) {
          this.screens[0].layout.actions = {};
        }

        this.screens[0].layout.actions[actionName] = {
          type: type,
          params: {}
        }
      },
      addNewMapping(mappingName) {
        console.log('add mapping', mappingName, this.screens)
        this.screens[0].layout.transform.item[mappingName] = "";
      },

      deleteAction(actionName) {
        console.log("delete action", actionName)
        // delete this.screens[0].layout.actions[actionName];
        Vue.delete(this.screens[0].layout.actions, actionName)
      },
      setScreenByAction(actionName) {
        console.log("goto action", actionName)


        const action = this.screens[0].layout.actions[actionName];

        let newPath;
        if (!action.params.path) {
          console.log("action is not a relocation", action)
          return
        }
        if (this.data instanceof Array) {
          if (this.data.length == 0) {
            console.log("no data to open next page: ", action, layout)
            return
          }
          newPath = Mustache.render(action.params.path, this.data[0]);
        } else {
          newPath = Mustache.render(action.params.path, this.data);
        }
        var newLayoutName = newPath.split("/")[1];
        const newLayout = this.appLayout.layoutConfiguration[newLayoutName]

        console.log("register action name", action.params.path, newPath, action);
        const currentScreen = this.screens.pop();
        this.screenHistoryStack.push(currentScreen);
        this.screens.push({
          parent: currentScreen.path,
          path: newPath,
          name: action.params.path,
          mappingName: newLayoutName,
          template: this.templateMap.get(newLayout.template),
          layout: newLayout,
          layoutName: newLayoutName,
          actionName: actionName,
          table: this.getWorldSchema(newLayout.item)
        });

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
      ...mapActions(['setLayout', 'getData', 'saveConfig', 'setTemplate', 'addNewTab', 'createTemplate', 'refreshActions']),
      setTab(tab) {
        console.log("load page", tab);
        // this.setLayout(tab.layout);
        // this.$router.push(tab.path);


        if (tab == "home") {
          tab = {
            path: "/",
            icon: "home",
            label: "Home"
          }
        }

        this.screens = [];
        this.tab = tab;
        this.pushScreens(tab.path)
        const that = this;
        // setTimeout(function () {
        //
        //   that.$refs.templateEditor[0].editor.setWrapBehavioursEnabled(true)
        //   that.$refs.templateEditor[0].editor.setOption('wrap', 80);
        // }, 300)
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
        var layoutName = path.split("/")[1];
        console.log("push ");

        if (layoutName == "") {
          layoutName = this.appLayout.homeLayout;
        }

        const layout = this.appLayout.layoutConfiguration[layoutName];

        let worldSchema = this.getWorldSchema(layout.item);
        console.log("push layout actions", layout, worldSchema);
        this.screens.push({
          parent: "Top Level",
          path: path,
          name: path,
          template: this.templateMap.get(layout.template),
          layout: layout,
          layoutName: layoutName,
          actionName: "TabItemClick",
          table: worldSchema
        });


        if (!layout.actions) {
          return
        }

        this.getData({
          layout: layout,
          params: {}
        }).then(function (data) {
          console.log("loaded data for layout", data);
          that.data = data;
        })


      },
    },
    mounted() {
      this.refreshActions();
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
      this.setTab('home');

    },
  };
</script>

<style></style>
