<template>
  <v-dialog v-model="dialogValue" width="600">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>
        Edit Hotel Location
      </v-toolbar-title>
    </v-toolbar>

    <v-card style="border-top-right-radius: 0px; border-top-left-radius: 0px;">
      <v-card-text class="pt-6">
        <v-select
          dense
          outlined
          required
          label="Country"
          :items="countries"
          return-object
          @change="setCountry"
          :loading="countryLoading"
          :disabled="countryLoading"
          item-text="country_name.name"
          :value="editableLocation.countryName"
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
          :value="editableLocation.regionName"
          :disabled="countryLoading || regionLoading"
        ></v-select>

        <v-select
          dense
          outlined
          required
          label="Resort"
          return-object
          @change="setResort"
          :items="resortsByRegion"
          :loading="resortLoading"
          item-text="resort_name.name"
          :value="editableLocation.resortName"
          :disabled="regionLoading || resortLoading"
        ></v-select>

        <v-select
          dense
          outlined
          label="Place"
          return-object
          item-text="name"
          @change="setPlace"
          :items="placesByResort"
          :disabled="resortLoading"
          no-data-text="No places available"
          :value="editableLocation.placeName"
        ></v-select>

        <v-text-field
          dense
          outlined
          type="number"
          label="Hotel latitude"
          v-model="editableLocation.latitude"
          @input="(e) => editableLocation.latitude = e"
        ></v-text-field>

        <v-text-field
          dense
          outlined
          type="number"
          label="Hotel longitude"
          v-model="editableLocation.longitude"
          @input="(e) => editableLocation.longitude = e"
        ></v-text-field>
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
          @click="editLocation"
          :loading="loading"
        > Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'LocationEdit',
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    loading: false,
    placesByResort: [],
    resortsByRegion: [],
    regionsByCountry: [],
    countryLoading: false,
    regionLoading: false,
    resortLoading: false,
    editableLocation: {
      countryName: "",
      countryID: "",
      regionName: "",
      regionID: "",
      resortName: "",
      resortID: "",
      placeName: "",
      placeID: "",
      longitude: "",
      latitude: ""
    }
  }),
  methods: {
    ...mapActions({
      editLocationAction: "hotels/edit",
      getCountries: "geography/countries/get"
    }),
    async editLocation() {
      this.loading = true

      const payload = {
        id: this.hotel.id,
        data: {
          ...this.hotelNoData,
          latitude: +this.editableLocation.latitude,
          longitude: +this.editableLocation.longitude,
          place_id: this.editableLocation.placeID,
        }
      }

      await this.editLocationAction(payload)

      this.loading = false
      this.$emit('dialog', false)
      this.$notifier.showMessage({content: 'Hotel location details were updated'})
    },
    async setCountry(country) {
      if (country.id) {
        this.countryLoading = true
        this.placesByResort = []
        this.resortsByRegion = []
        this.regionsByCountry = []
        const regions = await this.$axios.$get(`/api/regions?country_id=${country.id}&with_data=true`)
        this.regionsByCountry = regions.result ? regions.result : []
        this.countryLoading = false
      }
    },
    async setRegion(region) {
      if (region.id) {
        this.regionLoading = true
        const resorts = await this.$axios.$get(`/api/resorts?region_id=${region.id}&with_data=true`)
        this.resortsByRegion= resorts.result ? resorts.result : []
        this.regionLoading = false
      }
    },
    async setResort(resort) {
      if (resort.id) {
        this.resortLoading = true
        const places = await this.$axios.$get(`/api/places?resort_id=${resort.id}&with_data=true`)
        this.placesByResort= places.result ? places.result : []
        this.resortLoading = false
      }
    },
    setPlace(place) {
      this.editableLocation.placeName = place.name
      this.editableLocation.placeID = place.id
    },
  },
  computed: {
    ...mapGetters({
      countries: "geography/countries/countries",
      hotel: "hotels/currentHotel",
      hotelNoData: "hotels/currentHotelNoData",
    }),
    dialogValue: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('dialog', value)
      }
    }
  },
  created() {
    this.getCountries()
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.placesByResort = []
        this.resortsByRegion = []
        this.regionsByCountry = []
        this.editableLocation = {
          countryName: "",
          countryID: "",
          regionName: "",
          regionID: "",
          resortName: "",
          resortID: "",
          placeName: "",
          placeID: "",
          longitude: "",
          latitude: ""
        }
      } else {
        this.editableLocation.countryName = this.hotel.place.resort.region.country.country_name.name
        this.editableLocation.countryID = this.hotel.place.resort.region.country.id
        this.editableLocation.regionName = this.hotel.place.resort.region.region_name.name
        this.editableLocation.regionID = this.hotel.place.resort.region.id
        this.editableLocation.resortName = this.hotel.place.resort.resort_name.name
        this.editableLocation.resortID = this.hotel.place.resort.id
        this.editableLocation.placeName = this.hotel.place.name
        this.editableLocation.placeID = this.hotel.place.id
        this.editableLocation.longitude = this.hotel.longitude
        this.editableLocation.latitude = this.hotel.latitude

        this.setCountry(this.hotel.place.resort.region.country)
        this.setRegion(this.hotel.place.resort.region)
        this.setResort(this.hotel.place.resort)
      }
    }
  }
}
</script>