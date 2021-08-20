<template>
  <v-dialog
    v-model="$attrs.value"
    transition="dialog-bottom-transition"
    max-width="300px"
    scrollable
  >
    <v-card tile>
      <v-toolbar
        flat
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="$parent.addAirport = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Airports</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="addBeach"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-select
          v-model="airport.airport_id"
          :items="airports"
          item-value="id"
          item-text="name"
          label="Airport"
          required
        ></v-select>
        <v-text-field
          v-model.number="airport.distance"
          type="number"
          label="Distance"
        ></v-text-field>
        <v-text-field
          v-model.number="airport.transfer_time"
          type="number"
          label="Transfer Time"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CountryAddShield',
  data () {
    return {
      airport: {
        hotel_id: '',
        airport_id: '',
        distance: 0,
        transfer_time: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      airports: 'airports/airports'
    })
  },
  async mounted () {
    this.airport.hotel_id = this.$route.params.id
    await this.getAirports()
  },
  methods: {
    ...mapActions({
      addAction: 'hotels/airport/add',
      getAirports: 'airports/get'
    }),
    async addBeach () {
      await this.addAction(this.airport)
      this.$parent.addAirport = false
    }
  }
}
</script>

<style scoped>

</style>
