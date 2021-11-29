<template>
  <info-block title="Distance">
    <template v-slot:main>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Distance to beach</th>
              <th class="text-left">Distance to slope</th>
              <th class="text-left">Distance to city</th>
              <th class="text-left">Beach type</th>
              <th v-if="!isOperator" class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ hotel.distance_to_beach }} km</td>
              <td>{{ hotel.distance_to_slope }} km</td>
              <td>{{ hotel.distance_to_city }} km</td>
              <td>
                <v-chip  v-if="hotel.beach_type.name" color="green" dark>
                  {{ hotel.beach_type.name }}
                </v-chip>
                <span v-else> --- </span>
              </td>
              <td v-if="!isOperator" class="text-right">
                <v-btn
                  icon
                  @click="edit = true"
                  small
                  color="primary"
                >
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <distance-edit
        :dialog="edit"
        @dialog="(value) => edit = value"
      />
    </template>
  </info-block>
</template>

<script>
import { mapGetters } from "vuex"
import DistanceEdit from './distance-edit.vue';
import InfoBlock from "../hotel/hotel-info-block.vue"

export default {
  name: "Distance",
  components: { InfoBlock, DistanceEdit },
  data: () => ({
    edit: false
  }),
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      isOperator: "auth/isOperator"
    }),
  },
};
</script>