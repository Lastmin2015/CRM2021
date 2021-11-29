<template>
  <div style="background-color: white">
    <v-breadcrumbs class="pa-0" :items="[]" />
    <div class="d-flex justify-space-between align-center py-5 px-3">
      <h2 class="my-3 pb-3 mb-0 mr-1">
        {{ hotel.name }}
      </h2>
      <hotel-period-add v-if="tab === 1 && graphs !== null && graphs.length"></hotel-period-add>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import hotelPeriodAdd from './hotel-period-add.vue';
export default {
  components: { hotelPeriodAdd },
  props: ['tab'],
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      graphs: "hotels/graphs/graphs",
    }),
  },
};
</script>