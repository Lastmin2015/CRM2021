<template>
  <div>
    <v-data-table :headers="headers" :items="resorts" class="elevation-1">
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
              @click.prevent="add = true"
              text
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" color="primary" @click="editResort(item)" small>
          mdi-pencil
        </v-icon>

        <v-icon small color="red" @click="deleteResort(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:[`item.resort_name.name`]="{ item }">
        {{ item.resort_name.name ? item.resort_name.name : "---" }}
      </template>

      <template v-slot:[`item.city.city_name.name`]="{ item }">
        {{ item.city.city_name.name ? item.city.city_name.name : "---" }}
      </template>

      <template v-slot:[`item.region.region_name.name`]="{ item }">
        {{ item.region.region_name.name ? item.region.region_name.name : "---" }}
      </template>

      <template v-slot:no-data>
        <v-btn color="primary"> Refresh </v-btn>
      </template>
    </v-data-table>

    <geography-resort-add
      :dialog="add"
      @dialog="(value) => add = value"
    />

    <geography-resort-edit
      :dialog="edit"
      :resort="resort"
      @dialog="(value) => edit = value"
    />

    <geography-resort-delete
      :dialog="deleteValue"
      :resortName="resortName"
      :resortID="resortID"
      :resortNameID="resortNameID"
      @dialog="(value) => deleteValue = value"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GeographyResortAdd from './geography-resort-add.vue';
import GeographyResortEdit from './geography-resort-edit.vue';
import GeographyResortDelete from './geography-resort-delete.vue';

export default {
  name: "HotelPrices",
  components: {
    GeographyResortAdd,
    GeographyResortEdit,
    GeographyResortDelete
  },
  data() {
    return {
      edit: false,
      add: false,
      deleteValue: false,
      resort: {},
      resortName: '',
      resortID: '',
      resortNameID: '',
      headers: [
        { text: "Country", value: "region.country.country_name.name" },
        { text: "Region", value: "region.region_name.name" },
        // { text: "City", value: "city.city_name.name" },
        { text: "Name", value: "resort_name.name" },
        { text: "Actions", align: "right", value: "actions", sortable: false },
      ],

      editableResort: {
        countryName: '',
        countryID: '',
        regionName: '',
        regionID: '',
        cityName: '',
        cityID: '',
        resortName: '',
        resortID: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      resorts: 'geography/resorts/resorts'
    })
  },
  methods: {
    editResort(item) {
      this.resort = item
      this.edit = true
    },
    deleteResort(item) {
      this.resortID = item.id

      this.resortName =
        item.resort_name.name ?
        item.resort_name.name : ''

      this.resortNameID =
        item.resort_name.id ?
        item.resort_name.id : ''

      this.deleteValue = true
    },
  },
};
</script>