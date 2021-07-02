<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Booking entries
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
            <v-toolbar-title>Booking entries Information</v-toolbar-title>
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
        // {
        //   text: 'Airport ID',
        //   align: 'start',
        //   sortable: false,
        //   value: 'id'
        // },
        { text: 'REF Number', value: 'id' },
        { text: 'Status', value: 'status' },
        { text: 'Operator', value: 'operator' },
        { text: 'Hotel', value: 'hotel' },
        { text: 'Price', value: 'price' },
        { text: 'Netto', value: 'netto' },
        { text: 'Profit', value: 'profit' },
        { text: 'Departure', value: 'departure' }
      ],
      mock: [
        {
          id: '0000000000001',
          status: 'Paid up',
          operator: 'Dohn Snow',
          hotel: 'B Ocean Resort',
          price: '$9,763',
          netto: '$165,000',
          profit: '$139,900',
          departure: '10.10.2019'
        },
        {
          id: '0000000000002',
          status: 'Not Paid',
          operator: 'Bessie Cooper',
          hotel: 'B Ocean Resort',
          price: '$9,763',
          netto: '$165,000',
          profit: '$139,900',
          departure: '10.10.2019'
        }
      ],
      items: [
        {
          text: 'Booking entries',
          disabled: true,
          href: '/be'
        }
      ]
    }
  }
}
</script>
