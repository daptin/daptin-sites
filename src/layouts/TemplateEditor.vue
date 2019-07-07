<template>


  <q-layout view="hhh lpR fFf">


    <q-drawer v-model="left" side="left" bordered>

      <q-list v-for="(template, index) in appLayout.templates" :key="index">

        <q-item @click="setTemplate(template)" clickable v-ripple>
          <q-item-section>
            {{ template.name }}
          </q-item-section>
        </q-item>


      </q-list>


      <!-- drawer content -->
    </q-drawer>

    <q-page-container>


      <div class="row">
        <div class="col-md-12">

        </div>
      </div>

      {{layout}}


    </q-page-container>

  </q-layout>


</template>

<script>
  import {openURL} from "quasar";
  import {mapGetters, mapActions} from 'vuex';
  import {hierarchy, pack} from 'd3-hierarchy'
  import Mustache from 'mustache';


  export default {
    computed: {
      ...mapGetters([
        'appLayout',
        'user',
        'layout',
      ]),


    },
    name: "MyLayout",
    data() {
      return {
        flowers: [],
        left: this.$q.platform.is.desktop,
        screens: [],
      };
    },
    methods: {
      openURL,
      ...mapActions(['setLayout', 'getData']),
    },
    mounted() {
      if (!this.user) {
        this.$router.push("/")
      }


    }
  };
</script>

<style></style>
