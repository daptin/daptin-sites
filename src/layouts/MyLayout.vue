<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer>
      <q-tabs inline-label
              class="text-white">
        <q-tab v-for="tab in appLayout.tabs" :key="tab.name" @click="setTab(tab)" :name="tab.name" :icon="tab.icon"
               :label="tab.label"/>
      </q-tabs>
    </q-footer>
  </q-layout>
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
      ...mapActions(['loadTab']),
      setTab(tab) {
        console.log("load page", tab);
        this.$router.push(tab.path);
        this.loadTab(tab);
      }
    },
    mounted() {
      if (!this.user) {
        this.$router.push("/")
      }
    }
  };
</script>

<style></style>
