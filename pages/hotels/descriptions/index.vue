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
      :items="hotels"
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
          <v-btn-toggle
            small
            color="primary"
            dense
            group
          >
            <v-btn
              small
              :value="1"
              text
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn
              small
              :value="2"
              text
            >
              <v-icon>mdi-filter-minus-outline</v-icon>
            </v-btn>

            <v-btn
              small
              :value="3"
              text
            >
              <v-icon>mdi-filter-plus-outline</v-icon>
            </v-btn>
            <v-btn
              small
              :value="4"
              text
            >
              <v-icon>mdi-table-column-width</v-icon>
            </v-btn>
            <v-btn
              small
              :value="5"
              @click.prevent="addShield = !addShield"
              text
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-toolbar>
      </template>
      <template v-slot:[`item.info`]="">
<!--        <nuxt-link-->
<!--&lt;!&ndash;          :to="`/hotels/descriptions/${item.id}`"&ndash;&gt;-->
<!--&lt;!&ndash;          :to="`/hotels/descriptions/${item.id}`"&ndash;&gt;-->
<!--        >-->
        <nuxt-link
          :to="`/hotels/descriptions`"
        >
          View
        </nuxt-link>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          @click="deleteHotel(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
        >
          Refresh
        </v-btn>
      </template>
    </v-data-table>
    <hotel-add-shield v-model="addShield" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HotelAddShield from '../../../components/hotels/HotelAddShield'

export default {
  name: 'HotelDescription',
  async fetch ({ store }) {
    await store.dispatch('hotels/get')
  },
  components: {
    HotelAddShield
  },
  data () {
    return {
      addShield: false,
      headers: [
        { text: 'Info', value: 'info' },
        // {
        //   text: 'Hotel ID',
        //   align: 'start',
        //   sortable: false,
        //   value: 'id'
        // },
        { text: 'Hotel Name', value: 'name', width: 200 },
        { text: 'Place', value: 'place.id', width: 100 },
        { text: 'Resort', value: 'place.resort_id' },
        { text: 'Class', value: 'hotel_class.name' },
        { text: 'Type', value: 'hotel_type.name' },
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
          href: '/hotels/description'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      hotels: 'hotels/hotels'
    })
  },
  methods: {
    ...mapActions({
      deleteHotel: 'hotels/deleteHotel'
    })
  }
}
</script>

<style scoped>

</style>
