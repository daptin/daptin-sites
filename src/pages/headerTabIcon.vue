<template>
  <q-layout view="lHh Lpr lFf" :style="{background: appLayout.style.background}">
      <q-header>
          <q-tabs
              class="text-white">
        <q-tab v-for="tab in appLayout.tabs" :key="tab.name" @click="setTab(tab)" :name="tab.name" :icon="tab.icon"
               />
      </q-tabs></q-header>

    <q-page-container>
        <div class="q-pa-md">
              <q-input rounded outlined v-model="search" type="search">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
          </div>

      <router-view/>
      <!--
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="make" fab icon="add" color="accent"/>
      </q-page-sticky>
      -->
    </q-page-container>
    
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
