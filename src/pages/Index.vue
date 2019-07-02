<template>
  <q-page class="flex flex-center">
    <h1>Hello</h1>
  </q-page>
</template>

<style></style>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'user',
      ])
    },
    name: "PageIndex",
    methods: {
      goToLogin: function () {
        this.$router.push("/login")
      }
    },
    mounted() {
      if (!this.user) {
        this.$router.push("/login")
      }
    }
  };
</script>
