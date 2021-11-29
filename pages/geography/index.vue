<template>
  <page-block  title="Geography" :items="[]">
    <template #main>
      <geography-main />
    </template>
  </page-block>
</template>

<script>
import PageBlock from "@/components/common/page-block"
import GeographyMain from '@/components/geography/geography-main.vue';
import { mapActions } from "vuex"

export default {
  async asyncData({ store }) {
    await store.dispatch('geography/countries/get')
  },
  name: "HotelMain",
  components: {
    PageBlock,
    GeographyMain,
  },
  methods: {
    ...mapActions({
      getCountryNames: "geography/countries/getNames",
      getRegions: "geography/regions/get",
      getRegionsNames: "geography/regions/getNames",
      getResorts: "geography/resorts/get",
      getResortNames: "geography/resorts/getNames",
      getCities: "geography/city/get",
      getPlaces: "geography/places/get",
    })
  },
  created() {
    this.getCountryNames()
    this.getRegions()
    this.getRegionsNames()
    this.getResorts()
    this.getResortNames()
    this.getCities()
    this.getPlaces()
  }
}
</script>

