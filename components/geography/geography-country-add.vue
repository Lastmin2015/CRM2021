<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Add country</v-toolbar-title>
      </v-toolbar>

      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card-text class="mt-5">
          <v-text-field
            dense
            outlined
            v-model="country"
            :rules="[v => !!v || 'Country is required']"
            label="Country"
            required
          ></v-text-field>
          <v-radio-group
            row
            v-model="locale"
            class="mt-0"
          >
            <!-- v-for="(locale, i) in locales" -->
            <!-- :key="i" -->
            <v-radio
              label="en"
              value="en"
            ></v-radio>
          </v-radio-group>
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
            @click="addCountry"
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
  name: "GeographyCountryAdd",
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
      locale: 'en',
      country: '',
      valid: true,
    };
  },
  computed: {
    ...mapGetters({
      countries: "geography/countries/countries"
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
      addCountryAction: "geography/countries/add",
    }),
    async addCountry() {
      if (this.$refs.form.validate()) {
        this.loading = true

        const payload = {
          countryData: {
            show_in_filter: true,
            order: 0
          },
          countryNameData: {
            name: this.country,
            locale: this.locale,
          }
        }

        await this.addCountryAction(payload)

        this.loading = false
        this.$emit('dialog', false)
        this.$notifier.showMessage({ content: 'New country successfully added' })
      }
    },
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.country = ''
        this.valid = true
      }
    }
  }
}
</script>

