<template>
  <div class="col-12" style="padding: 10vh 15vw">
    <div class="q-pa-md row items-start q-gutter-md">

      <div class="col-3" v-for="layout in appLayout.containerLayouts" :key="layout.name">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{layout.name}}</div>
          </q-card-section>
          <q-card-actions vertical>
            <q-btn outline color="secondary" @click="setLayout(layout.name)">Select</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "ChooseLayout",
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'appLayout',
      ])
    },
    methods: {
      ...mapActions([
        'getData',
        'saveConfig',
        'setTemplate',
        'addLayout',
        'addNewTab',
        'createTemplate',
        'refreshActions',
        'invokeEvent',
        'refreshModels']
      ),
      setLayout(layoutName) {
        this.appLayout.layout = layoutName;
        this.saveConfig();
        this.$router.push('/make/screens');
      },
    }
  }
</script>

<style scoped>

</style>
