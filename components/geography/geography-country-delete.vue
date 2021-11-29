<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Delete country</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mt-5 black--text body-2">
        Would you like to delete <strong> {{ country }} </strong>?
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="$emit('dialog', false)"
        > Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="red"
          @click="deleteCountry"
          :loading="loading"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GeographyCountryDelete",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    country: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      countryNames: "geography/countries/countryNames"
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
      deleteCountryAction: "geography/countries/deleteCountry",
    }),
    async deleteCountry() {
      this.loading = true

      const countryName = this.countryNames.find(name => name.country_id == this.id)
      const payload = {
        countryID: this.id,
        countryNameID: countryName.id
      }

      await this.deleteCountryAction(payload)

      this.loading = false
      this.$emit('dialog', false)
      this.$notifier.showMessage({ content: 'Country was successfully deleted' })
    }
  }
}
</script>