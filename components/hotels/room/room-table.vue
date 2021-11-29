<template>
  <info-block
    title="Room types"
    :height="rooms ? '100%' : '36'"
    :hideDivider="rooms.length ? true : false"
  >
    <template v-if="!isOperator" v-slot:actions>
      <room-add></room-add>
    </template>
    <template v-slot:main>
      <template v-if="rooms.length">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Room name</th>
                <th v-if="!isOperator" class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(room, i) in rooms" :key="i">
                <td>{{ room.name }}</td>
                <td v-if="!isOperator" style="text-align: right">
                  <room-delete  :room="room"></room-delete>
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
import RoomAdd from './room-add.vue';
import RoomDelete from './room-delete.vue';

export default {
  name: "RoomTable",
  components: { InfoBlock, RoomAdd, RoomDelete },
  created() {
    this.getRoomTypes()
  },
  methods: {
    ...mapActions({
      getRoomTypes: "hotels/rooms/get"
    })
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      isOperator: "auth/isOperator"
    }),
    rooms() {
      return this.hotel.room_type
    }
  },
};
</script>