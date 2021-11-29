<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small icon color="green" v-bind="attrs" v-on="on">
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>New traveler offer</v-toolbar-title>
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
          v-model.number="kids"
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
          @click="addPrice"
          :loading="loading"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  props: {
    offer: {
      type: Object,
      required: false
    }
  },
  data: () => {
    return {
      dialog: false,
      loading: false,
      adults: 0,
      kids: 0
    }
  },
  methods: {
    async addPrice() {

      this.loading = true

      let obj = {
        hotel_id: this.hotel.id,
        room_type_id: this.offer.roomTypeID,
        boarding_type_id: this.offer.boardingTypeID,
        operator_id: this.operatorID,
        adults: this.adults,
        children: this.kids,
        is_active: true,
        created_at: 0,
        updated_at: 0
      }

      await this.$axios.$post('/api/graph-prices', obj)

      // let id = (this.offer.tab && this.offer.tab !==0) ? this.operators[this.offer.tab].id : ""

      await this.$store.dispatch('hotels/graphs/get', this.operatorID)

      this.dialog = false
      this.loading = false
      this.$notifier.showMessage({content: "New traveler offer successfully created"})
    },
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      operatorID: "auth/operatorID",
      // operators: "hotels/graphs/operators"
    }),
    // roomTypeID() {
    //   if (this.offer.items.length) {
    //     return this.offer.items[0].room_type.room_type_id
    //   } else {
    //     return "" //TODO
    //   }
    // }
  },
  watch: {
    dialog (value) {
      if (!value) {
        this.adults = 0
        this.kids = 0
      }
    }
  }
};
</script>