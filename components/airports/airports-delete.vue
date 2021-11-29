<template>
  <v-dialog v-model="dialogValue" width="600">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>
        Delete {{ airport.name }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card style="border-top-right-radius: 0px; border-top-left-radius: 0px;">
      <v-card-text class="pt-6">
        <p class="body-1 black--text">
          Would you like to delete
            <strong class="primary--text">
              {{ airport.name }}
            </strong> from airports list?
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="$emit('dialog', false)"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          text
          @click="deleteAirport"
          :loading="loading"
        > Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AirportsDelete',
  data: () => ({
    loading: false
  }),
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    airport: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      deleteAirportAction: "airports/deleteAirport"
    }),
    async deleteAirport() {
      this.loading = true
      await this.deleteAirportAction(this.airport.id)
      this.loading = false
      this.$emit('dialog', false)
    }
  },
  computed: {
    dialogValue: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('dialog', value)
      }
    }
  }
}
</script>