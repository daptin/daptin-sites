<template>


  <q-layout view="hhh lpR fFf">


    <q-drawer content-class="primary-color" color="#272643" :width="200" v-model="left" side="left" bordered>

      <q-list>
        <q-item-label header><h3 style="color: white">Make</h3></q-item-label>

        <q-item clickable @click="$router.push('/make/settings')">
          <q-item-section>
            App Layout
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/make/screens')">
          <q-item-section>
            Screens
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/make/events')">
          <q-item-section>
            Events
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/make/data')">
          <q-item-section>
            Data
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/make/publish')">
          <q-item-section>
            Publish
          </q-item-section>
        </q-item>
      </q-list>


      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>


    <q-dialog v-model="chiefUserLoginDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Login to Chief</div>
        </q-card-section>

        <q-card-section>
          <q-input label="Email" dense v-model="chiefUsername" autofocus @keyup.enter="prompt = false"/>
          <q-input label="Password" dense v-model="chiefPassword" type="password" autofocus
                   @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Login" @click="loginChief()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>


  </q-layout>


</template>
<style>
  .q-tab-panel {
    padding: 1px !important;
  }
</style>
<script>


  import {mapActions, mapGetters} from 'vuex';

  export default {
    watch: {},
    computed: {
      ...mapGetters([
        'appLayout',
        'user',
        'layout',
        'models',
        'chiefUser',
        'icons',
        'userModels',
        'serverActions'
      ]),
    },
    name: "MakerLayout",
    data() {
      return {
        tab: null,
        screens: [],
        chiefUsername: null,
        chiefPassword: null,
        showMapping: true,
        chiefUserLoginDialog: false,
        layouts: [],
        left: true,
        screenHistoryStack: []
      };
    },
    methods: {
      loginChief() {
        const that = this;
        console.log("login chief", this.chiefUsername, this.chiefPassword);
        this.loginSimplyUser({
          'email': this.chiefUsername,
          'password': this.chiefPassword,
        }).then(function (response) {
          console.log("Chief login complete", response)
          if (that.chiefUser) {
            that.chiefUserLoginDialog = false;
          }
        }).catch(function (e) {
          console.log("Chief login failed", e)
        })
      },
      ...mapActions([
        'setLayout',
        'getData',
        'saveConfig',
        'setTemplate',
        'loginSimplyUser',
        'addLayout',
        'addNewTab',
        'createTemplate',
        'refreshActions',
        'invokeEvent',
        'invokeChiefEvent',
        'refreshModels']
      ),
    },
    mounted() {
      this.refreshModels();
      this.refreshActions();
      if (!this.user) {
        this.$router.push("/")
      }

      console.log("Chief user: ", this.chiefUser);
      if (!this.chiefUser) {
        this.chiefUserLoginDialog = true;
      } else {

        this.invokeChiefEvent({
          type: "get",
          params: {
            table_name: "application"
          }
        }).then(function (res) {
          console.log("chief user applications", res)
        })

      }
      this.saveConfig()

    },
  };
</script>

<style></style>
