<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex';
  import Vue from 'vue';

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
        //console.log("register template", template)

        (function (t) {
          Vue.component(t.name, function (resolve, reject) {
            resolve({
              template: t.template,
              props: ['localData', 'layout'],
              methods: {
                itemSingleClick: function (row, i) {
                  // console.log("single item clicked", arguments)
                  // this.$emit("item-single-clicked", row, i)
                },
                ...mapActions(['fireEvent'])
              },
            })
          })
        })(template)


      }
      this.saveConfig()
    },
    methods: {
      ...mapActions(['saveConfig', 'setPath', 'refreshModels'])
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
