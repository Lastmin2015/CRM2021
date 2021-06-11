<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Hotel price
    </h2>
    <v-tabs
      centered
      slot="extension"
    >
      <v-tab to="/hotels/prices/room-types">
        Room types
      </v-tab>

      <v-tab to="/hotels/prices/boarding-types">
        Boarding types
      </v-tab>

      <v-tab to="/hotels/prices/room-of-boarding">
        List with Boarding type of Room types
      </v-tab>
    </v-tabs>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: 'HotelPrices',
  data () {
    return {
      headers: [
        {
          text: 'Hotel ID',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Hotel Name', value: 'calories' },
        { text: 'Place', value: 'fat' },
        { text: 'Resort', value: 'carbs' },
        { text: 'Region', value: 'protein' },
        { text: 'Country', value: 'protein' },
        { text: 'Type', value: 'protein' },
        { text: '', value: 'actions', sortable: false }
      ],
      items: [
        {
          text: 'Hotels',
          disabled: false,
          href: '/hotels'
        },
        {
          text: 'Hotel description',
          disabled: true,
          href: '/hotels'
        }
      ]
    }
  }
}
</script>

<style scoped>
.v-tab {
  max-width: 370px;
}
</style>
