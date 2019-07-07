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
        <div class="col-12" v-if="screens.length > 0">
          <q-card>

            Item: {{screens[0].layout.item}}
          </q-card>
        </div>
        <div class="col-12" v-for="(screen, i) in screens" :key="i">
          <div class="row">
            <div class="col-3">
              <iframe style="width: 100%; height: 100%"
                      class="flower preview-frame"
                      :src="screen.path"
              ></iframe>

            </div>
            <div class="col-8">


              <q-card bordered class="my-card">
                <q-card-section style="height: 80px">
                  <div class="text-h6">
                    {{screen.parent}} === [{{screen.actionName}}] => {{screen.layout.template}} {{screen.layout.item}}
                  </div>
                </q-card-section>
                <q-separator dark inset/>

                <div class="q-pa-md" style="background: white">

                </div>
                <q-card-section>
                  <editor v-model="screen.template.template" @input="updateTemplate(screen.template)" width="100%"
                          height="350px" lang="vue"></editor>
                </q-card-section>
                <q-card-section v-if="screen.template.showSave">
                  <q-btn color="green" @click="saveTemplate(screen.template, i)" label="Update"></q-btn>
                </q-card-section>
              </q-card>


            </div>
          </div>
        </div>

      </q-page>


    </q-page-container>

    <q-dialog v-model="newTabNameDialog" persistent>
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
  import {hierarchy, pack} from 'd3-hierarchy'
  import Mustache from 'mustache';

  import Vue from 'vue';

  export default {
    watch: {},
    computed: {
      ...mapGetters([
        'appLayout',
        'user',
        'layout',
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

      layoutData() {
        // Generate a D3 hierarchy
        const rootHierarchy = hierarchy(this.transformedFlowerData)
          .sum(d => d.size)
          .sort((a, b) => {
            return b.value - a.value
          });

        // Pack the circles inside the viewbox
        let v = pack()
          .size([500, 500])
          .padding(10)(rootHierarchy);
        console.log("layout data", v);
        return v;
      }


    },
    name: "MyLayout",
    data() {
      return {
        flowers: [],
        left: this.$q.platform.is.desktop,
        screens: [],
        newTabNameDialog: false,
        newTabName: '',
        templateMap: {}
      };
    },
    methods: {
      addTab(tabName) {
        this.newTabNameDialog = false;
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
      ...mapActions(['setLayout', 'getData', 'saveConfig', 'setTemplate']),
      setTab(tab) {
        console.log("load page", tab);
        // this.setLayout(tab.layout);
        // this.$router.push(tab.path);
        this.screens = [];
        this.pushScreens(tab.path)
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
          actionName: "TabItemClick"
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
              actionName: actionName
            });


            let exists = false;

            for (var i = 0; i < that.screens.length; i++) {
              if (that.screens[i].path == action.path) {
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


    },
  };
</script>

<style></style>
