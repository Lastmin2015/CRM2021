<template>
  <div>
    <v-btn v-if="isOperator" small text to="/hotels" color="primary" class="mb-3">
      <v-icon small class="mr-3">mdi-arrow-left</v-icon>
      Go to Hotels
    </v-btn>

    <v-tabs grow v-model="tab">
      <v-tab>Content </v-tab>

      <v-tab>Price</v-tab>
    </v-tabs>

    <hotel-header :tab="tab" />

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <hotel-main />
      </v-tab-item>

      <v-tab-item>
        <hotel-price />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HotelHeader from "@/components/hotels/hotel/hotel-header"
import HotelMain from "@/components/hotels/hotel/hotel-main.vue"
import HotelPrice from "@/components/hotels/hotel/hotel-price.vue"

export default {
  async validate({ params, store }) {
    return await store.dispatch("hotels/getById", params.id);
  },
  async fetch({ params, store }) {
    const hotel = store.getters["hotels/currentHotel"];
    if (!hotel) {
      await store.dispatch("hotels/getById", params.id);
    }

    const places = store.getters["geography/places/places"]
    if (!places.length) {
      await store.dispatch("geography/places/get")
    }
  },
  async asyncData({ params, store }) {
    // const hotelNoData = store.getters["hotels/currentHotelNoData"];
    // if (!hotelNoData) {
    await store.dispatch("hotels/getByIdNoData", params.id);
    // }
  },
  data() {
    return {
      tab: null,
    };
  },
  components: {
    HotelMain,
    HotelPrice,
    HotelHeader
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      isOperator: "auth/isOperator"
    }),
  },
};
</script>

