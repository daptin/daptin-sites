<template>
  <q-page>

    <q-toolbar class="bg-primary text-white shadow-2" v-if="layout && layout.title">
      <q-toolbar-title>{{layout.title}}</q-toolbar-title>
    </q-toolbar>

    <q-list style="background: white">
      <template v-for="(row, index) in localData">
        <q-item :key="index" @click.native="itemSingleClick(row, index)" v-if="row">

          <q-item-section avatar>
            <q-avatar color="grey" text-color="white">
              {{ row.avatar }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{row.title}}</q-item-label>
            <q-item-label caption lines="2">{{row.description}}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{row.created_at}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced inset :key="'sep_' + row.key" v-if="index < localData.length - 1"/>
      </template>
    </q-list>

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
        'layout',
        'localData',
        'pagination'
      ])
    },
    name: "ListView",
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
      console.log("loaded list view", this.$route.params.layout);
      this.setLayout(this.$route.params.layout);
      this.loadData();
    },
    watch: {
      layout: function (va) {
        console.log("Current tab changed", va);
        this.loadData();
      },
      data: function (val) {
        console.log("data changed", val);
      }
    }
  };
</script>
