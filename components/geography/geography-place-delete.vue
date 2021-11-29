<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Delete resort</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mt-5 black--text body-2">
        Would you like to delete <strong> {{ placeName }} </strong> ?
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
          @click="deletePlace"
          :loading="loading"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "GeographyPlaceDelete",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    // placeID: {
    //   type: String,
    //   required: true
    // },
    place: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      loading: false,
      placeID: '',
      placeName: ''
    };
  },
  computed: {
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
      deletePlaceAction: "geography/places/deletePlace",
    }),
    async deletePlace() {
      this.loading = true

      await this.deletePlaceAction(this.placeID)

      this.loading = false
      this.$emit('dialog', false)
      this.$notifier.showMessage({ content: 'Place was successfully deleted' })
    }
  },
  watch: {
    dialog(value) {
      if (value) {
        this.placeID = this.place.id
        this.placeName = this.place.name
      }
    }
  }
}
</script>