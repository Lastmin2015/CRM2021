<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Edit place</v-toolbar-title>
      </v-toolbar>

      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card-text class="mt-5">
          <v-select
            dense
            outlined
            required
            return-object
            label="Country"
            :items="countries"
            @change="setCountry"
            :loading="countryLoading"
            item-text="country_name.name"
            :value="editablePlace.countryName"
            :rules="[(v) => !!v || 'Country is required']"
          ></v-select>

          <v-select
            dense
            outlined
            required
            return-object
            label="Region"
            @change="setRegion"
            :items="regionsByCountry"
            :disabled="countryLoading || resortsLoading"
            item-text="region_name.name"
            :value="editablePlace.regionName"
            :rules="[v => !!v || 'Region is required']"
          ></v-select>

          <!-- <v-select
            dense
            outlined
            required
            label="City"
            return-object
            @change="setCity"
            :loading="cityLoading"
            :items="citiesByCountry"
            item-text="city_name.name"
            :value="editablePlace.cityName"
            :disabled="countryLoading || cityLoading"
            :rules="[v => !!v || 'City is required']"
          ></v-select> -->

          <v-checkbox
            v-model="editablePlace.isCity"
            label="Is place city?"
            class="mt-0 pt-0"
          ></v-checkbox>

          <v-select
            dense
            outlined
            required
            label="Resort"
            return-object
            @change="setResort"
            :items="resortsByRegion"
            :disabled="regionsLoading"
            item-text="resort_name.name"
            :value="editablePlace.resortName"
            :rules="[(v) => !!v || 'Resort is required']"
          ></v-select>

          <v-text-field
            dense
            outlined
            required
            label="Name"
            v-model="editablePlace.placeName"
            :rules="[(v) => !!v || 'Place is required']"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn text @click="$emit('dialog', false)"> Cancel </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            text
            color="primary"
            @click="editPlace"
            :loading="loading"
            :disabled="!valid"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GeographyPlaceEdit",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    place: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      countryLoading: false,
      regionsLoading: false,
      regionsByCountry: [],
      // citiesByCountry: [],
      resortsByRegion: [],
      editablePlace: {
        countryName: '',
        countryID: '',
        regionName: '',
        regionID: '',
        // cityName: '',
        // cityID: '',
        isCity: true,
        resortName: '',
        resortID: '',
        placeName: '',
      },
      valid: true,
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      countries: "geography/countries/countries",
    }),
    dialogValue: {
      get() {
        return this.dialog;
      },
      set(newVal) {
        this.$emit("dialog", newVal);
      },
    },
  },
  methods: {
    ...mapActions({
      editPlaceAction: "geography/places/edit",
    }),
    async editPlace() {

      if (this.$refs.form.validate()) {
        this.loading = true;

        const payload = {
          id: this.place.id,
          data: {
            order: this.place.order,
            is_city: this.editablePlace.isCity,
            city_id: "",
            name: this.editablePlace.placeName,
            resort_id: this.editablePlace.resortID,
            show_in_filter: this.place.show_in_filter,
          },
        };

        await this.editPlaceAction(payload);

        this.loading = false;
        this.$emit("dialog", false);
        this.$notifier.showMessage({
          content: "Place details were successfully updated",
        });
      }
    },
    async setCountry(country) {
      if (country) {
        this.countryLoading = true
        this.editablePlace.countryName = country.country_name.name
        this.editablePlace.countryID = country.id

        const regionsByCountry = await this.$axios.$get(`/api/regions?country_id=${country.id}&with_data=true`)
        // const citiesByCountry = await this.$axios.$get(`/api/cities?country_id=${country.id}&with_data=true`)

        this.regionsByCountry = regionsByCountry.result ? regionsByCountry.result : []
        // this.citiesByCountry = citiesByCountry.result ? citiesByCountry.result : []

        this.resortsByRegion = []

        this.countryLoading = false
      }
    },
    async setRegion(region) {
      if (region) {
        this.regionsLoading = true

        this.editablePlace.regionName = region.region_name.name
        this.editablePlace.regionID = region.id

        const resortsByRegion = await this.$axios.$get(`/api/resorts?region_id=${region.id}&with_data=true`)
        this.resortsByRegion = resortsByRegion.result ? resortsByRegion.result : []

        this.regionsLoading = false
      }
    },
    // setRegion(region) {
    //   if (region) {
    //     this.editablePlace.regionName = region.region_name.name
    //     this.editablePlace.regionID = region.id
    //   }
    // },
    setResort(resort) {
      if (resort) {
        this.editablePlace.resortName = resort.resort_name.name
        this.editablePlace.resortID = resort.id
      }
    }
  },
  watch: {
    async dialog(value) {
      if (value) {
        this.countryLoading = true

        this.editablePlace.countryName = this.place.resort.region.country.country_name.name,
        this.editablePlace.countryID = this.place.resort.region.country.id,
        this.editablePlace.regionName = this.place.resort.region.region_name.name,
        this.editablePlace.regionID = this.place.resort.region.id,
        // this.editablePlace.cityName = this.place.city.city_name.name,
        // this.editablePlace.cityID = this.place.city.id,
        this.editablePlace.resortName = this.place.resort.resort_name.name,
        this.editablePlace.resortID = this.place.resort.id
        this.editablePlace.placeName = this.place.name

        const countryID = this.place.resort.region.country.id
        const regionID = this.place.resort.region.id
        // const cityID = this.place.city.id

        const regionsByCountry = await this.$axios.$get(`/api/regions?country_id=${countryID}&with_data=true`)
        // const citiesByCountry = await this.$axios.$get(`/api/cities?country_id=${countryID}&with_data=true`)
        const resortsByRegion = await this.$axios.$get(`/api/resorts?region_id=${regionID}&with_data=true`)

        this.regionsByCountry = regionsByCountry.result
        // this.citiesByCountry = citiesByCountry.result
        this.resortsByRegion = resortsByRegion.result ? resortsByRegion.result : []

        this.countryLoading = false
      } else {
        this.regionsByCountry = []
        // this.citiesByCountry = []
        this.resortsByRegion = []
        this.editablePlace = {
          countryName: '',
          countryID: '',
          regionName: '',
          regionID: '',
          // cityName: '',
          // cityID: '',
          isCity: true,
          resortName: '',
          resortID: '',
          placeName: '',
        }
      }
    }
  }
};
</script>