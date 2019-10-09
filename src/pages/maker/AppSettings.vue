<template>
  <div class="row">


    <div class="col-12" style="padding: 10vh 25vw">

      <form>

        <div>
          <label>Daptin End point</label>
          <input class="d-input" v-model="appLayout.endpoint" type="text">
        </div>
        <div>
          <label>PRIMARY COLOR HEX CODE</label>
          <input class="d-input" v-model="appLayout.style.background" type="text">
        </div>

        <div>
          <label>Logo URL</label>
          <input class="d-input" v-model="appLayout.style.logourl" type="text">
        </div>

        <div class="q-pa-md">
          <q-badge color="primary" text-color="white" class="q-mb-sm">
            Primary Color: {{appLayout.style.primary}}
          </q-badge>

          <q-color
            @change="setPrimary()"
            v-model="appLayout.style.primary"
            no-header
            no-footer
            default-view="palette"
            :palette="['#D9B801', '#d66c00', '#26a69a', '#027be3', '#00a300', '#E8045A',
                '#B2028A', '#005c2e', '#333333', '#2A0449']"
            class="my-picker"
          />
        </div>

        <div class="q-pa-md">
          <q-badge color="secondary" text-color="white" class="q-mb-sm">
            Secondary Color: {{appLayout.style.secondary}}
          </q-badge>


          <q-color
            @change="setSecondary()"
            v-model="appLayout.style.secondary"
            no-header
            no-footer
            default-view="palette"
            :palette="['#D9B801', '#d66c00', '#26a69a', '#027be3', '#00a300', '#E8045A',
                '#B2028A', '#005c2e', '#333333', '#2A0449']"
            class="my-picker"
          />

        </div>


        <q-btn style="margin-top: 20px" color="primary" @click="saveConfigAndNext()">Next</q-btn>
      </form>

    </div>

  </div>


</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import {colors} from "quasar";

  export default {
    name: "AppSettings",
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
        'setLayout',
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
      saveConfigAndNext() {
        this.saveConfig();
        this.$router.push('/make/layout');
      },
      //Theming functions **
      setPrimary() {
        console.log(this.appLayout.style.primary);
        colors.setBrand('primary', this.appLayout.style.primary);
        parent.parent.document.documentElement.style.setProperty('--q-color-primary', this.appLayout.style.primary);
      },
      setSecondary() {
        console.log(this.appLayout.style.secondary);
        colors.setBrand('secondary', this.appLayout.style.secondary);
        parent.parent.document.documentElement.style.setProperty('--q-color-secondary', this.appLayout.style.secondary);
      },
    }
  }
</script>

<style scoped>

</style>
