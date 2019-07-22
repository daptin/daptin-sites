<template>
  <q-page>
    <component v-if="layout" v-bind:localData="localData" v-bind:layout="layout"
               v-bind:is="layout.template"></component>
  </q-page>
</template>

<style></style>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Mustache from 'mustache';


  export default {
    data() {
      return {}
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'user',
        'currentTab',
        'data',
        'localData',
        'layout',
        'pagination'
      ]),
    },
    name: "TemplateView",
    methods: {
      loadData() {
        this.refreshData(this.$route.params.referenceId);
      },
      ...mapActions(['refreshData', 'setLayout'])
    },
    mounted() {
      console.log("loaded template view", this.$route);
      if (!this.user) {
        this.$router.push("/login");
        return
      }

      this.setLayout(this.$route.params.layout);
      this.loadData();
    },
    watch: {
      currentTab: function (va) {
        console.log("Current tab changed", va);
        this.setLayout(this.$route.params.layout);
        this.loadData();
      },
      '$route': function (a) {
        console.log('route changed template view', arguments);
        this.setLayout(this.$route.params.layout);
        this.loadData();
      }
    },
  };
</script>
