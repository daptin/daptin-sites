<template>
  <q-layout view="lHh Lpr lFf" :style="{background: appLayout.style.background}">
    <q-page-container>

      <router-view/>
      <!--
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="make" fab icon="add" color="accent"/>
      </q-page-sticky>
      -->
    </q-page-container>
    <q-footer>
      <q-tabs
              class="text-white">
        <q-tab v-for="tab in appLayout.tabs" :key="tab.name" @click="setTab(tab)" :name="tab.name" :icon="tab.icon"
               :label="tab.label"/>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: "layout2",
  computed: {
      ...mapGetters([
        'appLayout',
        'user',
      ])

    },
};
</script>
