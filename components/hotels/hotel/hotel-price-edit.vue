<template>
  <v-dialog v-model="dialog" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Edit price</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        <v-text-field
          v-model.number="price"
          type="number"
          label="Price"
          outlined
          dense
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="$emit('dialog', false)"> Cancel </v-btn>
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
import { mapActions, mapGetters } from "vuex"
export default {
  props: ["periodPrice", "periodID", "itemID", "showEditPrice", "priceID"],
  data: () => {
    return {
      loading: false,
      price: ""
    }
  },
  methods: {
    ...mapActions({
      getGraphs: "hotels/graphs/get"
    }),
    editPrice() {
      this.loading = true

      let obj = {
        graph_price_id: this.itemID,
        period_id: this.periodID,
        price: this.price
      };

      let method = this.periodPrice == 0 ?
        '$post' :
        '$put'

      let url = this.periodPrice == 0 ?
        '/api/graph-prices/periods/prices' :
        `/api/graph-prices/periods/prices/${this.priceID}`

      this.$axios[method](url, obj)
        .then(() => {
          this.getGraphs(this.operatorID)
            .then(() => {
              this.dialog = false
              this.loading = false
              this.$notifier.showMessage({content: "Price was successfully updated"})
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
        return this.showEditPrice
      },
      set(value) {
        this.$emit("dialog", value)
      }
    },
  },
  watch: {
    showEditPrice(value) {
      if (value) {
        this.price = this.periodPrice
      }
    }
  }
};
</script>