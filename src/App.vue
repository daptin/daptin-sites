<template>
  <div id="q-app" v-touch-hold.mouse="setEndpoint">
    <router-view/>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex';
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
    mounted: function () {
      this.refreshModels();
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
      ...mapActions(['saveConfig', 'setPath', 'refreshModels']),
      setEndpoint() {
        var newEndpoint = window.prompt("Set Endpoint", localStorage.getItem("DAPTIN_ENDPOINT") || "");
        if (newEndpoint) {
          localStorage.setItem("DAPTIN_ENDPOINT", newEndpoint);
          window.location = window.location + "";
        }
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
