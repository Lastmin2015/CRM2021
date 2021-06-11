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
          value: 'name'
        },
        { text: 'Hotel Name', value: 'calories' },
        { text: 'Place', value: 'fat' },
        { text: 'Resort', value: 'carbs' },
        { text: 'Region', value: 'protein' },
        { text: 'Country', value: 'protein' },
        { text: 'Type', value: 'protein' },
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
  }
}
</script>

<style scoped>

</style>
