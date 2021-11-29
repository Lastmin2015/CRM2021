<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Edit region</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-select
          dense
          outlined
          clearable
          return-object
          label="Country"
          :items="countries"
          item-text="country_name.name"
          @change="setCountryForRegion"
          :value="region.country.country_name.name"
        ></v-select>
        <v-text-field
          dense
          outlined
          label="Name"
          v-model="region.region_name.name"
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
          @click="editRegion"
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
  name: "GeographyRegionEdit",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    editableRegion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      region: {
        region_name: {
          name: ''
        },
        country: {
          country_name: {
            name: ''
          }
        }
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      regionsNames: "geography/regions/regionsNames",
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
      editRegionAction: "geography/regions/edit",
    }),
    async editRegion() {
      this.loading = true

      const regionName = this.regionsNames.find(name => name.region_id === this.region.id)

      const payload = {
        idRegion: this.region.id,
        idRegionName: regionName.id,
        dataRegionName: {
          region_id: this.region.id,
          name: this.region.region_name.name,
          locale: regionName.locale
        },
        dataRegion: {
          name: this.region.region_name.name,
          country_id: this.region.country.id,
          show_in_filter: this.region.show_in_filter,
          order: this.region.order,
        }
      }

      await this.editRegionAction(payload)

      this.loading = false
      this.$emit('dialog', false)
      this.$notifier.showMessage({ content: 'Regions details were successfully updated' })
    },
    setCountryForRegion(country) {
      if (country) {
        this.region.country.country_name = country.country_name
        this.region.country.id = country.id
      }
    }
  },
  watch: {
    dialog(value) {
      if (value) this.region = JSON.parse(JSON.stringify(this.editableRegion))
    }
  }
}
</script>