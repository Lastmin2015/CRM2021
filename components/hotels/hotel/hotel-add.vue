<template>
  <v-dialog
    v-model="dialogValue"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-btn icon dark @click="$emit('dialog', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Hotel</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="addHotel"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col class="mt-4" md="2">
            <v-text-field v-model="hotel.name" label="Name"></v-text-field>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-checkbox
              v-model="hotel.is_active"
              label="Is active"
            ></v-checkbox>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-checkbox
              v-model="hotel.is_bestseller"
              label="Is bestseller"
            ></v-checkbox>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-checkbox
              v-model="hotel.is_recommended"
              label="Is recommended"
            ></v-checkbox>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-select
              v-model="hotel.place_id"
              :items="places"
              item-value="id"
              item-text="id"
              label="Place id"
              required
            ></v-select>
          </v-col>
          <v-col class="mt-4" md="2">
            <div class="d-flex">
              <v-select
                v-model="hotel.hotel_class_id"
                :items="hotelClasses"
                item-value="id"
                item-text="name"
                label="Class"
                required
              ></v-select>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                @click="addClassShield = !addClassShield"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col class="mt-4" md="2">
            <div class="d-flex">
              <v-select
                v-model="hotel.hotel_type_id"
                :items="hotelTypes"
                item-value="id"
                item-text="hotel_type_name.name"
                label="Type"
                required
              ></v-select>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                @click="addTypesShield = !addTypesShield"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col class="mt-4" md="2">
            <div class="d-flex">
              <v-select
                v-model="hotel.hotel_format_id"
                :items="hotelFormats"
                item-value="id"
                item-text="hotel_format_name.name"
                label="Format"
                required
              ></v-select>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                @click="addFormatShield = !addFormatShield"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col class="mt-4" md="2">
            <div class="d-flex">
              <v-select
                v-model="hotel.beach_type_id"
                :items="beaches"
                item-value="id"
                item-text="beach_name.name"
                label="Beaches"
                required
              ></v-select>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                @click="addBeachesShield = !addBeachesShield"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-text-field
              v-model.number="hotel.distance_to_beach"
              type="number"
              label="Distance to beach"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-text-field
              v-model.number="hotel.beach_line_num"
              type="number"
              label="Beach line num"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-checkbox
              v-model="hotel.is_beach_private"
              label="Is beach private"
            ></v-checkbox>
          </v-col>
          <v-col class="mt-4" md="2">
            <div class="d-flex">
              <v-select
                v-model="hotel.hotel_chain_id"
                :items="hotelChains"
                item-value="id"
                item-text="name"
                label="Chain"
                required
              ></v-select>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                @click="addChainsShield = !addChainsShield"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-text-field
              v-model.number="hotel.distance_to_city"
              type="number"
              label="Distance to city"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-text-field
              v-model.number="hotel.distance_to_slope"
              type="number"
              label="Distance to slope"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-text-field
              v-model.number="hotel.latitude"
              type="number"
              label="latitude"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4" md="2">
            <v-text-field
              v-model.number="hotel.longitude"
              type="number"
              label="longitude"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4" md="4">
            <v-text-field
              v-model="hotel.keywords"
              label="Keywords"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <hotel-add-types v-model="addTypesShield" />
    <hotel-add-formats v-model="addFormatShield" />
    <hotel-add-beaches v-model="addBeachesShield" />
    <hotel-add-chains v-model="addChainsShield" />
    <hotel-add-class v-model="addClassShield" />
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import HotelAddTypes from "./hotel-add-types";
import HotelAddFormats from "./hotel-add-formats";
import HotelAddBeaches from "./hotel-add-beaches";
import HotelAddChains from "./hotel-add-chains";
import HotelAddClass from "./hotel-add-class";

export default {
  name: "HotelAdd",
  components: {
    HotelAddTypes,
    HotelAddFormats,
    HotelAddBeaches,
    HotelAddChains,
    HotelAddClass,
  },
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      addTypesShield: false,
      addFormatShield: false,
      addBeachesShield: false,
      addChainsShield: false,
      addClassShield: false,
      hotel: {
        hotel_class_id: "",
        hotel_type_id: "",
        hotel_format_id: "",
        place_id: "",
        name: "",
        distance_to_beach: 0,
        beach_line_num: 0,
        beach_type_id: "",
        is_beach_private: false,
        distance_to_slope: 0,
        distance_to_city: 0,
        stars: 0,
        is_recommended: false,
        is_visited: false,
        is_active: false,
        is_bestseller: false,
        trip_advisor_id: "",
        trip_advisor_rating: 0,
        trip_advisor_url: "",
        url_pretty_name: "",
        latitude: 0,
        longitude: 0,
        google_rating_id: "",
        google_rating: 0,
        hotel_chain_id: "",
        keywords: "",
        room_type_id: [],
      },
    }
  },
  async mounted() {
    await this.getPlace();
    await this.getHotelClasses();
    await this.getHotelTypes();
    await this.getHotelFormats();
    await this.getBeaches();
    await this.getHotelChains();
  },
  computed: {
    ...mapGetters({
      places: "geography/places/places",
      hotelClasses: "hotels/classes/classes",
      hotelTypes: "hotels/types/types",
      hotelFormats: "hotels/formats/formats",
      beaches: "hotels/beaches/beaches",
      hotelChains: "hotels/chains/chains",
    }),
    dialogValue: {
      get() {
        return this.dialog;
      },
      set(newVal) {
        this.$emit("dialog", newVal);
      },
    },
  },
  methods: {
    ...mapActions({
      getPlace: "geography/places/get",
      getHotelClasses: "hotels/classes/get",
      getHotelTypes: "hotels/types/get",
      getHotelFormats: "hotels/formats/get",
      getBeaches: "hotels/beaches/get",
      getHotelChains: "hotels/chains/get",
      addHotelClass: "hotels/classes/add",
      addAction: "hotels/add",
    }),
    async addHotel() {
      await this.addAction(this.hotel);
      this.$emit("dialog", false);
    },
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.hotel = {
          hotel_class_id: "",
          hotel_type_id: "",
          place_id: "",
          name: "",
          distance_to_beach: 0,
          beach_line_num: 0,
          beach_type_id: "",
          is_beach_private: false,
          distance_to_slope: 0,
          distance_to_city: 0,
          stars: 0,
          is_recommended: false,
          is_visited: false,
          is_active: false,
          is_bestseller: false,
          trip_advisor_id: "",
          trip_advisor_rating: 0,
          trip_advisor_url: "",
          url_pretty_name: "",
          latitude: 0,
          longitude: 0,
          google_rating_id: "",
          google_rating: 0,
          hotel_chain_id: "",
          keywords: "",
          room_type_id: [],
        }
      }
    }
  }
};
</script>