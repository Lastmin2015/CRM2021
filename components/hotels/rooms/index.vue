<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="rooms"
      sort-by="calories"
      class="elevation-5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1">Rooms</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn-toggle small color="primary" dense group>
            <v-btn small :value="1" text>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn small :value="2" text>
              <v-icon>mdi-filter-minus-outline</v-icon>
            </v-btn>

            <v-btn small :value="3" text>
              <v-icon>mdi-filter-plus-outline</v-icon>
            </v-btn>

            <v-btn small :value="4" text>
              <v-icon>mdi-table-column-width</v-icon>
            </v-btn>
          </v-btn-toggle>

          <v-btn small :value="5" @click.prevent="showAdd = true" text>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <hr />
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="primary" small class="mr-2" @click="editRoom(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" small @click="deleteRoom(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary"> Refresh </v-btn>
      </template>
    </v-data-table>

    <rooms-add
      :dialog="showAdd"
      @dialog="showAdd = false"
    ></rooms-add>

    <rooms-edit
      :room="room"
      :dialog="showEdit"
      @dialog="showEdit = false"
    ></rooms-edit>

    <rooms-delete
      :room="room"
      :dialog="showDelete"
      @dialog="showDelete = false"
    ></rooms-delete>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RoomsAdd from "@/components/hotels/rooms/rooms-add";
import RoomsEdit from "@/components/hotels/rooms/rooms-edit";
import RoomsDelete from "@/components/hotels/rooms/rooms-delete";

export default {
  name: "AirportsTable",

  components: {
    RoomsAdd,
    RoomsEdit,
    RoomsDelete
  },

  data() {
    return {
      showAdd: false,
      showEdit: false,
      showDelete: false,
      room: {},
      headers: [
        { text: "Room name", value: "room_type.name" },
        { text: "Actions", align: "right", value: "actions", sortable: false },
      ],
    };
  },

  methods: {
    ...mapActions({
      getRooms: "hotels/rooms/get"
    }),

    editRoom(room) {
      this.room = room
      this.showEdit = true
    },

    deleteRoom(room) {
      this.room = room
      this.showDelete = true
    },
  },

  computed: {
    ...mapGetters({
      rooms: "hotels/rooms/rooms",
    })
  },

  created() {
    this.getRooms()
  }
};
</script>