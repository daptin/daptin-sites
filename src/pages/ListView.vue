<template>
  <q-page>

    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>{{currentTab.label}}</q-toolbar-title>
    </q-toolbar>

    <q-list>
      <template v-for="(row, index) in localData">
        <q-item :key="row.key">

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
            <q-item-label caption>{{row.created_at | dateFormat('DD MMM YY')}}</q-item-label>
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
        'pagination'
      ])
    },
    name: "ListView",
    methods: {
      loadData() {
        this.refreshData();
      },
      ...mapActions(['refreshData'])
    },
    mounted() {
      console.log("loaded card view", this.$route.params.typeName);
      this.loadData();
    },
    watch: {
      currentTab: function (va) {
        console.log("Current tab changed", va);
        this.loadData();
      },
      data: function (val) {
        console.log("data changed", val);
      }
    }
  };
</script>
