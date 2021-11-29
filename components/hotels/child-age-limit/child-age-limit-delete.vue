<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon color="red" small text v-bind="attrs" v-on="on">
        <v-icon small>mdi-delete</v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Delete child age limit</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        <p class="black--text">
          Would you like to delete
            <strong class="primary--text">
              {{ this.hotel.child_age.from }} - {{ this.hotel.child_age.to }} years old
            </strong>
          child age limit?
        </p>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="dialog = false"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="red"
          @click="deleteLimit"
          :loading="loading"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ChildAgeLimitDelete",
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
      deleteLimitAction: "hotels/edit",
    }),
    async deleteLimit() {
      this.loading = true;
      const payload = {
        id: this.hotel.id,
        data: {
          ...this.hotel,
          child_age: {},
        },
      };

      await this.deleteLimitAction(payload);
      this.dialog = false;
      this.loading = false;
      this.$notifier.showMessage({ content: "Child age limit successfully deleted" });
    },
  }
};
</script>

