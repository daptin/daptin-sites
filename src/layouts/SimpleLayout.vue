<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
      <q-btn v-if="appLayout" flat :label="appLayout.name"/>
      <q-space/>

      <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
      <q-tabs shrink stretch>
        <q-tab :key="tab.label" @click="setTab(tab)" :name="tab.label" v-for="tab in appLayout.tabs" :icon="tab.icon" :label="tab.label"/>
      </q-tabs>

    </q-toolbar>
    <component v-if="layout" v-bind:is="layout.template"></component>

  </div>
</template>

<script>
import {openURL} from "quasar";
import {mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'appLayout',
      'layout',
      'user',
    ])

  },
  name: "SimpleLayout",
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
    console.log("requested app layout", this.appLayout.layout);
    if (this.appLayout.layout === "") {
      this.setLayout(this.appLayout.homeLayout)
    }
  }
};
</script>

<style></style>
