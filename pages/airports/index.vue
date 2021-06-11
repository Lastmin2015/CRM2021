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
        :items="desserts"
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
          value: 'name'
        },
        { text: 'Name', value: 'calories' },
        { text: 'IATA code', value: 'fat' },
        { text: 'Region ID', value: 'carbs' },
        { text: 'Country ID', value: 'carbs' }
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
