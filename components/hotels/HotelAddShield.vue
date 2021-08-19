<template>
  <v-dialog
    v-model="$attrs.value"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-toolbar
        flat
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="$parent.addShield = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Hotel</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="addHotel"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model="hotel.name"
              label="Name"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-checkbox
              v-model="hotel.is_active"
              label="Is active"
            ></v-checkbox>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-checkbox
              v-model="hotel.is_bestseller"
              label="Is bestseller"
            ></v-checkbox>
          </v-col>
          <v-col class="mt-4"  md="2">
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
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col class="mt-4" md="2">
            <div class="d-flex">
              <v-select
                v-model="hotel.hotel_type_id"
                :items="hotelTypes"
                item-value="id"
                item-text="name"
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
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col class="mt-4" md="2">
            <div class="d-flex">
            <v-select
              v-model="hotel.beach_type_id"
              :items="beaches"
              item-value="id"
              item-text="name"
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
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
            </div>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model.number="hotel.distance_to_beach"
              type="number"
              label="Distance to beach"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model.number="hotel.beach_line_num"
              type="number"
              label="Beach line num"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
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
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model.number="hotel.distance_to_city"
              type="number"
              label="Distance to city"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model.number="hotel.distance_to_slope"
              type="number"
              label="Distance to slope"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model.number="hotel.latitude"
              type="number"
              label="latitude"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="2">
            <v-text-field
              v-model.number="hotel.longitude"
              type="number"
              label="latitude"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4"  md="4">
            <v-text-field
              v-model="hotel.keywords"
              label="Keywords"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <hotel-types-add-shield v-model="addTypesShield"/>
    <hotel-beaches-add-shield v-model="addBeachesShield"/>
    <hotel-chains-add-shield v-model="addChainsShield"/>
    <hotel-class-add-shield v-model="addClassShield"/>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HotelTypesAddShield from './HotelTypesAddShield'
import HotelBeachesAddShield from './HotelBeachesAddShield'
import HotelChainsAddShield from './HotelChainsAddShield'
import HotelClassAddShield from './HotelClassAddShield'

export default {
  name: 'HotelAddShield',
  components: {
    HotelClassAddShield,
    HotelTypesAddShield,
    HotelBeachesAddShield,
    HotelChainsAddShield
  },
  data () {
    return {
      addTypesShield: false,
      addBeachesShield: false,
      addChainsShield: false,
      addClassShield: false,
      hotel: {
        hotel_class_id: '',
        hotel_type_id: '',
        place_id: '',
        name: '',
        distance_to_beach: 0,
        beach_line_num: 0,
        beach_type_id: '',
        is_beach_private: false,
        distance_to_slope: 0,
        distance_to_city: 0,
        stars: 0,
        is_recommended: false,
        is_visited: false,
        is_active: false,
        is_bestseller: false,
        trip_advisor_id: '',
        trip_advisor_rating: 0,
        trip_advisor_url: '',
        url_pretty_name: '',
        latitude: 0,
        longitude: 0,
        google_rating_id: '',
        google_rating: 0,
        hotel_chain_id: '',
        keywords: '',
        room_type_id: ''
      }
    }
  },
  async mounted () {
    await this.getPlace()
    await this.getHotelClasses()
    await this.getHotelTypes()
    await this.getBeaches()
    await this.getHotelChains()
  },
  computed: {
    ...mapGetters({
      places: 'geography/place/places',
      hotelClasses: 'hotels/classes/classes',
      hotelTypes: 'hotels/types/types',
      beaches: 'hotels/beaches/beaches',
      hotelChains: 'hotels/chains/chains'
    })
  },
  methods: {
    ...mapActions({
      getPlace: 'geography/place/get',
      getHotelClasses: 'hotels/classes/get',
      getHotelTypes: 'hotels/types/get',
      getBeaches: 'hotels/beaches/get',
      getHotelChains: 'hotels/chains/get',
      addHotelClass: 'hotels/classes/add',
      addAction: 'hotels/add'
    }),
    async addHotel () {
      await this.addAction(this.hotel)
      this.$parent.addShield = false
    }
  }
}
</script>

<style scoped>

</style>
