<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Delete hotel</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mt-5 black--text body-2">
        Would you like to delete <strong> {{ hotelName }} </strong>?
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
          @click="deleteHotel"
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
  name: "HotelDelete",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    hotelName: {
      type: String,
      required: true,
    },
    hotelID: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      loading: false,
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
      deleteHotelAction: "hotels/deleteHotel",
    }),
    async deleteHotel() {
      this.loading = true

      await this.deleteHotelAction(this.hotelID)

      this.loading = false
      this.$emit('dialog', false)
      this.$notifier.showMessage({ content: 'Hotel was successfully deleted' })
    }
  }
}
</script>