<template>
  <v-dialog
    v-model="$attrs.value"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
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
          @click="$parent.addShield = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Airport</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="addAirport"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="airport.name"
              label="Name"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-select
              v-model="airport.country_id"
              :items="country"
              item-value="id"
              item-text="name"
              label="Country"
              required
            ></v-select>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="airport.iata_code"
              label="Iata code"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="airport.type"
              label="Type"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model.number="airport.latitude_deg"
              type="number"
              label="Latitude"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model.number="airport.longitude_deg"
              type="number"
              label="Longitude"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model.number="airport.elevation_ft"
              type="number"
              label="Elevantor"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="airport.iso_country"
              label="Iso country"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="airport.iso_region"
              label="Iso region"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="airport.municipality"
              label="Municipality"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="airport.scheduled_service"
              label="Scheduled service"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="airport.gps_code"
              label="GPS code"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="airport.local_code"
              label="Local code"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="airport.home_link"
              label="Home link"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="airport.wikipedia_link"
              label="Wikipedia link"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="4">
            <v-text-field
              v-model="airport.keywords"
              label="Keywords"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HotelAddShield',
  data () {
    return {
      airport: {
        ident: '',
        type: '',
        name: '',
        latitude_deg: 0,
        longitude_deg: 0,
        elevation_ft: 0,
        continent: '',
        iso_country: '',
        iso_region: '',
        municipality: '',
        scheduled_service: '',
        gps_code: '',
        iata_code: '',
        local_code: '',
        home_link: '',
        wikipedia_link: '',
        keywords: '',
        country_id: ''
      }
    }
  },
  async mounted () {
    await this.getCountry()
  },
  computed: {
    ...mapGetters({
      country: 'geography/country/country'
    })
  },
  methods: {
    ...mapActions({
      getCountry: 'geography/country/get',
      addAction: 'airports/add'
    }),
    async addAirport () {
      await this.addAction(this.airport)
      this.$parent.addShield = false
    }
  }
}
</script>

<style scoped>

</style>
