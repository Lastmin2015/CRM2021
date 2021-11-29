<template>
  <info-block title="Rating">
    <template v-slot:main>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Stars</th>
              <th class="text-left">Rating (TA)</th>
              <th class="text-left">Google Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{ hotel.stars }}
              </td>
              <td>
                {{ hotel.trip_advisor_rating }}
              </td>
              <td>
                {{ hotel.google_rating }}
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

export default {
  name: "Rating",
  components: { InfoBlock },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
    }),
  },
};
</script>