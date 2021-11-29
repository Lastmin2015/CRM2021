<template>
  <page-block  title="Hotels" :items="[]">
    <template #main>
      <hotel-table />
      <hotel-add />
    </template>
  </page-block>
</template>

<script>
import PageBlock from "@/components/common/page-block"
import HotelAdd from "@/components/hotels/hotel/hotel-add";
import HotelTable from "@/components/hotels/hotel/hotel-table";

export default {
  async fetch({ store }) {
    await store.dispatch("hotels/get");
  },
  name: "HotelMain",
  components: {
    PageBlock,
    HotelTable,
    HotelAdd,
  }
}
</script>
