<template>
  <info-block
    title="Hotels Airports"
    :height="airports ? '100%' : '36'"
    :hideDivider="airports ? true : false"
  >
    <template v-slot:actions>
      <v-btn v-if="!isOperator" small @click="showAdd = true" text>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template v-slot:main>
      <template v-if="airports">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Assigned airport</th>
                <th class="text-left">Distance</th>
                <th class="text-left">Transfer time</th>
                <th v-if="!isOperator" class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(airport, i) in airports" :key="i">
                <td>{{ airport.airport.name }}</td>
                <td>{{ airport.distance }}</td>
                <td>{{ airport.transfer_time }}</td>
                <td v-if="!isOperator" style="text-align: right">
                  <v-btn
                    icon
                    @click="editHandler(airport)"
                    small
                    color="primary"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="deleteHandler(airport)"
                    small
                    color="red"
                  >
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <hotels-airport-edit
          :showEdit="showEdit"
          :airport="airport"
          @showEditDialog="(value) => (showEdit = value)"
        />
        <hotels-airport-delete
          :showDelete="showDelete"
          :airport="airport"
          @showDeleteDialog="(value) => (showDelete = value)"
        />
      </template>
      <hotels-airport-add
        :showAdd="showAdd"
        @showAddDialog="(value) => (showAdd = value)"
      />
    </template>
  </info-block>
</template>

<script>
import { mapGetters } from "vuex";
import InfoBlock from "../hotel/hotel-info-block.vue";
import HotelsAirportAdd from "./airports-add.vue";
import HotelsAirportEdit from "./airports-edit.vue";
import HotelsAirportDelete from "./airports-delete.vue";

export default {
  name: "HotelsAirport",
  components: {
    InfoBlock,
    HotelsAirportAdd,
    HotelsAirportEdit,
    HotelsAirportDelete,
  },
  data: () => ({
    airport: { airport: {} },
    showDelete: false,
    showEdit: false,
    showAdd: false
  }),
  created() {
    this.$store.dispatch("hotels/airport/getHotelsAirports", this.hotel.id);
  },
  methods: {
    editHandler(airport) {
      this.airport = airport
      this.showEdit = true
    },
    deleteHandler(airport) {
      this.airport = airport
      this.showDelete = true
    }
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      airports: "hotels/airport/airports",
      isOperator: "auth/isOperator"
    }),
  },
};
</script>