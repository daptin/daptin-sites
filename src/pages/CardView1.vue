<template>
  <q-page>

    <q-toolbar class="bg-primary text-white shadow-2" v-if="layout && layout.title">
      <q-toolbar-title>{{layout.title}}</q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-md row">
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-4"  :key="row.key" v-for="(row, i) in localData">


        <q-card class="my-card" @click="itemSingleClick(row, i)">
          <q-card-section>
            <div class="text-h6">{{row.title}}</div>
            <div class="text-subtitle2">{{row.summary}}</div>
          </q-card-section>
          <q-card-section>
            {{row.content}}
          </q-card-section>
          <img :src="'data:image/png;base64, ' + row.heading_image">

          <q-separator dark/>

          <q-card-actions  align="around">
            <q-btn flat  icon="share">Share</q-btn>
            <q-btn flat  icon="thumb_up">Like</q-btn>
          </q-card-actions>
          {{row.article}}

        </q-card>

      </div>
    </div>
  </q-page>
</template>

<style></style>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Mustache from 'mustache';

  export default {
    data() {
      return {}
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'user',
        'data',
        'localData',
        'layout',
        'pagination'
      ])
    },
    name: "CardView",
    methods: {
      itemSingleClick(row, i) {
        console.log("Clicked item", row, this.data[i]);
        console.log("Layout action", this.layout)
        const action = this.layout.actions["ItemSingleClick"]


        switch (action.type) {
          case "relocate":
            const path = Mustache.render(action.path, this.data[i])
            console.log("next path", path)
            this.$router.push(path);
            break;
          default:
            break;
        }

      },
      loadData() {
        this.refreshData();
      },
      ...mapActions(['refreshData', 'setLayout'])
    },
    mounted() {
      console.log("loaded card view", this.$route);
      this.setLayout(this.$route.params.layout);
      this.loadData();
    },
  };
</script>
