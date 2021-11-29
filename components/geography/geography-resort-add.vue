<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Add resort</v-toolbar-title>
      </v-toolbar>

      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card-text class="mt-5">
          <v-select
            dense
            outlined
            required
            item-value="id"
            label="Country"
            v-model="country"
            :items="countries"
            @change="setCountry"
            :loading="countryLoading"
            :disabled="countryLoading"
            item-text="country_name.name"
            :rules="[v => !!v || 'Country is required']"
          ></v-select>

          <v-select
            dense
            outlined
            required
            return-object
            label="Region"
            v-model="region"
            :items="regionsByCountry"
            :disabled="countryLoading"
            item-text="region_name.name"
            :rules="[v => !!v || 'Region is required']"
          ></v-select>

          <!-- <v-select
            dense
            outlined
            required
            label="City"
            v-model="city"
            item-value="id"
            :items="citiesByCountry"
            item-text="city_name.name"
            :disabled="countryLoading"
            :rules="[v => !!v || 'City is required']"
          ></v-select> -->

           <v-text-field
            dense
            outlined
            required
            label="Name"
            v-model="resort"
            :rules="[v => !!v || 'Resort is required']"
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
            @click="addResort"
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
    }
  },
  data() {
    return {
      loading: false,
      country: '',
      resort: '',
      region: '',
      // city: '',
      valid: true,
      countryLoading: false,
      regionsByCountry: [],
      // citiesByCountry: [],
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
      addResortAction: "geography/resorts/add",
    }),
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
    async addResort() {
      if (this.$refs.form.validate()) {
        this.loading = true

        const payload = {
          resortData: {
            region_id: this.region.id,
            city_id: "",
            show_in_filter: true,
            order: 0,
          },
          resortNameData: {
            name: this.resort,
            locale: "en",
          }
        }

        await this.addResortAction(payload)

        this.loading = false
        this.$emit('dialog', false)
        this.$notifier.showMessage({ content: 'New resort successfully added' })
      }
    },
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.country = ''
        this.resort = ''
        this.region = ''
        // this.city = ''
        this.valid = true
        this.regionsByCountry = []
        this.citiesByCountry = []
      }
    }
  }
}
</script>