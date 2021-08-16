<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Card “Hotel description”
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
                <td>BA9212320</td>
                <td>Hôtel Raphael</td>
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
                <td>0,23 km</td>
                <td>0,25 km</td>
                <td>0,65 km</td>
                <td>
                  <v-chip
                    color="green"
                    dark
                  >
                    free
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
        <v-slide-group
          class="mt-2"
          multiple
          show-arrows
        >
          <v-slide-item
            v-for="n in 25"
            :key="n"
          >
            <div class="mx-2">
              <v-img
                src="https://picsum.photos/510/300?random"
                aspect-ratio="2"
                width="79px"
                height="79px"
              ></v-img>
            </div>
          </v-slide-item>
        </v-slide-group>
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
                  5
                </td>
                <td>
                  96
                </td>
                <td>
                  56
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
          <p class="px-4 py-2">
            The Hôtel Raphael is a modern, elegant four star hotel located by the sea. This is an opportunity to spend
            a romantic and charming holiday among the captivating beauty of Taormina and the sea that surrounds
            the coast of Sicily. <br> <br>
            While enjoying a cocktail on the panoramic terrace and pool, you will be amazed by the view of the sea
            and the magnificent landscape of the bay of the Isola Bella
          </p>
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
                  -100.450279
                </td>
                <td>
                  41.543056
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
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Assigned airport Name
                </th>
                <th class="text-left">
                  Distance
                </th>
                <th class="text-left">
                  Transfer Time
                </th>
                <th class="text-left">
                  Transfer Price
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>Stockholm ESSA</td>
                <td>12 km</td>
                <td>Krasnaya Polyana</td>
                <td>
                  12:12
                </td>
                <td>
                  $220
                </td>
              </tr>
              <tr
              >
                <td>Stockholm ESSA</td>
                <td>12 km</td>
                <td>Krasnaya Polyana</td>
                <td>
                  12:12
                </td>
                <td>
                  $220
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'HotelDescription',
  data () {
    return {
      headers: [
        { text: 'Info', value: 'info' },
        {
          text: 'Hotel ID',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'Hotel Name', value: 'name' },
        { text: 'Place', value: 'place' },
        { text: 'Resort', value: 'resort' },
        { text: 'Region', value: 'region' },
        { text: 'Country', value: 'country' },
        { text: 'Type', value: 'type' },
        { text: '', value: 'actions', sortable: false }
      ],
      mock: [
        {
          id: 'SD9212969',
          name: 'The Peninsula Chicago',
          place: 'Cincinnati',
          resort: 'Vancouver',
          region: 'Africa',
          country: 'Monaco',
          type: 'Boutique'
        },
        {
          id: 'SD9212929',
          name: 'Andronis Boutique Hotel',
          place: 'San Isidro',
          resort: 'Medicine Hat',
          region: 'Asia',
          country: 'Georgia',
          type: 'Business'
        },
        {
          id: 'SD9212920',
          name: 'Hanoi La Siesta Hote...',
          place: 'North Las Vegas ',
          resort: 'Laval',
          region: 'Oceania',
          country: 'Iceland',
          type: 'Boutique'
        }
      ],
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
  }
}
</script>

<style scoped>

</style>
