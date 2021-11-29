<template>
  <div>
    <v-data-table :headers="headers" :items="regions" class="elevation-1">
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
        <v-icon class="mr-2" color="primary" @click="editRegion(item)" small>
          mdi-pencil
        </v-icon>
        <v-icon small color="red" @click="deleteRegion(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Refresh </v-btn>
      </template>
    </v-data-table>

    <geography-region-edit
      :dialog="edit"
      @dialog="(value) => (edit = value)"
      :editableRegion="region"
    />

    <geography-region-delete
      :dialog="deleteValue"
      @dialog="(value) => (deleteValue = value)"
      :region="region"
    />

    <geography-region-add
      :dialog="add"
      @dialog="(value) => (add = value)"
    />
    <!-- <region-add-shield v-model="addShield" /> -->
    <!-- <region-edit-shield
      v-if="editShield"
      v-model="editShield"
      :item="editItem"
    /> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import RegionAddShield from '../../components/RegionAddShield'
import GeographyRegionEdit from "../../components/geography/geography-region-edit.vue";
import GeographyRegionDelete from './geography-region-delete.vue';

export default {
  name: "HotelPrices",
  components: {
    // RegionAddShield,
    // RegionEditShield,
    GeographyRegionEdit,
    GeographyRegionDelete,
  },
  data() {
    return {
      edit: false,
      deleteValue: false,
      add: false,
      region: { region_name: { name: '' }, country: { country_name: { name: '' } } },
      headers: [
        { text: "Country", value: "country.country_name.name" },
        { text: "Name", value: "region_name.name" },
        { text: "Actions", align: 'right', value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      regions: "geography/regions/regions"
    }),
  },
  methods: {
    ...mapActions({
      deleteCountry: "geography/regions/deleteRegion",
    }),
    editRegion(item) {
      this.region = item;
      this.edit = true;
    },
    deleteRegion(item) {
      this.region = item;
      this.deleteValue = true;
    },
  },
};
</script>