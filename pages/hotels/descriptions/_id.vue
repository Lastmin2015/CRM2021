<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      {{ hotel.name }}
    </h2>
    <v-row>
      <v-col md="4">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              General Information
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Hotel Id
                </th>
                <th class="text-left">
                  Hotel Name
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>{{ hotel.id }}</td>
                <td>{{ hotel.name }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="8">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Distance
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Distance to beach
                </th>
                <th class="text-left">
                  Distance to slope
                </th>
                <th class="text-left">
                  Distance to city
                </th>
                <th class="text-left">
                  Beach type
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>{{ hotel.distance_to_beach }} km</td>
                <td>{{ hotel.distance_to_slope }} km</td>
                <td>{{ hotel.distance_to_city }} km</td>
                <td>
                  <v-chip
                    color="green"
                    dark
                  >
                    <!--{{ hotel.beach_type.name }}-->
                  </v-chip>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Classification
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Type
                </th>
                <th class="text-left">
                  Format
                </th>
                <th class="text-left">
                  Class
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>
                  <v-chip
                    color="green"
                    dark
                  >
                    Business
                  </v-chip>
                </td>
                <td>
                  <v-chip
                    color="blue"
                    dark
                  >
                    Business
                  </v-chip>
                </td>
                <td>
                  <v-chip
                    color="red"
                    dark
                  >
                    Low
                  </v-chip>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="8">
        <v-card
          class="py-2"
        >
          <v-toolbar
            class="py-0"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Hotel images
            </h4>
          </v-toolbar>
          <hr>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Rating
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Stars
                </th>
                <th class="text-left">
                  Rating (TA)
                </th>
                <th class="text-left">
                  Google Rating
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>
                  {{ hotel.stars }}
                </td>
                <td>
                  {{ hotel.trip_advisor_rating }}
                </td>
                <td>
                  {{ hotel.google_rating }}
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="8">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Description text
            </h4>
          </v-toolbar>
          <hr>
        </v-card>
      </v-col>
      <v-col md="12">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1 mt-1">
              Location
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Country
                </th>
                <th class="text-left">
                  Region
                </th>
                <th class="text-left">
                  Resort
                </th>
                <th class="text-left">
                  Place
                </th>
                <th class="text-left">
                  Longitude
                </th>
                <th class="text-left">
                  Latitude
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>Russia</td>
                <td>Southern Federal Dist...</td>
                <td>Krasnaya Polyana</td>
                <td>
                  Krasnaya Polyana
                </td>
                <td>
                  {{ hotel.longitude }}
                </td>
                <td>
                  {{ hotel.latitude }}
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="12">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1 mt-1">
              Hotels airport
            </h4>
            <v-spacer></v-spacer>
            <v-btn
              small
              :value="5"
              @click.prevent="addAirport = !addAirport"
              text
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <hr>
<!--          <v-simple-table>-->
<!--            <template v-slot:default>-->
<!--              <thead>-->
<!--              <tr>-->
<!--                <th class="text-left">-->
<!--                  Assigned airport Name-->
<!--                </th>-->
<!--                <th class="text-left">-->
<!--                  Distance-->
<!--                </th>-->
<!--                <th class="text-left">-->
<!--                  Transfer Time-->
<!--                </th>-->
<!--                <th class="text-left">-->
<!--                  Transfer Price-->
<!--                </th>-->
<!--              </tr>-->
<!--              </thead>-->
<!--              <tbody>-->
<!--              <tr-->
<!--              >-->
<!--                <td>Stockholm ESSA</td>-->
<!--                <td>12 km</td>-->
<!--                <td>Krasnaya Polyana</td>-->
<!--                <td>-->
<!--                  12:12-->
<!--                </td>-->
<!--                <td>-->
<!--                  $220-->
<!--                </td>-->
<!--              </tr>-->
<!--              <tr-->
<!--              >-->
<!--                <td>Stockholm ESSA</td>-->
<!--                <td>12 km</td>-->
<!--                <td>Krasnaya Polyana</td>-->
<!--                <td>-->
<!--                  12:12-->
<!--                </td>-->
<!--                <td>-->
<!--                  $220-->
<!--                </td>-->
<!--              </tr>-->
<!--              </tbody>-->
<!--            </template>-->
<!--          </v-simple-table>-->
        </v-card>
      </v-col>
    </v-row>
    <hotel-airport-add-shield v-model="addAirport" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HotelAirportAddShield from '../../../components/hotels/HotelAirportAddShield'

export default {
  name: 'HotelDescription',
  async validate ({ params, store }) {
    return await store.dispatch('hotels/getById', params.id)
  },
  async fetch ({ params, store }) {
    const hotel = store.getters['hotels/currentHotel']
    if (!hotel) {
      await store.dispatch('hotels/getById', params.id)
    }
  },
  components: {
    HotelAirportAddShield
  },
  data () {
    return {
      addAirport: false,
      items: [
        {
          text: 'Hotels',
          disabled: false,
          href: '/hotels'
        },
        {
          text: 'Hotel description',
          disabled: false,
          href: '/hotels/description'
        },
        {
          text: 'Card “Hotel description”',
          disabled: true,
          href: '/hotels/description/'
        }
      ]
    }
  },
  mounted () {
    this.items = [
      {
        text: 'Hotels',
        disabled: false,
        href: '/hotels'
      },
      {
        text: 'Hotel description',
        disabled: false,
        href: '/hotels/descriptions'
      },
      {
        text: this.hotel.name,
        disabled: true,
        href: '/hotels/description/'
      }
    ]
  },
  computed: {
    ...mapGetters({
      hotel: 'hotels/currentHotel'
    })
  }
}
</script>

<style scoped>

</style>
