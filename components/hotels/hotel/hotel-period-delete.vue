<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
       <v-btn
        small
        color="red"
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small> mdi-delete </v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Delete period</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        <p class="black--text">
          Would you like to delete
          <strong class="primary--text">
            {{
              new Date(period.start_period).toLocaleDateString(
                "ru-RU"
              ) +
              " - " +
              new Date(period.end_period).toLocaleDateString("ru-RU")
            }}
          </strong>
          period?
        </p>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="dialog = false"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="deletePrice"
          :loading="loading"
        >
          Delete
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
    async deletePrice() {
      this.loading = true

      this.$axios.$delete(`/api/graph-prices/periods/${this.period.id}`)
        .then(() => {
          this.$store.dispatch('hotels/graphs/get', this.operatorID)
          .then(() => {
            this.dialog = false
            this.loading = false
            this.$notifier.showMessage({content: "Period was successfully deleted"})
          })
        })
    },
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      operatorID: "auth/operatorID",
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