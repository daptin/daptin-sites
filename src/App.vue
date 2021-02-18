<template>
  <div style="width: 100vw; height: 100vh" id="q-app" v-touch-hold:1500.mouse="setEndpoint">
    <router-view/>
    <q-dialog v-model="newEndpointDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">New endpoint</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="appLayout.endpoint" autofocus @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Make" @click="make()" v-close-popup/>
          <q-btn flat label="Update" @click="updateEndpoint()" v-close-popup/>
          <q-btn flat label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>


  </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex';
import {colors} from 'quasar';
import Vue from 'vue';

export default {
  computed: {
    ...mapGetters([
      'appLayout',
    ]),
    ...mapState(['path', 'models'])

  },
  name: "App",
  data: function () {
    return {
      newEndpointDialog: false,
    }
  },
  mounted: function () {
    // this.refreshModels();
    const that = this;
    colors.setBrand('primary', this.appLayout.style.primary);
    colors.setBrand('secondary', this.appLayout.style.secondary);
    console.log("App mounted, parse components", this.appLayout);
    var requestedTemplateNames = Object.values(this.appLayout.layoutConfiguration).map(e => e.template);


    var templateMap = {};
    for (var i = 0; i < this.appLayout.templates.length; i++) {
      let template = this.appLayout.templates[i];
      templateMap[template.name] = template;
      if (!template.style) {
        template.style = "";
      }
      console.log("register template", template);
      this.createComponent(template);


    }
    console.log("requested template names", requestedTemplateNames)
    for (var i = 0; i < requestedTemplateNames.length; i++) {
      if (templateMap[requestedTemplateNames[i]] === undefined) {
        console.log("unregistered template name requested", requestedTemplateNames[i])
        let template1 = {name: requestedTemplateNames[i]};
        templateMap[template1.name] = template1;
        this.createComponent(template1)
      }
    }
  },
  methods: {
    createComponent(template) {
      (function (t) {
        console.log("Create component", t)
        Vue.component(t.name, function (resolve, reject) {
          let element = t.template || "<div>component template not found: " + t.name + "</div>";

          resolve({
            template: element,
            props: ['localData', 'layout'],
            name: t.name,
            data: function () {
              return {
                styleTag: null,
              }
            },
            computed: {
              ...mapGetters(["vars"])
            },
            methods: {
              itemSingleClick: function (row, i) {
                // console.log("single item clicked", arguments)
                // this.$emit("item-single-clicked", row, i)
              },
              ...mapActions(['fireEvent', 'setVar'])
            },
            beforeDestroy: function () {
              console.log("destroying template", t);
              if (this.styleTag) {
                this.styleTag.remove()
              }
            },
            mounted: function () {
              console.log("mounted view: ", t, this.appLayout);

              if (!this.vars) {
                this.vars = {}
              }
              if (t.style) {
                const css = t.style,
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
    },
    ...mapActions(['saveConfig', 'setPath']),
    make() {
      var x = document.createElement("a");
      x.href = "/make";
      document.getElementsByTagName("body")[0].appendChild(x);
      x.click()
      // window.location = window.location + "/make";
    },
    updateEndpoint() {
      console.log("update endpoint", this.appLayout.endpoint)
      localStorage.setItem("DAPTIN_ENDPOINT", this.appLayout.endpoint);
      this.saveConfig();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location = window.location + "";
    },
    setEndpoint() {
      this.newEndpointDialog = true;
    },
  },
  watch: {
    'path': function (val) {
      if (val == null) {
        return
      }
      console.log("set path", val)
      this.setPath(null);
      this.$router.push(val);
    }
  }
};
</script>

<style></style>
