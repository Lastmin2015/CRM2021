<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="resorts"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Resort</v-toolbar-title>
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
          @click="editResort(item)"
          small
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteResort(item.id)"
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
    <resort-add-shield v-model="addShield" />
    <resort-edit-shield v-if="editShield" v-model="editShield" :item="editItem" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ResortAddShield from '../../components/ResortAddShield'
import ResortEditShield from '../../components/ResortEditShield'

export default {
  name: 'HotelPrices',
  components: {
    ResortAddShield,
    ResortEditShield
  },
  data () {
    return {
      editShield: false,
      addShield: false,
      editItem: null,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'ID Region', value: 'region_id' },
        // { text: 'ID Cities', value: 'id_city' },
        { text: 'Actions', value: 'actions', sortable: false }
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
  },
  computed: {
    ...mapGetters({
      resorts: 'geography/resort/resorts'
    })
  },
  methods: {
    ...mapActions({
      deleteResort: 'geography/resort/deleteResort'
    }),
    editResort (item) {
      this.editItem = JSON.parse(JSON.stringify(item))
      this.editShield = true
    }
  }
}
</script>

<style scoped>

</style>
