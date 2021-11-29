<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Edit resort</v-toolbar-title>
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
            :value="editableResort.countryName"
            :rules="[v => !!v || 'Country is required']"
          ></v-select>

          <v-select
            dense
            outlined
            required
            return-object
            label="Region"
            @change="setRegion"
            :items="regionsByCountry"
            :disabled="countryLoading"
            item-text="region_name.name"
            :value="editableResort.regionName"
            :rules="[v => !!v || 'Region is required']"
          ></v-select>
<!--
          <v-select
            dense
            outlined
            required
            label="City"
            return-object
            @change="setCity"
            :items="citiesByCountry"
            item-text="city_name.name"
            :disabled="countryLoading"
            :value="editableResort.cityName"
            :rules="[v => !!v || 'City is required']"
          ></v-select> -->

          <v-text-field
            dense
            outlined
            required
            label="Name"
            v-model="editableResort.resortName"
            :rules="[v => !!v || 'Resort name is required']"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            text
            @click="$emit('dialog', false)"
          > Cancel </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            text
            color="primary"
            @click="editResort"
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
  name: "GeographyResortEdit",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    resort: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      valid: true,
      loading: false,
      countryLoading: false,
      regionsByCountry: [],
      // citiesByCountry: [],
      editableResort: {
        countryName: '',
        countryID: '',
        regionName: '',
        regionID: '',
        // cityName: '',
        // cityID: '',
        resortName: '',
        resortID: ''
      }
    };
  },
  methods: {
    ...mapActions({
      editResortAction: "geography/resorts/edit",
    }),
    async editResort() {
      this.loading = true

      const payload = {
        resortData: {
          region_id: this.editableResort.regionID,
          city_id: "",
          show_in_filter: this.resort.show_in_filter,
          order: this.resort.order
        },
        resortNameData: {
          resort_id: this.editableResort.resortID,
          name: this.editableResort.resortName,
          locale: "en"
        }
      }

      await this.editResortAction(payload)

      this.loading = false
      this.$emit('dialog', false)
      this.$notifier.showMessage({ content: 'Resort details were successfully updated' })
    },
    async setCountry(country) {
      if (country) {
        this.countryLoading = true
        this.editableResort.countryName = country.country_name.name
        this.editableResort.countryID = country.id

        const regionsByCountry = await this.$axios.$get(`/api/regions?country_id=${country.id}&with_data=true`)
        // const citiesByCountry = await this.$axios.$get(`/api/cities?country_id=${country.id}&with_data=true`)

        this.regionsByCountry = regionsByCountry.result ? regionsByCountry.result : []
        // this.citiesByCountry = citiesByCountry.result ? citiesByCountry.result : []

        this.countryLoading = false
      }
    },
    setRegion(region) {
      if (region) {
        this.editableResort.regionName = region.region_name.name
        this.editableResort.regionID = region.id
      }
    },
    // setCity(city) {
    //   if (city) {
    //     this.editableResort.cityName = city.city_name.name
    //     this.editableResort.cityID = city.id
    //   }
    // },
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
  watch: {
    async dialog(value) {
      if (value) {
        this.countryLoading = true

        this.editableResort.countryName = this.resort.region.country.country_name.name,
        this.editableResort.countryID = this.resort.region.country.id,
        this.editableResort.regionName = this.resort.region.region_name.name,
        this.editableResort.regionID = this.resort.region.id,
        // this.editableResort.cityName = this.resort.city.city_name.name,
        // this.editableResort.cityID = this.resort.city.id,
        this.editableResort.resortName = this.resort.resort_name.name,
        this.editableResort.resortID = this.resort.id

        const countryID = this.resort.region.country.id

        const regionsByCountry = await this.$axios.$get(`/api/regions?country_id=${countryID}&with_data=true`)
        // const citiesByCountry = await this.$axios.$get(`/api/cities?country_id=${countryID}&with_data=true`)

        this.regionsByCountry = regionsByCountry.result
        // this.citiesByCountry = citiesByCountry.result

        this.countryLoading = false
      }
    }
  }
}
</script>