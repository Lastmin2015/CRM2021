<template>
  <page-block  title="Airports" :items="[]">
    <template #main>
      <airports-table></airports-table>
    </template>
  </page-block>
</template>

<script>
import PageBlock from '@/components/common/page-block'
import AirportsTable from '@/components/airports/airports-table'

export default {
  components: {
    PageBlock,
    AirportsTable
  },
  async fetch({ store }) {
    await store.dispatch("airports/get");

    const countries = store.getters['geography/countries/countries']
    if (!countries.length) {
      await store.dispatch("geography/countries/get");
    }

    const regions = store.getters['geography/regions/regions']
    if (!regions.length) {
      await store.dispatch("geography/regions/get");
    }
  },
  data() {
    return {
      items: [
        {
          text: "Airports",
          disabled: true,
          href: "/airports",
        },
      ],
    };
  },
};
</script>
