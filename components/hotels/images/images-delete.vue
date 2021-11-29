<template>
  <v-dialog v-model="state" max-width="600px">
    <v-card min-height="500"  width="600" class="pa-5 pb-2">
      <v-img :src="imgSRC" height="500" width="100%"></v-img>
      <v-card-actions class="mr-0 mt-3 px-0 d-flex justify-space-between">
        <v-btn
          v-if="!isOperator"
          color="red"
          text
          :loading="loading"
          @click="deleteImg"
        >
          Delete
        </v-btn>
        <v-btn
          color="grey darken-3"
          text
          @click="$emit('handleDialog', false)"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HotelImagesDialog",
  data: () => ({
    loading: false
  }),
  props: {
    dialog: {
      type: Boolean,
      required: false,
    },
    src: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      isOperator: "auth/isOperator"
    }),
    state: {
      get() {
        return this.dialog;
      },
      set(newVal, oldVal) {
        this.$emit('handleDialog', newVal)
      }
    },
    imgSRC() {
      return `${process.env.baseUrl}/storage/${this.src}`;
    }
  },
  methods: {
    deleteImg() {
      this.loading = true
      this.$axios.delete(`/api/hotel-images/${this.id}`).then(() => {
        this.$store.dispatch('hotels/getById', this.hotel.id)
        this.loading = false
        this.$emit('handleDialog', false)
        this.$notifier.showMessage({ content: 'Image successfully deleted!' })
      })
    }
  }
};
</script>