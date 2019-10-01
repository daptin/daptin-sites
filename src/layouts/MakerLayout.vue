<template>


  <q-layout view="hhh lpR fFf">


    <q-drawer content-class="primary-color" color="#272643" :width="200" v-model="left" side="left" bordered>

      <q-list>
        <q-item-label header><h3 style="color: white">Make</h3></q-item-label>

        <q-item clickable @click="$router.push('/make/settings')">
          <q-item-section>
            App Layout
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/make/screens')">
          <q-item-section>
            Screens
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/make/events')">
          <q-item-section>
            Events
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/make/data')">
          <q-item-section>
            Data
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/make/publish')">
          <q-item-section>
            Publish
          </q-item-section>
        </q-item>
      </q-list>


      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

  </q-layout>


</template>
<style>
  .q-tab-panel {
    padding: 1px !important;
  }
</style>
<script>


  import {mapActions, mapGetters} from 'vuex';

  export default {
    watch: {},
    computed: {
      ...mapGetters([
        'appLayout',
        'user',
        'layout',
        'models',
        'icons',
        'userModels',
        'serverActions'
      ]),
    },
    name: "MakerLayout",
    data() {
      return {
        tab: null,
        screens: [],
        showMapping: true,
        layouts: [],
        left: true,
        screenHistoryStack: []
      };
    },
    methods: {
      ...mapActions([
        'setLayout',
        'getData',
        'saveConfig',
        'setTemplate',
        'addLayout',
        'addNewTab',
        'createTemplate',
        'refreshActions',
        'invokeEvent',
        'refreshModels']
      ),
    },
    mounted() {
      this.refreshModels();
      this.refreshActions();
      if (!this.user) {
        this.$router.push("/")
      }

      // this.layouts = Object.keys(this.appLayout.layoutConfiguration)
      // this.setTab('home');
      // localStorage.setItem("config", JSON.stringify(this.appLayout))
      this.saveConfig()

    },
  };
</script>

<style></style>
