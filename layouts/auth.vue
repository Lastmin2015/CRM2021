<template>
  <v-app>
    <v-container fluid class="pa-0">
      <v-row align="center">
        <v-col
          class="pb-0"
          cols="12"
          md="8"
        >
          <div class="height-filled"/>
        </v-col>
        <v-col
          class="pb-0"
          cols="12"
          md="4"
        >
          <div class="logo text-center">
            <b>LAST</b>MIN
          </div>
          <nuxt />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'auth',
  middleware: 'noauth',
  mounted () {
    this.$axios.setToken(this.$store.state.auth.token, 'Bearer')
  }
}
</script>

<style scoped>
  .height-filled {
    min-height: 100vh;
    background: #2C303B;
  }
</style>
