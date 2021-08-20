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
      <v-data-table
        :headers="headers"
        :items="airports"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Airports Information</v-toolbar-title>
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
            </v-btn-toggle>
            <v-btn
              small
              :value="5"
              @click.prevent="addShield = !addShield"
              text
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
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
          >
            Refresh
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <airport-add-shield v-model="addShield" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AirportAddShield from '../../components/AirportAddShield'

export default {
  async fetch ({ store }) {
    await store.dispatch('airports/get')
  },
  components: {
    AirportAddShield
  },
  data () {
    return {
      addShield: false,
      headers: [
        {
          text: 'Airport ID',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'Name', value: 'name' },
        { text: 'IATA code', value: 'iata_code' },
        { text: 'Region ID', value: 'iso_region' },
        { text: 'Country ID', value: 'country_id' }
      ],
      items: [
        {
          text: 'Airports',
          disabled: true,
          href: '/airports'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      airports: 'airports/airports'
    })
  }
}
</script>
