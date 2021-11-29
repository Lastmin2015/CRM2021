<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Edit country</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-text-field
          dense
          outlined
          label="Country"
          v-model="country"
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
          @click="editCountry"
          :loading="loading"
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
  name: "GeographyCountryEdit",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    editableCountry: {
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
      country: '',
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
      editCountryAction: "geography/countries/edit",
    }),
    async editCountry() {
      this.loading = true;

      const countryName = this.countryNames.find(name => name.country_id == this.id)
      const payload = {
        id: countryName.id,
        data: {
          ...countryName,
          name: this.country
        }
      }
      delete payload.data.id

      await this.editCountryAction(payload);
      this.loading = false;
      this.$emit("dialog", false);
      this.$notifier.showMessage({content: 'Country name was successfully updated'})
    },
  },
  watch: {
    dialog(value) {
      if (value) this.country = this.editableCountry
    }
  }
};
</script>