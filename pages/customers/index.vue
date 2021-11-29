<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Customers
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
        <template v-slot:[`item.info`]="{ item }">
          <nuxt-link :to="`/customers/${item.id}`">
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
        { text: 'Firstname', value: 'firstname' },
        { text: 'Lastname', value: 'lastname', width: 150 },
        { text: 'Reg Date', value: 'reg_date', width: 150 },
        { text: 'E-mail', value: 'email', width: 200 },
        { text: 'Country', value: 'country', width: 150 },
        { text: 'Bookings Num', value: 'booking_num', width: 150 },
        { text: '', value: 'actions', width: 121 }
      ],
      mock: [
        {
          id: '0000000000001',
          firstname: 'Gloria',
          lastname: 'Lane',
          reg_date: '14.07.2020',
          email: 'binhan628@gmail.com',
          booking_num: 'Saint Barthélemy',
          country: 'BA9212320'
        },
        {
          id: '0000000000001',
          firstname: 'Gloria',
          lastname: 'Lane',
          reg_date: '14.07.2020',
          email: 'binhan628@gmail.com',
          booking_num: 'Saint Barthélemy',
          country: 'BA9212320'
        }
      ],
      items: [
        {
          text: 'Customers',
          disabled: true,
          href: '/customers'
        }
      ]
    }
  }
}
</script>
