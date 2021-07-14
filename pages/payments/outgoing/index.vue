<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Payments
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
            <v-toolbar-title>Incoming </v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:[`item.id`]="{ item }">
          <nuxt-link :to="`/be/${item.id}`">
            {{ item.id }}
          </nuxt-link>
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
        { text: 'Res Date', value: 'res' },
        { text: 'Departure Date', value: 'departure' },
        { text: 'Trans ID', value: 'trans_id' },
        { text: 'Payment Date', value: 'payment_date' },
        { text: 'Amount', value: 'amount' },
        { text: 'Method', value: 'method' },
        { text: 'Manager', value: 'manager' }
      ],
      mock: [
        {
          id: 'BA9212320',
          res: '07.07.2020',
          departure: '04.12.2019',
          trans_id: '7632525',
          payment_date: '31.10.2019',
          amount: '$2,638',
          method: 'Сash',
          manager: 'Kristin Watson'
        },
        {
          id: 'BA9212320',
          res: '07.07.2020',
          departure: '04.12.2019',
          trans_id: '7632525',
          payment_date: '31.10.2019',
          amount: '$2,638',
          method: 'Non-cash',
          manager: 'Kristin Watson'
        }
      ],
      items: [
        {
          text: 'Payments',
          disabled: true,
          href: '/payments'
        }
      ]
    }
  }
}
</script>
