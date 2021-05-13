<template>
  <div>
    <div class="logo text-center">
      <b>LAST</b>MIN
    </div>
    <div class="hello-text text-center">
      Hi!<br>
      Login to your dashboard
    </div>
    <form @submit.prevent="signIn" class="auth-form">
      <div class="auth-form__input">
        <v-text-field
          label="email"
          type="email"
          v-model="accountInfo.email"
        ></v-text-field>
      </div>
      <div class="auth-form__input">
        <v-text-field
          label="password"
          type="password"
          v-model="accountInfo.password"
        ></v-text-field>
      </div>
      <div class="auth-form__button">
        <v-btn
          block
          large
          type="submit"
        >
          Login
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'auth',
  layout: 'auth',
  data () {
    return {
      accountInfo: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      actionSignIn: 'auth/signIn'
    }),
    async signIn () {
      await this.actionSignIn({
        ...this.accountInfo
      })
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
  .auth-form {
    padding: 0 50px;
    padding-right: 65px;
  }
  .logo {
    color: #717887;
    font-weight: 900;
    font-size: 30px;
    b {
      color: #33A8A1;
    }
  }
</style>
