<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Geography
    </h2>
    <v-tabs
      centered
      slot="extension"
    >
      <v-tab to="/geography/country">
        Country
      </v-tab>

      <v-tab to="/geography/region">
        Region
      </v-tab>

      <v-tab to="/geography/resort">
        Resort
      </v-tab>

      <v-tab to="/geography/place">
        Place
      </v-tab>
    </v-tabs>
    <nuxt-child/>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
  },
  data () {
    return {
      items: [
        {
          text: 'Geography',
          disabled: true,
          href: '/geography'
        }
      ]
    }
  }
}
</script>
