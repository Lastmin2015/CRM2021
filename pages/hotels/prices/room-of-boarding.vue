<template>
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
          <v-toolbar-title>List with Boarding type of Room types</v-toolbar-title>
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
  name: 'HotelPrices',
  data () {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        {
          text: 'ID Boarding types',
          value: 'boarding_id'
        }
      ],
      mock: [
        {
          id: 'VA-2',
          boarding_id: '01'
        },
        {
          id: 'VA-1',
          boarding_id: '02'
        },
        {
          id: 'VA-3',
          boarding_id: '03'
        }
      ],
      items: [
        {
          text: 'Hotels',
          disabled: false,
          href: '/hotels'
        },
        {
          text: 'Hotel Prices',
          disabled: true,
          href: '/hotels/prices'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
