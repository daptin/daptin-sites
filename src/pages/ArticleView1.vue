<template>
  <q-page :style="{background: layout.style.background}">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>

    <img :src="'data:image/png;base64, ' + localData.heading_image" style="width: 100%; max-width: 400px">

    <div class="q-pa-md row">

      <q-card-section>
        <div class="text-h6">{{localData.title}}</div>
        <div class="text-subtitle2" v-if="localData.author">by {{localData.author}}</div>
      </q-card-section>

      <q-card-section>
        <div>{{localData.summary}}</div>
      </q-card-section>

      <vue-markdown style="width: 100%;">{{localData.content}}</vue-markdown>


    </div>
  </q-page>
</template>

<style></style>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import VueMarkdown from 'vue-markdown'


  export default {
    components: {
      VueMarkdown,
    },
    data() {
      return {
        row: {},
      }
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'user',
        'data',
        'localData',
        'layout',
        'pagination'
      ]),
    },
    name: "CardView",
    methods: {
      loadData() {
        this.refreshData(this.$route.params.referenceId);
        // this.row = this.localData[0]
      },
      ...mapActions(['refreshData', 'setLayout'])
    },
    mounted() {
      console.log("loaded card view", this.$route);
      this.setLayout(this.$route.params.layout);
      this.loadData();
    },
    watch: {
      localData: function(val) {
        console.log("new value of localdata", arguments)
        // this.row = val[0]
      }
    }
  };
</script>
