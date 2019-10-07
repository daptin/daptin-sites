<template>
  <div style="height: 100vh" class="row">


    <div class="col-1">
      <div class="row" style="text-align: center; overflow-y: scroll; height: 100vh; overflow-x: hidden">
        <div class="col-12" style="text-align: left; padding-left: 20px; padding-top: 20px; height: 50px">
          <h3 style="color: black">Tabs</h3>
        </div>

        <div class="col-12 tab-icon" style=" height: 110px" @click="setTab('home')" :key="-1" clickable
             v-ripple>
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

      <div style="height: 100%" v-if="screen" class="row">


        <div class="col-8" style="background: #ebf1f4;padding-top: 150px; padding-left: 250px">

          <br>
          <iframe style="width: 100%; max-width: 320px; min-height: 500px; z-index: -1"
                  class="flower preview-frame"
                  :src="screen.path"></iframe>
        </div>

        <div class="col-4">
          <div class="row" style="padding: 20px">
            <h2>Tab details</h2>
          </div>
          <div class="row" v-if="screen.layout">


            <div class="col-12" style="padding: 10px;">
              Tab title
            </div>

            <div class="col-8" style="padding: 10px;">
              <q-input v-model="screen.layout.title"></q-input>
            </div>

            <div class="col-10" style="margin: 10px;">
              Data single or list:
              <v-select @input="updateScreenType(screen)"
                        v-model="screen.layout.type"
                        :options="['list', 'single']"/>
            </div>


            <div class="col-10" style="margin: 10px;">
              Table name {{screen.layout.item}}
              <v-select @input="updateScreenLayoutItem(screen)"
                        v-model="screen.layout.item"
                        value="table_name" :reduce="model => model.table_name"
                        label="table_name" :options="models"/>
            </div>
            <div class="col-10" style="margin: 10px;">
              View template
              <v-select
                @input="updateScreenTemplate(screen)" :reduce="item => item.name"
                :options="appLayout.templates" label="name"
                value="name"
                v-model="screen.layout.template"></v-select>
            </div>

            <div class="col-12" v-if="mappingVariables.length > 0" style="margin: 10px">
              <div class="col-3">
                <h3>
                  Mapping
                </h3>
                <table style="width: 100%;" v-if="screen.table && templateMap[screen.layout.template]">
                  <tbody>

                  <tr v-for="key in mappingVariables" :key="key">
                    <td style="width: 40%">
                      {{key}}
                    </td>
                    <td style="padding: 0">
                      <v-select style="width: 80%" :reduce="col => col.ColumnName"
                                v-model="screen.layout.transform.item[key]" :options="screenColumnsList"
                                value="ColumnName" label="ColumnName"></v-select>
                    </td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12" style="margin: 10px;">
                <q-btn color="primary" @click="save()">Save</q-btn>
              </div>
            </div>
          </div>

        </div>

      </div>


    </div>
    <q-dialog v-model="deleteTabDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Delete tab</div>
        </q-card-section>
        <q-card-section>
          Are you sure, this cannot be undone
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Yes" @click="deleteTab(null, 'yes')" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="newTabNameDialog" persistent>
      <q-card style="min-width: 400px; height: 600px">
        <q-card-section>
          <div class="text-h6">New tab</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newTabName" placeholder="New Tab Label"></q-input>
          <br>
          Icon
          <v-select v-model="newTabIcon" label="id" icon="id" value="id" :options="icons"></v-select>

        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Add" @click="addTab(newTabName, newTabIcon)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="iconSelection" style="width: 300px; height: 200px">
      <q-card>
        <q-card-section>
          <q-input hint="Tab title" v-if="tabForIconEditor" v-model="tabForIconEditor.label"></q-input>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-12">
              <input v-model="iconSearchText"><br>
            </div>
            <div class="col-12">
              <div class="row">
                <div @click="setIcon(icon)" class="col-4 select-icon" style="padding: 20px; text-align: center"
                     v-for="icon in currentPageIcons"
                     :key="icon.id">
                  <q-icon size="xl" style="font-size: 40px" :name="icon.id"></q-icon>
                  <br>
                  <span>{{icon.id}}</span>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="col-12">
            <q-pagination
              v-model="currentIconPage"
              :boundary-numbers="true"
              :max-pages="6"
              :max="parseInt((icons.length / iconsPerPage)) + 1"></q-pagination>
          </div>
        </q-card-section>

      </q-card>
    </q-dialog>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  const toSnakeCase = function (string) {
    var s;
    s = string.replace(/[^\w\s]/g, "");
    s = s.replace(/\s+/g, " ");
    return s.toLowerCase().split(' ').join('_');
  };


  export default {
    computed: {
      ...mapGetters([
        'appLayout',
        'models',
        'userModels',
        'icons'
      ]),
      mappingVariables: function () {
        if (!this.screen) {
          return [];
        }
        console.log("mapping variables", this.screen.layoutName)
        return this.screen.template.variables;
      },
      currentPageIcons: function () {
        const that = this;
        if (this.iconSearchText == null || this.iconSearchText.trim().length == 0) {
          return this.icons.slice((this.currentIconPage - 1) * this.iconsPerPage, this.currentIconPage * this.iconsPerPage)
        } else {
          return this.icons.filter(function (e) {
            // console.log('search in', e, that.iconSearchText)
            return e.id.indexOf(that.iconSearchText) > -1;
          }).slice((this.currentIconPage - 1) * this.iconsPerPage, this.currentIconPage * this.iconsPerPage)
        }
      }

    },
    name: "Screens",
    mounted() {
      console.log("mounted screens");
      console.log("maasdfaf", this.$route)
      const templates = this.appLayout.templates;
      const templateMap = {};
      for (var i = 0; i < templates.length; i++) {
        var template = templates[i];
        templateMap[template.name] = template
      }
      this.templateMap = templateMap;
      if (this.$route.query.layout) {
        this.pushScreens(this.$route.query.layout)
      } else {
        this.setTab('home')
      }
    },
    data() {
      return {
        screen: null,
        tabForIconEditor: null,
        iconsPerPage: 12,
        iconSearchText: null,
        currentIconPage: 1,
        templateMap: {},
        iconSelection: false,
        newTabNameDialog: false,
        newTabName: null,
        newTabIcon: null,
        tabToDelete: null,
        deleteTabDialog: false,
      }
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
      reloadPreview() {
        let frame = document.getElementsByClassName("preview-frame");
        if (frame.length > 0) {
          frame[0].src = frame[0].src + ""
        }
      },
      save() {
        this.saveConfig();
        this.reloadPreview();
      },
      setIcon(icon, tab) {
        console.log("set icon")
        if (!icon) {
          this.iconSelection = true;
          this.tabForIconEditor = tab;
          return;
        }
        this.tabForIconEditor.icon = icon.id
        this.iconSelection = false;
        this.saveConfig();
        this.reloadPreview();
      },
      screenColumns: function () {
        this.screenColumnsList = this.screen.table.schema.Columns;
        console.log("screen column mapping list", this.screenColumnsList, JSON.stringify(this.screenColumnsList))
      },

      addTab(tabName, newTabIcon) {
        this.newTabNameDialog = false;

        var newLayoutForTab = toSnakeCase(tabName);

        var layoutConfig = {
          "item": this.userModels[0].table_name,
          "type": "list",
          "title": tabName,
          "transform": {
            list: "data",
            item: {
              reference_id: "reference_id",
            }
          },
          "template": "json-view",
          "actions": {},
        };
        if (this.appLayout.layoutConfiguration[newLayoutForTab]) {
          layoutConfig = this.appLayout.layoutConfiguration[newLayoutForTab];
        } else {
          // this.appLayout.layoutConfiguration[newLayoutForTab] = layoutConfig;
          this.addLayout({
            name: newLayoutForTab,
            config: layoutConfig
          })
        }
        if (layoutConfig.type == "list") {
          this.addNewTab({'label': tabName, 'icon': newTabIcon.id, 'path': "/" + newLayoutForTab + ""})
        } else {
          this.addNewTab({'label': tabName, 'icon': newTabIcon.id, 'path': "/" + newLayoutForTab + "/{{reference_id}}"})
        }
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

        this.screen = null;
        setTimeout(function () {
          that.screen = {
            path: path,
            name: path,
            template: that.templateMap[layout.template],
            layout: layout,
            layoutName: layoutName,
            table: worldSchema
          };
          that.screenColumnsList = that.screen.table.schema.Columns;
          that.reloadPreview();
        }, 50)


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
      deleteTab(tabInfo, confirm) {

        if (confirm != 'yes') {

          this.tabToDelete = tabInfo;
          console.log("Delete tab", tabInfo);
          this.deleteTabDialog = true;
        } else {
          var remove = -1
          for (var i = 0; i < this.appLayout.tabs.length; i++) {
            if (this.appLayout.tabs[i].path == this.tabToDelete.path && this.appLayout.tabs[i].label == this.tabToDelete.label) {
              remove = i;
              break;
            }
          }

          if (remove != -1) {
            this.appLayout.tabs.splice(remove, 1)
          }
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
          this.reloadPreview();
        }
        this.screenColumns();
      },

      updateScreenTemplate(screen) {
        if (!screen.layout.template) {
          return
        }
        console.log("update screen template", screen.layout.template)
        screen.template = this.templateMap[screen.layout.template]

        screen.layout.actions = {};

        for (var event in screen.template.events) {
          console.log("Create event in layout", screen.template.events[event].name)
          if (!screen.layout.actions[screen.template.events[event].name]) {
            screen.layout.actions[screen.template.events[event].name] = {
              params: {},
              type: 'relocate'
            }
          }
        }
        console.log("updated screen template ", screen)
        // this.$forceUpdate();
        this.saveConfig();
        this.reloadPreview();
        const screen1 = this.screen;
        this.screen = [];
        this.screen = screen1;
        // this.setTab(this.tab)
        // this.screenColumns()
      },

      updateScreenLayoutItem(screen) {
        console.log("updated screen layout item", screen.layout.item);
        this.screen.table = this.getWorldSchema(screen.layout.item);
        this.screenColumnsList = this.screen.table.schema.Columns;
        console.log("updated screeen table")
        this.saveConfig();
        this.reloadPreview();
      },


      saveLayoutTitle(title) {
        this.appLayout.layoutConfiguration[this.screen.layoutName].title = title
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
    }
  }
</script>

<style scoped>

</style>
