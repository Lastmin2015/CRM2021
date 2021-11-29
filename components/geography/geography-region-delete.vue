<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Delete region</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mt-5 black--text body-2">
        Would you like to delete <strong> {{ region.region_name.name }} </strong> region?
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
          @click="deleteRegion"
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
  name: "GeographyRegionEdit",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    region: {
      type: Object,
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
      regionNames: "geography/regions/regionsNames"
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
      deleteRegionAction: "geography/regions/deleteRegion",
    }),
    async deleteRegion() {
      this.loading = true

      const regionName = this.regionNames.find(name => name.region_id === this.region.id)
      const payload = {
        regionID: this.region.id,
        regionNameID: regionName.id
      }

      await this.deleteRegionAction(payload)

      this.loading = false
      this.$emit('dialog', false)
      this.$notifier.showMessage({ content: 'Region was successfully deleted' })
    }
  }
}
</script>