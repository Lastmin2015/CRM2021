<template>
  <div>
<!--    <div class="hello-text text-center">-->
<!--      Hi!<br>-->
<!--      R-->
<!--    </div>-->
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <form @submit.prevent="restore" class="auth-form">
        <div class="auth-form__input">
          <v-text-field
            label="email"
            type="email"
            :rules="rules.emailRules"
            v-model="email"
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
            Recovery
          </v-btn>
          <nuxt-link to="/auth" class="auth-form__restore">
            <v-icon small>
              mdi-face-outline
            </v-icon>
            <span>
            Log-in ?
          </span>
          </nuxt-link>
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
      email: '',
      rules: {
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      actionRestore: 'auth/restore'
    }),
    async restore () {
      try {
        const message = await this.actionRestore(this.email)
        this.$toast.success(message)
        this.$router.push('/auth')
      } catch (error) {
        this.$toast.error(error.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
