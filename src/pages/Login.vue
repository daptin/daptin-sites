<template>
  <div class="container">
    <div class="row justify-center">
      <div class="col-6 col-sm-8 col-xs-8 col-lg-2">
        <img src="~assets/daptin-logo-full.png" style="width: 200px"/>
      </div>
    </div>
    <div class="row">
      <div class="col-3 col-sm-2 col-xs-2 col-lg-4"></div>
      <div class="col-12 col-lg-4">

        <q-form
          @submit="onSubmit"
          @reset="backPage"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type email']"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'Please type your password',
        ]"
          />

          <div class="row justify-center">
            <div class="col-3 col-sm-2 col-xs-2"></div>
            <div class="col-6 col-sm-8 col-xs-8 col-md-auto">
              <q-btn label="Login" type="submit" color="primary"/>
              <q-btn label="Back" @click="backPage" type="reset" color="black" flat class="q-ml-sm"/>
            </div>
            <div class="col-3 col-sm-2 col-xs-2">
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-3 col-sm-2 col-xs-2 col-lg-4"></div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        email: null,
        password: null,
      }
    },

    methods: {
      ...mapActions([
        "loginUser"
      ]),
      backPage() {
        this.$router.push("/");
      },
      onSubmit() {
        const that = this;
        this.loginUser({
          email: this.email,
          password: this.password,
        }).then(function (res) {
          console.log("sigin complete", arguments)
          that.$router.push("/")
        }).catch(function (err) {
          that.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'fas fa-cross-circle',
            message: 'Login failed'
          })
        });
        /*
        if (this.accept !== true) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'You need to accept the license and terms first'
          })
        }
        */
      },
    }
  }
</script>
