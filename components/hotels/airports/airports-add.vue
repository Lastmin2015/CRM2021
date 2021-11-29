<template>
  <v-dialog v-model="dialog" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Add Airport</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-select
          dense
          outlined
          label="Country"
          :items="countries"
          return-object
          @change="setCountry"
          :loading="countryLoading"
          :disabled="countryLoading"
          item-text="country_name.name"
          v-model="airport.countryName"
        ></v-select>

        <v-select
          dense
          outlined
          required
          label="Region"
          return-object
          @change="setRegion"
          :loading="regionLoading"
          :items="regionsByCountry"
          item-text="region_name.name"
          v-model="airport.regionName"
          :disabled="countryLoading || regionLoading"
        ></v-select>

        <v-select
          dense
          outlined
          required
          label="Airport"
          item-text="name"
          return-object
          @change="setAirport"
          :items="airportsByRegion"
          :disabled="regionLoading"
          :value="airport.airportName"
          no-data-text="No airports for region"
        ></v-select>

        <v-text-field
          dense
          outlined
          type="number"
          label="Distance"
          v-model.number="airport.distance"
        ></v-text-field>

        <v-text-field
          dense
          outlined
          type="number"
          label="Transfer Time"
          v-model.number="airport.transferTime"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="$emit('showAddDialog', false)"
        > Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="addAirport"
          :loading="loading"
          :disabled="!airport.airportName"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CountryAddShield",
  props: {
    showAdd: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      loading: false,
      countries: [],
      countryLoading: false,
      regionLoading: false,
      regionsByCountry: [],
      airportsByRegion: [],
      airport: {
        countryName: "",
        countryID: "",
        regionName: "",
        regionID: "",
        airportName: "",
        airportID: "",
        distance: 0,
        transferTime: 0
      },
    };
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      hotelsAirports: "hotels/airport/airports",
      // countries: "geography/countries/countries"
    }),
    dialog: {
      get() {
        return this.showAdd;
      },
      set(newVal) {
        this.$emit("showAddDialog", newVal);
      },
    },
  },
  methods: {
    ...mapActions({
      addAction: "hotels/airport/add",
      getCountries: "geography/countries/get"
    }),
    async addAirport() {
      if (this.airport.airportID && this.airport.airportName) {
        this.loading = true;

        const payload = {
          hotel_id: this.hotel.id,
          airport_id: this.airport.airportID,
          distance: this.airport.distance,
          transfer_time: this.airport.transferTime
        }

        await this.addAction(payload);
        this.loading = false;
        this.$emit("showAddDialog", false);
        this.countries = []
        this.regionsByCountry = []
        this.airportsByRegion = []
        this.airport = {
          countryName: "",
          countryID: "",
          regionName: "",
          regionID: "",
          airportName: "",
          airportID: ""
        }
      }
    },
    async setCountry(country) {
      this.countryLoading = true
      this.regionsByCountry = []
      this.airportsByRegion = []

      const regions = await this.$axios.$get(`/api/regions?country_id=${country.id}&with_data=true`)
      this.regionsByCountry = regions.result ? regions.result : []
      this.countryLoading = false
    },
    async setRegion (region) {
      this.regionLoading = true
      const airports = await this.$axios.$get(`/api/airports?region_id=${region.id}&with_data=true`)

      if (this.hotelsAirports && airports.result) {

        this.hotelsAirports.forEach(hotelAirport => {
          if (airports.result.some(airport => airport.id === hotelAirport.airport.id)) {
            airports.result = airports.result.filter(port => port.id !== hotelAirport.airport.id)
          }
        })
      }
      this.airportsByRegion= airports.result ? airports.result : []
      this.regionLoading = false
    },
    setAirport (airport) {
      this.airport.airportID = airport.id
      this.airport.airportName = airport.name
    }
  },
  watch: {
    async showAdd(value) {
      if (!value) {
        this.countries = []
        this.regionsByCountry = []
        this.airportsByRegion = []
        this.airport = {
          countryName: "",
          countryID: "",
          regionName: "",
          regionID: "",
          airportName: "",
          airportID: ""
        }
      } else {
        this.countryLoading = true
        this.countries = []
        this.regionsByCountry = []
        this.airportsByRegion = []
        this.airport = {
          countryName: "",
          countryID: "",
          regionName: "",
          regionID: "",
          airportName: "",
          airportID: ""
        }
        const { result: countries } = await this.$axios.$get('/api/countries?with_data=true')
        this.countries = countries
        this.countryLoading = false
      }
    }
  }
};
</script>