<template>


  <q-layout view="hhh lpR fFf">

    <q-drawer v-model="left" side="left" bordered>

      <q-list v-for="(menuItem, index) in appLayout.tabs" :key="index">

        <q-item @click="setTab(menuItem)" clickable v-ripple>
          <q-item-section avatar>
            <q-icon :name="menuItem.icon"/>
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>

        <q-separator v-if="menuItem.separator"/>

      </q-list>


      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

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
      ]),

    },
    name: "MyLayout",
    data() {
      return {
        left: '',
        leftDrawerOpen: this.$q.platform.is.desktop,
      };
    },
    methods: {
      openURL,
      ...mapActions(['setLayout']),
      setTab(tab) {
        console.log("load page", tab);
        this.setLayout(tab.layout);
        this.$router.push("/sidenav/" + tab.path);
      }
    },
    mounted() {
      if (!this.user) {
        this.$router.push("/sidenav/")
      }
    }
  };
</script>

<style></style>
