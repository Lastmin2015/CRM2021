<template>
  <div>
    <v-data-table :headers="headers" :items="places" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
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

            <v-btn
              small
              :value="5"
              @click="add = true"
              text
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" color="primary" @click="editPlace(item)" small>
          mdi-pencil
        </v-icon>

        <v-icon small color="red" @click="deletePlace(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:[`item.city.city_name.name`]="{ item }">
        {{ item.city.city_name.name ? item.city.city_name.name : '---' }}
      </template>

      <template v-slot:[`item.name`]="{ item }">
        {{ item.name ? item.name : "---" }}
      </template>

      <template v-slot:[`item.is_city`]="{ item }">
        <v-checkbox v-model="item.is_city" disabled></v-checkbox>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary"> Refresh </v-btn>
      </template>
    </v-data-table>

    <geography-place-add :dialog="add" @dialog="(value) => add = value" />

    <geography-place-edit :dialog="edit" @dialog="(value) => edit = value" :place="place" />

    <geography-place-delete :dialog="deleteValue" @dialog="(value) => deleteValue = value" :place="place" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GeographyPlaceAdd from './geography-place-add.vue';
import GeographyPlaceEdit from './geography-place-edit.vue';
import GeographyPlaceDelete from './geography-place-delete.vue';

export default {
  name: "HotelPrices",
  components: {
    GeographyPlaceAdd,
    GeographyPlaceEdit,
    GeographyPlaceDelete,
  },
  data() {
    return {
      add: false,
      edit: false,
      deleteValue: false,
      place: {},
      headers: [
        { text: "Country", value: "resort.region.country.country_name.name" },
        { text: "Region", value: "resort.region.region_name.name" },
        // { text: "City", value: "city.city_name.name" },
        { text: "Is city", value: "is_city" },
        { text: "Resort", value: "resort.resort_name.name" },
        { text: "Name", value: "name" },
        { text: "Actions", align: 'right', value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      places: "geography/places/places",
    }),
  },
  methods: {
    editPlace(place) {
      this.place = place
      this.edit = true
    },
    deletePlace(place) {
      this.place = place
      this.deleteValue = true
    },
  },
};
</script>