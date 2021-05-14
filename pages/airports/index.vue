<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Airports
    </h2>
    <div>
      {{ list }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const list = await $axios.$get('/api/airports')
    return {
      list
    }
  },
  data () {
    return {
      items: [
        {
          text: 'Airports',
          disabled: true,
          href: '/airports'
        }
      ]
    }
  }
}
</script>
