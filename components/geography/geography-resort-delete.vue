<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Delete resort</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mt-5 black--text body-2">
        Would you like to delete <strong> {{ resortName ? resortName : 'resort'}} </strong> ?
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
          @click="deleteResort"
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
  name: "GeographyResortDelete",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    resortName: {
      type: String,
      required: true
    },
    resortID: {
      type: String,
      required: true
    },
    resortNameID: {
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
      deleteResortAction: "geography/resorts/deleteResort",
    }),
    async deleteResort() {
      this.loading = true

      const payload = {
        resortID: this.resortID,
        resortNameID: this.resortNameID
      }

      await this.deleteResortAction(payload)

      this.loading = false
      this.$emit('dialog', false)
      this.$notifier.showMessage({ content: 'Resort was successfully deleted' })
    }
  }
}
</script>