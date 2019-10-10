<template>
  <q-layout view="lHh Lpr lFf" :style="{background: appLayout.style.background}">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <q-tabs class="text-white">
        <q-tab
          v-for="tab in appLayout.tabs"
          :key="tab.name"
          @click="setTab(tab)"
          :name="tab.name"
          :icon="tab.icon"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "layout2",
  computed: {
    ...mapGetters(["appLayout", "user"])
  }
};
</script>
