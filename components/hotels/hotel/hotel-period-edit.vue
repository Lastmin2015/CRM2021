<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ml-2"
        icon
        small
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Edit period</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dates"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              label="Date range"
              readonly
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dates" range no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(dates)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="dialog = false"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="editPrice"
          :loading="loading"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  props: ["period"],
  data: () => {
    return {
      dialog: false,
      loading: false,
      dates: [],
      menu: false,
    }
  },
  methods: {
    async editPrice() {
      this.loading = true

      let obj = {
        start_period: Date.parse(this.dates[0]),
        end_period: Date.parse(this.dates[1]),
        hotel_id: this.hotel.id,
        operator_id: this.operatorID
      }

      this.$axios.$put(`/api/graph-prices/periods/${this.period.id}`, obj)
        .then(() => {
          this.$store.dispatch('hotels/graphs/get', this.operatorID)
        }).then(() => {
          this.dialog = false
          this.loading = false
          this.$notifier.showMessage({content: "Period was successfully updated"})
        })
    },
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      operatorID: "auth/operatorID"
    }),
    dateRangeText () {
      return this.dates.join(' - ')
    },
  },
  watch: {
    dialog(value) {
      if (value) { //TODO calendar format dd.mm.yyyy

        let start = new Date(this.period.start_period).toJSON().slice(0,10)
        let end = new Date(this.period.end_period).toJSON().slice(0,10)

        this.dates = [start, end]
      }
    }
  }
};
</script>