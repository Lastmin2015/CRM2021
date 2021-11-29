<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small text v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Add room type</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        <v-select
          dense
          outlined
          required
          label="Room type"
          item-value="id"
          v-model="room"
          :items="roomTypes"
          item-text="room_type_name.name"
        ></v-select>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="dialog = false"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="addRoomType"
          :loading="loading"
          :disabled="!room"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GeographyCountryAdd",
  data() {
    return {
      dialog: false,
      loading: false,
      room: "",
    };
  },
  computed: {
    ...mapGetters({
      rooms: "hotels/rooms/rooms",
      hotel: "hotels/currentHotelNoData",
    }),
    roomTypes() {
      let rooms = JSON.parse(JSON.stringify(this.rooms));

      if (this.hotel.room_type_id !== null && this.hotel.room_type_id.length) {
        this.hotel.room_type_id.forEach((id) => {
          if (this.rooms.some((room) => room.id === id)) {
            rooms = rooms.filter((r) => r.id !== id);
          }
        });
      }

      return rooms;
    },
  },
  methods: {
    ...mapActions({
      addRoomTypeAction: "hotels/edit",
    }),
    async addRoomType() {
      this.loading = true;
      const payload = {
        id: this.hotel.id,
        data: {
          ...this.hotel,
          room_type_id: this.hotel.room_type_id
            ? [...this.hotel.room_type_id, this.room]
            : [this.room],
        },
      };

      await this.addRoomTypeAction(payload);
      this.dialog = false;
      this.loading = false;
      this.$notifier.showMessage({ content: "Room type successfully added" });
    },
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.room = "";
      }
    },
  },
};
</script>

