<template>
  <div class="row">

    

    <div class="col-12" style="padding: 10vh 25vw" v-if="settingPage==1">

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



        <div class="col-12" style="padding: 10vh 15vw" v-if="settingPage == 2">
          <div class="q-pa-md row items-start q-gutter-md">


            <q-card class="my-card">
              <q-img src="../statics/images/layout-previews/experiment1.png" basic>
              </q-img>
              <q-card-section>
              <div class="text-h6">Experiment1</div>
              </q-card-section>
              <q-card-actions vertical>
                <q-btn outline color="secondary">Select</q-btn>
              </q-card-actions>
            </q-card>

            <q-card class="my-card">
              <q-img src="../statics/images/layout-previews/experiment2.png" basic>
              </q-img>
              <q-card-section>
              <div class="text-h6">Experiment2</div>
              </q-card-section>
              <q-card-actions vertical>
                <q-btn outline color="secondary">Select</q-btn>
              </q-card-actions>
            </q-card>

            <q-card class="my-card">
              <q-img src="../statics/images/layout-previews/experiment3.png" basic>
              </q-img>
              <q-card-section>
              <div class="text-h6">Experiment3</div>
              </q-card-section>
              <q-card-actions vertical>
                <q-btn outline color="secondary">Select</q-btn>
              </q-card-actions>
            </q-card>

            <q-card class="my-card">
              <q-img src="../statics/images/layout-previews/experiment4.png" basic>
              </q-img>
              <q-card-section>
              <div class="text-h6">Experiment4</div>
              </q-card-section>
              <q-card-actions vertical>
                <q-btn outline color="secondary">Select</q-btn>
              </q-card-actions>
            </q-card>

            <q-btn color="primary" @click="saveConfigAndNext()" label="next" />
          </div>
        </div>

  </div>


  
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import {colors} from "quasar";

  export default {
    name: "AppSettings",
    data(){
      return{
        settingPage: 1,
        finalPage:2,
      }
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
        if(this.settingPage!==this.finalPage){
        this.settingPage++;
        } else{
          this.$router.push('/make/screens');
        }
      
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
