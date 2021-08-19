<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="place"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Place</v-toolbar-title>
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          @click="editPlace(item)"
          small
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deletePlace(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:[`item.is_city`]="{ item }">
        <v-checkbox
          :input-value="item.is_city"
          value
          disabled
        ></v-checkbox>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
        >
          Refresh
        </v-btn>
      </template>
    </v-data-table>
    <place-add-shield v-model="addShield" />
    <place-edit-shield v-if="editShield" v-model="editShield" :item="editItem" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PlaceAddShield from '../../components/PlaceAddShield'
import PlaceEditShield from '../../components/PlaceEditShield'

export default {
  name: 'HotelPrices',
  components: {
    PlaceAddShield,
    PlaceEditShield
  },
  async fetch ({ store }) {
    await store.dispatch('geography/place/get')
  },
  data () {
    return {
      addShield: false,
      editShield: false,
      editItem: [],
      headers: [
        // {
        //   text: 'ID',
        //   align: 'start',
        //   sortable: false,
        //   value: 'id'
        // },
        { text: 'ID Resort', value: 'resort_id' },
        { text: 'Is city', value: 'is_city' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters({
      place: 'geography/place/places'
    })
  },
  methods: {
    ...mapActions({
      deletePlace: 'geography/place/deletePlace'
    }),
    editPlace (item) {
      this.editItem = JSON.parse(JSON.stringify(item))
      this.editShield = true
    }
  }
}
</script>

<style scoped>

</style>
