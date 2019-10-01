<template>
  <div style="height: 100vh" class="row">


    <div class="col-1">
      <div class="row" style="text-align: center; overflow-y: scroll; height: 100vh; overflow-x: hidden">
        <div class="col-12" style="text-align: left; padding-left: 20px; padding-top: 20px; height: 50px">
          <h3 style="color: black">Tabs</h3>
        </div>

        <div class="col-12 tab-icon" style=" height: 110px" @click="setTab('home')" :key="-1" clickable v-ripple>
          <q-icon style="width: 100%; font-size: 70px;" name="home" size="xl"/>
          <span style="font-weight: bolder">Home</span>
        </div>


        <template v-for="(menuItem, index) in appLayout.tabs">
          <div class="col-12 tab-icon" style="padding-top: 10px; height: 150px" @click="setTab(menuItem)"
               :key="index" clickable v-ripple>
            <q-icon @click.stop="setIcon(null, menuItem)" name="build" class="tab-delete" size="sm"
                    style="width: 100%; font-size: 20px; left: 40px; opacity: 0.1; float: left"></q-icon>
            <q-icon @click.stop="deleteTab(menuItem)" name="delete" class="tab-delete" size="sm"
                    style="width: 100%; font-size: 20px; left: 40px; opacity: 0.1; float: left"></q-icon>
            <q-icon :name="menuItem.icon" size="xl" style="width: 100%; font-size: 70px;"></q-icon>
            <span style="font-weight: bolder">{{ menuItem.label }}</span>
          </div>
        </template>
        <div class="col-12" style="padding: 30px">
          <q-btn size="sm" color="black" background="white" @click="newTabNameDialog = true" icon="add"></q-btn>
        </div>
      </div>
    </div>


    <div class="col-11">

      <div v-if="screen" style=" height: 100%" class="row">


        <div class="col-8" style="background: #ebf1f4;padding-top: 150px; padding-left: 250px">

          <br>
          <iframe style="width: 100%; max-width: 320px; min-height: 500px; z-index: -1"
                  class="flower preview-frame"
                  :src="screen.path"></iframe>
        </div>


        <div class="col-4" style="overflow-y: scroll; height: 100vh">
          <div class="row" style="padding: 20px">
            <h2>Events</h2>
          </div>
          <div class="row" style="background: #fff2ef; border-bottom: 1px solid black; padding: 10px"
               :key="actionName"
               v-for="actionName in Object.keys(screen.layout.actions)">
            <div class="col-12" style="margin: 10px">
              <h3>{{actionName}}</h3>
            </div>

            <div class="col-12" style="margin: 10px">
              <q-btn class="action-type-button"
                     :class="{'selected-action-type-button': screen.layout.actions[actionName].type == 'relocate'}"
                     @click="updateEventType(actionName, 'relocate')">Relocate
              </q-btn>
              <q-btn class="action-type-button"
                     :class="{'selected-action-type-button': screen.layout.actions[actionName].type == 'get'}"
                     @click="updateEventType(actionName, 'get')">Get
              </q-btn>
              <q-btn class="action-type-button"
                     :class="{'selected-action-type-button': screen.layout.actions[actionName].type == 'post'}"
                     @click="updateEventType(actionName, 'post')">Post
              </q-btn>
              <q-btn class="action-type-button"
                     :class="{'selected-action-type-button': screen.layout.actions[actionName].type == 'delete'}"
                     @click="updateEventType(actionName, 'delete')">Delete
              </q-btn>
              <q-btn class="action-type-button"
                     :class="{'selected-action-type-button': screen.layout.actions[actionName].type == 'update'}"
                     @click="updateEventType(actionName, 'update')">Update
              </q-btn>
              <q-btn class="action-type-button"
                     :class="{'selected-action-type-button': screen.layout.actions[actionName].type == 'action'}"
                     @click="updateEventType(actionName, 'action')">Action
              </q-btn>

            </div>

            <div class="col-12" style="padding: 10px" v-if="screen.layout.actions[actionName]">

              <v-select v-if="screen.layout.actions[actionName].type == 'relocate'" style="min-width: 200px"
                        :options="Object.keys(appLayout.layoutConfiguration).map(function(e){ return appLayout.layoutConfiguration[e].type == 'single' ? '/' + e + '/{{reference_id}}' : '/' + e })"
                        v-model="screen.layout.actions[actionName].params.path"></v-select>

              <v-select v-if="screen.layout.actions[actionName].type == 'action'"
                        :options="serverActions" value="action_name" label="label"
                        v-model="screen.layout.actions[actionName].params.action_name"
                        :reduce="val => val.action_name"></v-select>

              <v-select v-if="['post', 'put', 'delete'].indexOf(screen.layout.actions[actionName].type) > -1"
                        :options="models" value="table_name" label="table_name"
                        v-model="screen.layout.actions[actionName].params.table_name"
                        :reduce="val => val.table_name"></v-select>


            </div>
            <div class="col-12" style="padding: 10px" v-if="screen.layout.actions[actionName].type == 'relocate'">
              <q-btn label="Edit this page" @click="setScreenByAction(actionName)">

              </q-btn>
              <q-btn label="New page" @click="newScreenNameDialog = true"
                     v-if="screen.layout.actions[actionName].type == 'relocate'">

              </q-btn>
            </div>
            <div class="col-12" style="margin: 10px;">
              <q-btn color="primary" @click="save">Save</q-btn>
            </div>


          </div>

        </div>


      </div>


    </div>

    <q-dialog v-model="newScreenNameDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Path</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="newPathName" autofocus @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Add" @click="addNewPath(newPathName)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import Mustache from 'mustache';


  const toSnakeCase = function (string) {
    var s;
    s = string.replace(/[^\w\s]/g, "");
    s = s.replace(/\s+/g, " ");
    return s.toLowerCase().split(' ').join('_');
  };

  String.prototype.toDash = function () {
    return this.replace(/([_])/g, function ($1) {
      return "-";
    });
  };

  export default {
    computed: {
      ...mapGetters([
        'appLayout',
        'serverActions',
        'models',
      ])
    },
    data() {
      return {
        screen: null,
        newPathName: null,
        newScreenNameDialog: false,
        templateMap: {},
        tab: null,
      }
    },
    name: "Events",
    mounted() {
      console.log("mounted screens");

      const templates = this.appLayout.templates;
      const templateMap = {};
      for (var i = 0; i < templates.length; i++) {
        var template = templates[i];
        templateMap[template.name] = template
      }
      this.templateMap = templateMap;
      this.setTab('home')

    },
    methods: {
      ...mapActions([
        'setLayout',
        'getData',
        'saveConfig',
        'setTemplate',
        'addLayout',
        'addNewTab',
        'createTemplate',
        'refreshActions',
        'invokeEvent',
        'refreshModels']
      ),
      setTab(tab) {
        console.log("load page", tab);

        if (tab == "home") {
          tab = {
            path: "/",
            icon: "home",
            label: "Home"
          }
        }

        this.screen = null;
        this.tab = tab;
        this.pushScreens(tab.path)
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

        if (!layout) {
          console.log("layout is not defined", layoutName)
        }

        let worldSchema = this.getWorldSchema(layout.item);
        console.log("push layout actions", layout, worldSchema);
        this.screen = {
          parent: "Top Level",
          path: path,
          name: path,
          template: this.templateMap[layout.template],
          layout: layout,
          layoutName: layoutName,
          actionName: "TabItemClick",
          table: worldSchema
        };

        if (!layout.actions) {
          return
        }

        that.getData({
          layout: layout,
          params: {}
        }).then(function (data) {
          console.log("loaded data for layout", data);
          that.data = data;
        });
        // this.reloadPreview();
      },
      reloadPreview() {
        let frame = document.getElementsByClassName("preview-frame");
        if (frame.length > 0) {
          frame[0].src = frame[0].src + ""
        }
      },
      save() {
        this.saveConfig();
        this.reloadPreview();
        const screen = this.screen;
        this.screen = null;
        this.screen = screen;
      },
      setScreenByAction(actionName) {
        console.log("goto action", actionName)


        const action = this.screen.layout.actions[actionName];

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

        console.log("register action name", action.params.path, newPath, action, newLayout);
        const currentScreen = this.screen;
        // this.screenHistoryStack.push(currentScreen);
        // this.screen = null;
        // this.screen = {
        //   parent: currentScreen.path,
        //   path: newPath,
        //   name: action.params.path,
        //   mappingName: newLayoutName,
        //   template: this.templateMap[newLayout.template],
        //   layout: newLayout,
        //   layoutName: newLayoutName,
        //   actionName: actionName,
        //   table: this.getWorldSchema(newLayout.item)
        // };
        this.$router.push('/make/screens?layout=' + newPath)

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
      addNewPath(path) {

        console.log("new path", path);
        if (path[0] != '/') {
          path = "/" + path
        }
        var layoutName = toSnakeCase(path.substring(1))
        console.log("layout name", layoutName);
        console.log("template name", layoutName.toDash())

        this.appLayout.layoutConfiguration[layoutName] = {
          'title': "Users",
          'type': 'list',
          "item": "user_account",
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
          template: "card-view-1"
        }

      },
      updateEventType(eventName, type) {
        const screen = this.screen;
        this.screen = null;
        screen.layout.actions[eventName].type = type;
        this.screen = screen
      },
    }
  }
</script>

<style scoped>

</style>
