<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="hotels"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Hotel description</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn-toggle small color="primary" dense group v-if="!isOperator">
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
            <v-btn small :value="5" @click.prevent="add = true" text>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-toolbar>
      </template>

      <template v-slot:[`item.info`]="{ item }">
        <nuxt-link :to="`/hotels/${item.id}`"> View </nuxt-link>
      </template>

      <template v-slot:[`header.actions`]="{ header }">
        <template v-if="!isOperator">
          {{ header.text }}
        </template>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon v-if="!isOperator" color="red" small @click="deleteHotel(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Refresh </v-btn>
      </template>
    </v-data-table>

    <hotel-delete
      :hotelName="hotelName"
      :hotelID="hotelID"
      :dialog="hotelValue"
      @dialog="(value) => hotelValue = value"
    />

    <hotel-add
      :dialog="add"
      @dialog="(value) => add = value"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HotelDelete from './hotel-delete.vue';
import HotelAdd from './hotel-add.vue';

export default {
  components: { HotelDelete, HotelAdd },
  data() {
    return {
      add: false,
      hotelValue: false,
      hotelName: '',
      hotelID: '',
      headers: [
        { text: "Info", value: "info" },
        { text: "Hotel Name", value: "name" },
        { text: "Place", value: "place.name" },
        { text: "Resort", value: "place.resort.resort_name.name" },
        { text: "Class", value: "hotel_class.name" },
        { text: "Type", value: "hotel_type.hotel_type_name.name" },
        { text: "Format", value: "hotel_format.hotel_format_name.name" },
        { text: "Actions", value: "actions", align: "right", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      hotels: "hotels/hotels",
      isOperator: "auth/isOperator"
    }),
  },
  methods: {
    deleteHotel(hotel) {
      this.hotelName = hotel.name
      this.hotelID = hotel.id
      this.hotelValue = true
    }
  },
};
</script>