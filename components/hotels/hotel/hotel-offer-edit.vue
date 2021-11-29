<template>
  <v-dialog v-model="dialog" width="600px">

    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Edit traveler offer</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        <v-text-field
          dense
          outlined
          v-model.number="adults"
          type="number"
          min="0"
          label="Adults"
        ></v-text-field>

        <v-text-field
          dense
          outlined
          v-model.number="children"
          type="number"
          min="0"
          label="Children"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="dialog = false"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="editOffer"
          :loading="loading"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  props: ["editOfferItem", "showEditOffer"],
  data: () => {
    return {
      loading: false,
      adults: 0,
      children: 0
    }
  },
  methods: {
    editOffer() {

      this.loading = true

      let obj = {
        hotel_id: this.hotel.id,
        room_type_id: this.editOfferItem.room_type.room_type_id,
        boarding_type_id: this.editOfferItem.boardingTypeID,
        operator_id: this.editOfferItem.operator.id,
        adults: this.adults,
        children: this.children,
        is_active: true,
        created_at: 0,
        updated_at: 0
      }

      this.$axios.$put(`/api/graph-prices/${this.editOfferItem.id}`, obj)
        .then(() => {
          this.$store.dispatch('hotels/graphs/get', this.operatorID).then(() => {
            this.dialog = false
            this.loading = false
            this.$notifier.showMessage({content: "Traveler offer was successfully updated"})
          })
        })
    },
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      operatorID: "auth/operatorID",
    }),
    dialog: {
      get() {
        return this.showEditOffer
      },
      set(value) {
        this.$emit("dialog", value)
      }
    },
  },
  watch: {
    showEditOffer(value) {
      if (value) {
        this.adults = this.editOfferItem.adults
        this.children = this.editOfferItem.children
      }
    }
  }
};
</script>