<template>
  <q-page>

    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>{{currentTab.label}}</q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-md row items-start q-gutter-md">
      <template v-for="(row, i) in localData">
        <q-card class="my-card" :key="row.key" @click="itemSingleClick(row, i)">

          <q-avatar color="grey" text-color="white">
            {{ row.avatar }}
          </q-avatar>

          <q-card-section>
            <q-item-label>{{row.title}}</q-item-label>
            <q-item-label caption lines="2">{{row.description}}</q-item-label>
          </q-card-section>

          <q-card-section>
            <q-item-label caption>{{row.created_at | dateFormat('DD MMM YY')}}</q-item-label>
          </q-card-section>
        </q-card>
      </template>
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
        'currentTab',
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
        const path = Mustache.render(action.path, this.data[i])
        console.log("next path", path);
        this.$router.push(path);
      },
      loadData() {
        this.refreshData();
      },
      ...mapActions(['refreshData'])
    },
    mounted() {
      console.log("loaded card view", this.$route);
      this.loadData();
    },
    watch: {
      currentTab: function (va) {
        console.log("Current tab changed", va);
        this.loadData();
      }
    }
  };
</script>
