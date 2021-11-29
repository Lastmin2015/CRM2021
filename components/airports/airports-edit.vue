<template>
  <v-dialog v-model="dialogValue" width="600">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>
        Edit {{ airport.name }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card style="border-top-right-radius: 0px; border-top-left-radius: 0px;">
      <v-card-text class="pt-6">
        <v-text-field
          dense
          outlined
          label="Airport Name"
          :value="airport.name"
          @input="(e) => airportName = e"
        />
        <v-select
          dense
          outlined
          return-object
          item-text="region_name.name"
          :items="regions"
          @change="(e) => region = e.region_name.name"
          :value="airport.iso_region"
          label="Region"
        ></v-select>
        <v-select
          dense
          outlined
          item-text="country_name.name"
          return-object
          @change="(e) => country = e.country_name.name"
          :items="countries"
          :value="airport.iso_country"
          label="Country"
        ></v-select>
        <v-text-field
          dense
          outlined
          label="IATA Code"
          :value="airport.iata_code"
          @input="(e) => iataCode = e"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="$emit('dialog', false)"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="editAirport"
          :loading="loading"
        > Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AirportsEdit',
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    airport: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false,
    airportName: '',
    region: '',
    country: '',
    iataCode: '',
  }),
  methods: {
    ...mapActions({
      editAirportAction: "airports/edit"
    }),
    async editAirport() {
      this.loading = true

      const payload = {
        id: this.airport.id,
        data: {
          ...this.airport,
          name: this.airportName,
          iso_region: this.region,
          iso_country: this.country,
          iata_code: this.iataCode,
        }
      }
      delete payload.data.id

      await this.editAirportAction(payload)
      this.loading = false
      this.$emit('dialog', false)
    }
  },
  computed: {
    ...mapGetters({
      regions: "geography/regions/regions",
      countries: "geography/countries/countries",
    }),
    dialogValue: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('dialog', value)
      }
    },
    regionName() {
      const name = this.airport.region.region_name.name
      return !!name ? name : ''
    },
    countryName() {
      const name = this.airport.region.country.country_name.name
      return !!name ? name : ''
    }
  },
  watch: {
    dialog (value) {
      if (value)
        this.airportName = this.airport.name
        this.iataCode = this.airport.iata_code
        this.country = this.airport.iso_country
        this.region = this.airport.iso_region
    }
  }
}
</script>