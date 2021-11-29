<template>
  <v-dialog v-model="dialogValue" width="600">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>
        Edit Hotel Name
      </v-toolbar-title>
    </v-toolbar>
    <v-card style="border-top-right-radius: 0px; border-top-left-radius: 0px;">
      <v-card-text class="pt-6">
        <v-text-field
          @input="(e) => hotelName = e"
          :value="hotel.name"
          clearable
          outlined
          dense
          label="Hotel Name"
        />
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
          text
          color="primary"
          @click="editHotelName"
          :loading="loading"
        > Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { returnHotelStructure } from "@/helpers/hotels"

export default {
  name: 'DistanceEdit',
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    loading: false,
    hotelName: '',
  }),
  methods: {
    ...mapActions({
      editNameAction: "hotels/edit"
    }),
    async editHotelName() {
      this.loading = true
      const payload = {
        id: this.hotel.id,
        data: {
          ...this.hotelNoData,
          name: this.hotelName,
        }
      }
      await this.editNameAction(payload)
      this.loading = false
      this.$emit('dialog', false)
      this.$notifier.showMessage({ content: 'The hotel name was successfully updated!' })
    }
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      hotelNoData: "hotels/currentHotelNoData",
    }),
    dialogValue: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('dialog', value)
      }
    }
  },
  created() {
    this.hotelName = this.hotel.name
  }
}
</script>