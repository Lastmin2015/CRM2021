<template>
  <div>
    <v-data-table :headers="headers" :items="countries" class="elevation-1">
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
        <v-btn icon small color="primary">
          <v-icon @click="editCountry(item)" small> mdi-pencil </v-icon>
        </v-btn>
        <v-btn icon small color="red">
          <v-icon small @click="deleteCountry(item)"> mdi-delete </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Refresh </v-btn>
      </template>
    </v-data-table>

    <geography-country-add
      :dialog="add"
      @dialog="(value) => add = value"
    />

    <geography-country-edit
      :dialog="edit"
      @dialog="(value) => edit = value"
      :editableCountry="country"
      :id="countryID"
    />

    <geography-country-delete
      :dialog="deleteValue"
      @dialog="(value) => deleteValue = value"
      :country="country"
      :id="countryID"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GeographyCountryAdd from './geography-country-add.vue';
import GeographyCountryEdit from './geography-country-edit.vue';
import GeographyCountryDelete from './geography-country-delete.vue';

export default {
  name: "HotelPrices",
  components: {
    GeographyCountryAdd,
    GeographyCountryEdit,
    GeographyCountryDelete
  },

  data() {
    return {
      country: '',
      countryID: '',
      edit: false,
      deleteValue: false,
      add: false,
      headers: [
        { text: "Name", value: "country_name.name" },
        { text: "Actions", value: "actions", align: "right", sortable: true },
      ],
    };
  },
  computed: {
    ...mapGetters({
      countries: "geography/countries/countries",
    })
  },
  methods: {
    ...mapActions({
      deleteCountry: "geography/countries/deleteCountry",
    }),
    editCountry(item) {
      this.country = item.country_name.name
      this.countryID = item.id
      this.edit = true
    },
    deleteCountry(item) {
      this.country = item.country_name.name
      this.countryID = item.id
      this.deleteValue = true
    }
  },
};
</script>