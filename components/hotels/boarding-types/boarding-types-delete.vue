<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        small
        color="red"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Delete boarding type</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5 black--text body-2">
        Would you like to delete
        <strong class="primary--text"> {{ type.name }} </strong> from hotels
        boarding types ?
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="dialog = false"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="red" @click="deleteType" :loading="loading">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RoomDelete",
  props: ["type"],
  data() {
    return {
      loading: false,
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotelNoData",
    }),
    hotelID() {
      return this.hotel.id;
    },
  },
  methods: {
    ...mapActions({
      deleteTypection: "hotels/edit",
    }),
    async deleteType() {
      this.loading = true;

      let boarding_type_id = this.hotel.boarding_type_id.filter(
        (id) => id !== this.type.boarding_type_id
      );

      const payload = {
        id: this.hotelID,
        data: {
          ...this.hotel,
          boarding_type_id,
        },
      };

      await this.deleteTypection(payload);

      this.loading = false;
      this.dialog = false;
      this.$notifier.showMessage({
        content: "Boarding type was successfully deleted",
      });
    },
  },
};
</script>