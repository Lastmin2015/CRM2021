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
        :items="mock"
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
      headers: [
        {
          text: 'Airport ID',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'Name', value: 'name' },
        { text: 'IATA code', value: 'ita' },
        { text: 'Region ID', value: 'region_id' },
        { text: 'Country ID', value: 'country_id' }
      ],
      mock: [
        {
          id: 'SD9212969',
          name: 'Stockholm ESSA',
          ita: 'JFK',
          region_id: 'SD9212969',
          country_id: 'KH9212924'
        },
        {
          id: 'SD9212961',
          name: 'Toronto CYYZ',
          ita: 'MIA',
          region_id: 'SD9212963',
          country_id: 'KH9212922'
        },
        {
          id: 'SD9212965',
          name: 'Washington KIAD',
          ita: 'LCY',
          region_id: 'SD9212912',
          country_id: 'KH9212222'
        }
      ],
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
