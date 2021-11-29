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
          </v-toolbar>
        </template>
        <template v-slot:[`item.info`]="{ item }">
          <nuxt-link :to="`/be/${item.id}`">
            View
          </nuxt-link>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            :color="getColor(item.status)"
            dark
          >
            {{ item.status }}
          </v-chip>
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
        { text: 'info', value: 'info' },
        { text: 'REF Number', value: 'id' },
        { text: 'Status', value: 'status', width: 150 },
        { text: 'Operator', value: 'operator', width: 150 },
        { text: 'Hotel', value: 'hotel', width: 200 },
        { text: 'Price', value: 'price', width: 150 },
        { text: 'Netto', value: 'netto', width: 150 },
        { text: 'Profit', value: 'profit', width: 150 },
        { text: 'Departure', value: 'departure', width: 150 },
        { text: 'Customer Name', value: 'customer_name', width: 121 },
        { text: 'Country (geoloc)', value: 'country', width: 131 },
        { text: 'Docs sent', value: 'doc_sent', width: 121 },
        { text: 'Manager', value: 'manager', width: 121 },
        { text: 'Created', value: 'created', width: 121 },
        { text: 'Updated', value: 'updated', width: 121 },
        { text: 'Custom tag', value: 'custom_tag', width: 121 },
        { text: '', value: 'actions', width: 121 }
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
          departure: '10.10.2019',
          customer_name: 'string',
          country: 'string',
          doc_sent: 'label',
          manager: 'string',
          created: 'date',
          updated: 'date',
          custom_tag: 'tag'
        },
        {
          id: '0000000000002',
          status: 'Not Paid',
          operator: 'Bessie Cooper',
          hotel: 'B Ocean Resort',
          price: '$9,763',
          netto: '$165,000',
          profit: '$139,900',
          departure: '10.10.2019',
          customer_name: 'string',
          country: 'string',
          doc_sent: 'label',
          manager: 'string',
          created: 'date',
          updated: 'date',
          custom_tag: 'tag'
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
  },
  methods: {
    getColor (status) {
      if (status === 'Paid up') {
        return 'green'
      } else {
        return 'red'
      }
    }
  }
}
</script>
