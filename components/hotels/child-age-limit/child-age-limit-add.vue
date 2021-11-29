<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small text v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Add child age limit</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        <v-text-field
          dense
          outlined
          type="number"
          min="1"
          label="From"
          v-model.number="limit.from"
        ></v-text-field>

        <v-text-field
          dense
          outlined
          type="number"
          min="1"
          label="To"
          v-model.number="limit.to"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="dialog = false"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="addLimit"
          :loading="loading"
          :disabled="!limit.from && !limit.to"
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
  name: "ChildAgeLimitAdd",
  data() {
    return {
      dialog: false,
      loading: false,
      limit: {
        from: "",
        to: ""
      },
    };
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotelNoData",
    }),
  },
  methods: {
    ...mapActions({
      addLimitAction: "hotels/edit",
    }),
    async addLimit() {
      this.loading = true;
      const payload = {
        id: this.hotel.id,
        data: {
          ...this.hotel,
          child_age: this.limit,
        },
      };

      await this.addLimitAction(payload);
      this.dialog = false;
      this.loading = false;
      this.$notifier.showMessage({ content: "Child age limit successfully added" });
    },
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.limit = "";
      }
    },
  },
};
</script>

