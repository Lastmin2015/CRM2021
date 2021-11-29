<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon color="primary" small text v-bind="attrs" v-on="on">
        <v-icon small>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Edit child age limit</v-toolbar-title>
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
          @click="editLimit"
          :loading="loading"
          :disabled="!limit.from && !limit.to"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ChildAgeLimitEdit",
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
      editLimitAction: "hotels/edit",
    }),
    async editLimit() {
      this.loading = true;

      const payload = {
        id: this.hotel.id,
        data: {
          ...this.hotel,
          child_age: this.limit,
        },
      };

      await this.editLimitAction(payload);
      this.dialog = false;
      this.loading = false;
      this.$notifier.showMessage({ content: "Child age limit successfully updated" });
    },
  },
  watch: {
    dialog(value) {
      if (value) {
        this.limit.from = this.hotel.child_age.from;
        this.limit.to = this.hotel.child_age.to;
      }
    },
  },
};
</script>

