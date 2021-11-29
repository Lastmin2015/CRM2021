<template>
  <div>
    <v-tabs v-model="tab" grow>
      <v-tab> Country </v-tab>

      <v-tab> Region </v-tab>

      <v-tab> Resort </v-tab>

      <v-tab> Place </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <geography-country-table />
      </v-tab-item>

      <v-tab-item>
        <geography-region-table />
      </v-tab-item>

      <v-tab-item>
        <geography-resort-table />
      </v-tab-item>

      <v-tab-item>
        <geography-place-table />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import GeographyCountryTable from './geography-country-table.vue';
import GeographyPlaceTable from './geography-place-table.vue';
import GeographyRegionTable from './geography-region-table.vue';
import GeographyResortTable from './geography-resort-table.vue';

export default {
  data: () => ({
    tab: null
  }),
  components: {
    GeographyCountryTable,
    GeographyRegionTable,
    GeographyResortTable,
    GeographyPlaceTable
  },
};
</script>