<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title v-if="airport"> Edit {{ airport.airport.name }} details </v-card-title>
      <v-card-text>
        <v-text-field
          @input="(e) => (distance = e)"
          label="Distance"
          type="number"
          :value="airport.distance"
          min="0"
          outlined
          dense
        />
        <v-text-field
          @input="(e) => (transferTime = e)"
          label="Transfer time"
          type="number"
          :value="airport.transfer_time"
          min="0"
          outlined
          dense
        />
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$emit('showEditDialog', false)">
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" :loading="loading" text @click="changeDetails">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HotelsAirportEdit",
  data: () => ({
    distance: "",
    transferTime: "",
    loading: false,
  }),
  props: {
    showEdit: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    airport: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions({
      changeAirportDetails: "hotels/airport/changeAirportDetails",
      getHotelsAirports: "hotels/airport/getHotelsAirports",
    }),
    changeDetails() {
      this.loading = true;
      // console.log(this.airport.id);
      // console.log(this.hotel);
      // console.log(this.airport.airport.id);

      const data = {
        hotel_id: this.hotel.id,
        airport_id: this.airport.airport.id,
        id: this.airport.id,
        distance: +this.distance,
        transfer_time: +this.transferTime,
      };
      this.changeAirportDetails(data).then(() => {
        this.getHotelsAirports(this.hotel.id);
        this.loading = false;
        this.$emit("showEditDialog", false);
      });
    },
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
    }),
    dialog: {
      get() {
        return this.showEdit;
      },
      set(newVal) {
        this.$emit("showEditDialog", newVal);
      },
    },
  },
  watch: {
    showEdit(newVal) {
      if (newVal) {
        this.distance = this.airport.distance;
        this.transferTime = this.airport.transfer_time;
      } else {
        this.distance = "";
        this.transferTime = "";
      }
    },
  },
};
</script>

<style>
</style>