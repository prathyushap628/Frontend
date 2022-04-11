<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Welcome back!</h2>

          <Notification :message="error" v-if="error" />

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  type="username"
                  class="input"
                  name="username"
                  v-model="username"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">
                Log In
              </button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account? //
              <nuxt-link to="/register">Register</nuxt-link>
              <nuxt-link to="/homepage">Home</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import store from '../store/index'
import Notification from '~/components/Notification'
export default {
  name: 'index-view',
  components: {
    Notification,
  },

  data() {
    return {
      username: '',
      password: '',
      error: null,
    }
  },

  methods: {
    async login() {
      console.log()
      await this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      })
      // calling here. see?
      await this.$store.dispatch('GetAllToDOs')
      
    },
    
    // },
    // login() {
    //   console.log(' inside login call')
    //   try {
    //     // await this.$auth.loginWith('local', {
    //     //   data: {
    //     //     email: this.email,
    //     //     password: this.password,
    //     //   },
    //     // })
    //     console.log('creds')
    //     console.log(this.email)
    //     console.log(this.password)

    //     this.$router.push('/homepage')
    //   } catch (e) {
    //     console.log(' error calling login')
    //     this.error = e.response.data.message
    //   }
    // },
  },
}
</script>
