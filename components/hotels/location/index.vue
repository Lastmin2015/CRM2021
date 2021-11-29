<template>
  <info-block title="Location">
    <template v-slot:main>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Country</th>
              <th class="text-left">Region</th>
              <th class="text-left">Resort</th>
              <th class="text-left">Place</th>
              <th class="text-left">Longitude</th>
              <th class="text-left">Latitude</th>
              <th v-if="!isOperator" class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ country }}</td>
              <td>{{ region }}</td>
              <td>{{ resort }}</td>
              <td>{{ hotel.place.name || "---" }}</td>
              <td>
                {{ hotel.longitude }}
              </td>
              <td>
                {{ hotel.latitude }}
              </td>
              <td v-if="!isOperator" class="text-right">
                <v-btn icon @click="edit = true" small color="primary">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <location-edit :dialog="edit" @dialog="value => edit = value" />
    </template>
  </info-block>
</template>

<script>
import { mapGetters } from "vuex";
import InfoBlock from "../hotel/hotel-info-block.vue";
import LocationEdit from './location-edit.vue';

export default {
  name: "Location",
  components: { InfoBlock, LocationEdit },
  data: () => ({
    edit: false,
  }),
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      hotelNoData: "hotels/currentHotelNoData",
      isOperator: "auth/isOperator"
    }),
    country() {
      const country = this.hotel.place.resort.region.country.country_name.name
      return !!country ? country : '---'
    },
    region() {
      const region = this.hotel.place.resort.region.region_name.name
      return !!region ? region : '---'
    },
    resort() {
      const resort = this.hotel.place.resort.resort_name.name
      return !!resort ? resort : '---'
    }
  },
};
</script>