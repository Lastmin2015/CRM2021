<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="country"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Country</v-toolbar-title>
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
          @click="editCountry(item)"
          small
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteCountry(item.id)"
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
    <country-add-shield v-model="addShield" />
    <country-edit-shield v-if="editShield" v-model="editShield" :item="editItem" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CountryAddShield from '../../components/CountryAddShield'
import CountryEditShield from '../../components/CountryEditShield'

export default {
  name: 'HotelPrices',
  components: {
    CountryAddShield,
    CountryEditShield
  },
  async fetch ({ store }) {
    await store.dispatch('geography/country/get')
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
        {
          text: 'Name',
          value: 'name'
        },
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
      country: 'geography/country/country'
    })
  },
  methods: {
    ...mapActions({
      deleteCountry: 'geography/country/deleteCountry'
    }),
    editCountry (item) {
      this.editItem = JSON.parse(JSON.stringify(item))
      this.editShield = true
    }
  }
}
</script>

<style scoped>

</style>
