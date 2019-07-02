<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'appLayout'
      ])

    },
    name: "App"
  };
</script>

<style></style>
