<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Hotels
    </h2>
    <div>
      Hotels <br>
      {{ hotels }} <br><br>
    </div>
    <div>
      Hotels Type <br>
      {{ hotelsType }} <br><br>
    </div>
    <div>
      Hotels Class <br>
      {{ hotelsClasses }} <br><br>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const hotels = await $axios.$get('/api/hotels')
    const hotelsType = await $axios.$get('/api/hotel-types')
    const hotelsClasses = await $axios.$get('/api/hotel-classes')
    return {
      hotels,
      hotelsType,
      hotelsClasses
    }
  },
  data () {
    return {
      items: [
        {
          text: 'Hotels',
          disabled: true,
          href: '/hotels'
        }
      ]
    }
  }
}
</script>
