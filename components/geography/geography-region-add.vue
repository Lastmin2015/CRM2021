<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Add region</v-toolbar-title>
      </v-toolbar>

      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card-text class="mt-5">
          <v-select
            dense
            outlined
            clearable
            v-model="country"
            item-value="id"
            label="Country"
            :rules="[v => !!v || 'Country is required']"
            required
            :items="countries"
            item-text="country_name.name"
          ></v-select>

           <v-text-field
            dense
            outlined
            v-model="region"
            :rules="[v => !!v || 'Region is required']"
            label="Name"
            required
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
            @click="addRegion"
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
      region: '',
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
      addRegionAction: "geography/regions/add",
    }),
    async addRegion() {
      if (this.$refs.form.validate()) {
        this.loading = true

        const payload = {
          name: this.region,
          country_id: this.country,
          show_in_filter: true,
          order: 0,
        }

        await this.addRegionAction(payload)

        this.loading = false
        this.$emit('dialog', false)
        this.$notifier.showMessage({ content: 'New region successfully added' })
      }
    },
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.country = ''
        this.region = ''
        this.valid = true
      }
    }
  }
}
</script>