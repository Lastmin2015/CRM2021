<template>
  <div>
    <div class="hello-text text-center">
      Hi!<br>
      Register to your dashboard
    </div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
    <form
      @submit.prevent="signUp"
      class="auth-form"
    >
        <div class="auth-form__input">
          <v-text-field
            label="email"
            :rules="rules.emailRules"
            v-model="accountInfo.email"
          ></v-text-field>
        </div>
        <div class="auth-form__input">
          <v-text-field
            label="password"
            type="password"
            :rules="rules.passwordRules"
            v-model="accountInfo.password"
          ></v-text-field>
        </div>
        <div class="auth-form__button text-right">
          <v-btn
            block
            large
            dark
            color="#33A8A1"
            type="submit"
          >
            Register
          </v-btn>
<!--          <nuxt-link to="/auth/restore-password" class="auth-form__restore">-->
<!--            <v-icon small>-->
<!--              mdi-lock-outline-->
<!--            </v-icon>-->
<!--            <span>-->
<!--            Forgot password?-->
<!--          </span>-->
<!--          </nuxt-link>-->
        </div>
    </form>
      </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'auth',
  layout: 'auth',
  data () {
    return {
      valid: false,
      accountInfo: {
        email: '',
        password: ''
      },
      rules: {
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length > 6) || 'Password must be less than 6 characters'
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      actionSignUp: 'auth/signUp'
    }),
    async signUp () {
      try {
        this.$refs.form.validate()
        if (!this.valid) {
          return
        }
        const success = await this.actionSignUp({
          ...this.accountInfo
        })
        if (success) {
          this.$toast.success('Successfully authenticated')
        }
        this.$router.push('/')
      } catch (error) {
        this.$toast.error('Check the correctness of the entered data')
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
