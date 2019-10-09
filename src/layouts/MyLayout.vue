<template>
  <component v-if="appLayout" v-bind:is="appLayout.layout"></component>
</template>

<script>
  import {openURL} from "quasar";
  import {mapGetters, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'appLayout',
        'user',
      ])

    },
    name: "MyLayout",
    data() {
      return {
        leftDrawerOpen: this.$q.platform.is.desktop
      };
    },
    methods: {
      openURL,
      make() {
        this.$router.push("/make")
      },
      ...mapActions(['setLayout', 'refreshData']),
      setTab(tab) {
        console.log("load page", tab);
        this.$router.push(tab.path);
        this.setLayout(tab.path.split("/")[1])
        this.refreshData(this.$route.params.referenceId)
      }
    },
    mounted() {
      console.log("requested app layout", this.appLayout.layout)
      if (!this.user) {
        this.$router.push("/")
      }
    }
  };
</script>

<style></style>
