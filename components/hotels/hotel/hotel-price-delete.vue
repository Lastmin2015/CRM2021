<template>
  <v-dialog v-model="dialog" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Delete traveler offer</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        <p class="black--text">
          Would you like to delete this traveler offer?
        </p>
        <ul class="black--text">
          <li>Type: {{ delItem.type }}</li>
          <li>Adults: {{ delItem.adults }}</li>
          <li>Kids: {{ delItem.kids }}</li>
        </ul>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="$emit('dialog', false)"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="red"
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
  props: ["showDeletePrice", "delItem"],
  data: () => {
    return {
      loading: false,
    }
  },
  methods: {
    async deletePrice() {
      this.loading = true

      this.$axios.$delete(`/api/graph-prices/${this.delItem.id}`)
        .then(() => {
          console.log(this.operatorID);
          this.$store.dispatch('hotels/graphs/get', this.operatorID)
          .then(() => {
            this.dialog = false
            this.loading = false
            this.$notifier.showMessage({content: "Traveler offer was successfully deleted"})
          })
        })
    },
  },
  computed: {
    ...mapGetters({
      operatorID: "auth/operatorID",
    }),
    dialog: {
      get() {
        return this.showDeletePrice
      },
      set(value) {
        this.$emit("dialog", value)
      }
    },
  }
};
</script>