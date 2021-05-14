<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Geography
    </h2>
    <div>
      {{ places }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const places = await $axios.$get('/api/places')
    return {
      places
    }
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
