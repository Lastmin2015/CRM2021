<template>
  <v-dialog v-model="dialogValue" width="600">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>
        Edit Distance
      </v-toolbar-title>
    </v-toolbar>
    <v-card style="border-top-right-radius: 0px; border-top-left-radius: 0px;">
      <v-card-text class="pt-6">
        <v-text-field
          @input="(e) => distanceToBeach = e"
          :value="hotel.distance_to_beach"
          clearable
          outlined
          dense
          label="Distance to beach"
          type="number"
          min="0"
        />
        <v-text-field
          @input="(e) => distanceToSlope = e"
          :value="hotel.distance_to_slope"
          clearable
          outlined
          dense
          label="Distance to slope"
          type="number"
          min="0"
        />
        <v-text-field
          @input="(e) => distanceToCity = e"
          :value="hotel.distance_to_city"
          clearable
          outlined
          dense
          label="Distance to city"
          type="number"
          min="0"
        />
        <v-select
          v-if="hotelNoData"
          outlined
          dense
          return-object
          label="Beach type"
          item-text="beach_name.name"
          :items="beaches"
          :value="hotel.beach_type.name"
          @change="(e) => beachType = e.id"
          no-data-text="No beach types created"
        ></v-select>
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
          @click="editDistance"
          :loading="loading"
        > Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

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
    distanceToBeach: '',
    distanceToSlope: '',
    distanceToCity: '',
    beachType: '',
  }),
  methods: {
    ...mapActions({
      editDistanceAction: "hotels/edit",
      getBeachTypes: "hotels/beaches/get"
    }),
    async editDistance() {
      this.loading = true

      const payload = {
        id: this.hotel.id,
        data: {
          ...this.hotelNoData,
          distance_to_beach: +this.distanceToBeach,
          distance_to_city: +this.distanceToCity,
          distance_to_slope: +this.distanceToSlope,
          beach_type_id: this.beachType
        }
      }

      await this.editDistanceAction(payload)
      this.loading = false
      this.$emit('dialog', false)
    }
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      hotelNoData: "hotels/currentHotelNoData",
      beaches: "hotels/beaches/beaches"
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
    this.getBeachTypes()
    this.distanceToBeach = this.hotel.distance_to_beach
    this.distanceToSlope = this.hotel.distance_to_slope
    this.distanceToCity = this.hotel.distance_to_city
  }
}
</script>