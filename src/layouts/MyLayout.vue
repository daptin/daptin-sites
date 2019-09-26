<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>

      <router-view/>
      <!--
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="make" fab icon="add" color="accent"/>
      </q-page-sticky>
      -->
    </q-page-container>
    <q-footer color="primary">
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
      make() {
        console.log("goto make")
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
      if (!this.user) {
        this.$router.push("/")
      }
    }
  };
</script>

<style></style>
