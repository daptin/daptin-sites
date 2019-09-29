<template>
  <div id="q-app" v-touch-hold:3500.mouse="setEndpoint">
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


  function test() {
    console.log("afsef test")
  }

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
      colors.setBrand('primary', this.appLayout.style.primary);
      colors.setBrand('secondary', this.appLayout.style.secondary);

      for (var i = 0; i < this.appLayout.templates.length; i++) {
        let template = this.appLayout.templates[i];
        if (!template.style) {
          template.style = "";
        }
        //console.log("register template", template)

        (function (t) {
          Vue.component(t.name, function (resolve, reject) {
            resolve({
              template: t.template,
              props: ['localData', 'layout', 'vars'],
              data: function () {
                return {
                  styleTag: null,
                }
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

                test()
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


      }
    },
    methods: {
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
