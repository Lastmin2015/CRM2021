<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Add place</v-toolbar-title>
      </v-toolbar>

      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card-text class="mt-5">
          <v-select
            dense
            outlined
            required
            label="Country"
            item-value="id"
            v-model="country"
            :items="countries"
            @change="setCountry"
            :loading="countryLoading"
            :disabled="countryLoading"
            item-text="country_name.name"
            :rules="[(v) => !!v || 'Country is required']"
          ></v-select>

          <v-select
            dense
            outlined
            required
            label="Region"
            item-value="id"
            v-model="region"
            @change="setRegion"
            :items="regionsByCountry"
            :loading="regionsLoading"
            :disabled="countryLoading || regionsLoading"
            item-text="region_name.name"
            :rules="[(v) => !!v || 'Region is required']"
          ></v-select>

          <!-- <v-select
            dense
            outlined
            required
            label="City"
            v-model="city"
            item-value="id"
            @change="setCity"
            :loading="cityLoading"
            :items="citiesByCountry"
            item-text="city_name.name"
            :disabled="countryLoading || cityLoading"
            :rules="[(v) => !!v || 'City is required']"
          ></v-select> -->

          <v-checkbox
            v-model="isCity"
            class="mt-0 pt-0"
            label="Is place city?"
          ></v-checkbox>

          <v-select
            dense
            outlined
            required
            label="Resort"
            item-value="id"
            v-model="resort"
            :disabled="regionsLoading"
            :items="resortsByRegion"
            item-text="resort_name.name"
            :rules="[(v) => !!v || 'Resort is required']"
          ></v-select>
            <!-- :disabled="cityLoading" -->

          <v-text-field
            dense
            outlined
            required
            label="Name"
            v-model="place"
            :rules="[(v) => !!v || 'Place name is required']"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn text @click="$emit('dialog', false)"> Cancel </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            text
            color="primary"
            @click="addPlace"
            :loading="loading"
            :disabled="!valid"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GeographyRegionEdit",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      // city: "",
      place: '',
      resort: "",
      region: '',
      country: '',
      valid: true,
      isCity: true,
      loading: false,
      // cityLoading: false,
      regionsLoading: false,
      countryLoading: false,
      regionsByCountry: [],
      // citiesByCountry: [],
      resortsByRegion: []
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
      addPlaceAction: "geography/places/add",
    }),
    async addPlace() {
      if (this.$refs.form.validate()) {
        console.log();
        this.loading = true;

        const payload = {
          show_in_filter: true,
          order: 0,
          is_city: this.isCity,
          city_id: "",
          resort_id: this.resort,
          name: this.place
        };

        await this.addPlaceAction(payload);

        this.loading = false;
        this.$emit("dialog", false);
        this.$notifier.showMessage({ content: "New place successfully added" });
      }
    },
    async setCountry(e) {
      if (e) {
        this.countryLoading = true

        const regionsByCountry = await this.$axios.$get(`/api/regions?country_id=${e}&with_data=true`)
        // const citiesByCountry = await this.$axios.$get(`/api/cities?country_id=${e}&with_data=true`)

        this.regionsByCountry = regionsByCountry.result ? regionsByCountry.result : []
        // this.citiesByCountry = citiesByCountry.result ? citiesByCountry.result : []

        this.countryLoading = false
      } else {
        this.regionsByCountry = []
        // this.citiesByCountry = []
      }
    },
    async setRegion(e) {
      if (e) {
        this.regionsLoading = true

        const resortsByRegion = await this.$axios.$get(`/api/resorts?region_id=${e}&with_data=true`)
        this.resortsByRegion = resortsByRegion.result ? resortsByRegion.result : []

        this.regionsLoading = false
      }
    }
  },
  watch: {
    dialog(value) {
      if (!value) {
        // this.city = ""
        this.place = ''
        this.resort = ""
        this.region = ''
        this.country = ''
        this.valid = true
        this.isCity = true
        this.regionsByCountry = []
        // this.citiesByCountry = []
        this.resortsByCity = []
      }
    }
  }
};
</script>