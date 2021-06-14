<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Hotel description
    </h2>
    <v-data-table
      :headers="headers"
      :items="mock"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Hotel description</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="">
        <v-icon
          small
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Refresh
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'HotelDescription',
  data () {
    return {
      headers: [
        {
          text: 'Hotel ID',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'Hotel Name', value: 'name' },
        { text: 'Place', value: 'place' },
        { text: 'Resort', value: 'resort' },
        { text: 'Region', value: 'region' },
        { text: 'Country', value: 'country' },
        { text: 'Type', value: 'type' },
        { text: '', value: 'actions', sortable: false }
      ],
      mock: [
        {
          id: 'SD9212969',
          name: 'The Peninsula Chicago',
          place: 'Cincinnati',
          resort: 'Vancouver',
          region: 'Africa',
          country: 'Monaco',
          type: 'Boutique'
        },
        {
          id: 'SD9212929',
          name: 'Andronis Boutique Hotel',
          place: 'San Isidro',
          resort: 'Medicine Hat',
          region: 'Asia',
          country: 'Georgia',
          type: 'Business'
        },
        {
          id: 'SD9212920',
          name: 'Hanoi La Siesta Hote...',
          place: 'North Las Vegas ',
          resort: 'Laval',
          region: 'Oceania',
          country: 'Iceland',
          type: 'Boutique'
        }
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
          href: '/hotels/description'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
