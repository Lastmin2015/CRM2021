<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="airports"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Airports Information</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
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
          <v-btn small :value="5" @click.prevent="addShield = !addShield" text>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="primary" small class="mr-2" @click="editAirport(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" small @click="deleteAirport(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Refresh </v-btn>
      </template>
    </v-data-table>
    <airports-add v-model="addShield" />
    <airports-edit
      :dialog="edit"
      :airport="airport"
      @dialog="(value) => (edit = value)"
    />
    <airports-delete
      :dialog="Delete"
      :airport="airport"
      @dialog="(value) => (Delete = value)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AirportsAdd from "@/components/airports/airports-add";
import AirportsEdit from "@/components/airports/airports-edit";
import AirportsDelete from "@/components/airports/airports-delete";

export default {
  name: "AirportsTable",
  components: {
    AirportsEdit,
    AirportsDelete,
    AirportsAdd,
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Region", value: "iso_region" },
        { text: "Country", value: "iso_country" },
        { text: "IATA code", value: "iata_code" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      addShield: false,
      edit: false,
      Delete: false,
      airport: {
        region: {
          region_name: {
            name: ''
          },
          country: {
            country_name: {
              name: ''
            }
          }
        },
      },
    };
  },
  methods: {
    editAirport(airport) {
      this.edit = true;
      this.airport = airport;
    },
    deleteAirport(airport) {
      this.Delete = true;
      this.airport = airport;
    },
  },
  computed: {
    ...mapGetters({
      airports: "airports/airports",
    }),
  },
};
</script>