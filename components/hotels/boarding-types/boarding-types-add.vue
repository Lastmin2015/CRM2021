<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small text v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Add Boarding type</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        <v-select
          dense
          outlined
          required
          label="Boarding type"
          item-value="id"
          v-model="type"
          :items="types"
          item-text="boarding_type_name.name"
        ></v-select>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="dialog = false"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="addType"
          :loading="loading"
          :disabled="!type"
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
      type: "",
    };
  },
  computed: {
    ...mapGetters({
      BTypes: "hotels/boarding-types/boardingTypes",
      hotel: "hotels/currentHotelNoData",
    }),
    types() {
      let types = JSON.parse(JSON.stringify(this.BTypes));

      if (this.hotel.boarding_type_id !== null && this.hotel.boarding_type_id.length) {
        this.hotel.boarding_type_id.forEach((id) => {
          if (this.BTypes.some((type) => type.id === id)) {
            types = types.filter((r) => r.id !== id);
          }
        });
      }

      return types;
    },
  },
  methods: {
    ...mapActions({
      addTypeAction: "hotels/edit",
    }),
    async addType() {
      this.loading = true;
      const payload = {
        id: this.hotel.id,
        data: {
          ...this.hotel,
          boarding_type_id: this.hotel.boarding_type_id
            ? [...this.hotel.boarding_type_id, this.type]
            : [this.type],
        },
      };

      await this.addTypeAction(payload);
      this.dialog = false;
      this.loading = false;
      this.$notifier.showMessage({ content: "Room type successfully added" });
    },
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.type = "";
      }
    },
  },
};
</script>

