<template>
  <info-block
    title="Child age limit"
    :height="isLimit ? '100%' : '36'"
    :hideDivider="isLimit ? true : false"
  >
    <template v-if="!isOperator" v-slot:actions>
      <child-age-limit-add v-if="!isLimit"></child-age-limit-add>
    </template>

    <template v-if="isLimit" v-slot:main>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">From</th>
              <th class="text-left">To</th>
              <th v-if="!isOperator" class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ hotel.child_age.from }}</td>
              <td>{{ hotel.child_age.to }}</td>
              <td class="text-right" v-if="!isOperator">
                <child-age-limit-edit></child-age-limit-edit>
                <child-age-limit-delete></child-age-limit-delete>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
  </info-block>
</template>

<script>
import { mapGetters } from "vuex";
import InfoBlock from "../hotel/hotel-info-block.vue";
import ChildAgeLimitAdd from './child-age-limit-add.vue';
import ChildAgeLimitEdit from './child-age-limit-edit.vue';
import ChildAgeLimitDelete from './child-age-limit-delete.vue';

export default {
  name: "RoomTable",
  components: {
    InfoBlock,
    ChildAgeLimitAdd,
    ChildAgeLimitEdit,
    ChildAgeLimitDelete
  },
  methods: {

  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      isOperator: "auth/isOperator"
    }),
    isLimit() {
      return this.hotel.child_age.from && this.hotel.child_age.from || false
    }
  },
};
</script>