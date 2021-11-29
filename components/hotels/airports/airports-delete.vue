<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title>
        Delete Airport
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="mt-3 body-1 black--text">
          Would you like to delete <strong class="primary--text">{{ airport.airport.name }}</strong> from airports of {{ hotel.name }}?
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$emit('showDeleteDialog', false)">
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          text
          @click="deleteAirport"
          :loading="loading"
        > Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'HotelsAirportDelete',
  data: () => ({
    loading: false
  }),
  props: {
    showDelete: {
      type: Boolean,
      required: false,
      default: () => false
    },
    airport: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  methods: {
    ...mapActions({
      deleteAirportfromHotel: "hotels/airport/deleteAirport",
      getHotelsAirports: "hotels/airport/getHotelsAirports"
    }),
    deleteAirport() {
      this.loading = true
      this.deleteAirportfromHotel(this.airport.id)
        .then(() => {
          this.getHotelsAirports(this.hotel.id)
          this.loading = false
          this.$emit('showDeleteDialog', false)
        })
    }
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
    }),
    dialog: {
      get() {
        return this.showDelete
      },
      set(newVal) {
        this.$emit('showDeleteDialog', newVal)
      },
    }
  }
}
</script>

<style>

</style>