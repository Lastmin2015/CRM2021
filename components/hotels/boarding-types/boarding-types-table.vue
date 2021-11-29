<template>
  <info-block
    title="Boarding types"
    :height="boardingTypes ? '100%' : '36'"
    :hideDivider="boardingTypes.length ? true : false"
  >
    <template v-if="!isOperator" v-slot:actions>
      <boarding-types-add></boarding-types-add>
    </template>
    <template v-slot:main>
      <template v-if="boardingTypes.length">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Type</th>
                <th v-if="!isOperator" class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(type, i) in boardingTypes" :key="i">
                <td>{{ type.name }}</td>
                <td v-if="!isOperator" style="text-align: right">
                  <boarding-types-delete :type="type"></boarding-types-delete>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </template>
  </info-block>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InfoBlock from "../hotel/hotel-info-block.vue";
import BoardingTypesAdd from "./boarding-types-add.vue";
import BoardingTypesDelete from "./boarding-types-delete.vue";

export default {
  name: "HotelsAirport",
  components: { InfoBlock, BoardingTypesDelete, BoardingTypesAdd },
  created() {
    this.getTypes();
  },
  methods: {
    ...mapActions({
      getTypes: "hotels/boarding-types/get",
    }),
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      isOperator: "auth/isOperator"
    }),
    boardingTypes() {
      return this.hotel.boarding_type;
    },
  },
};
</script>